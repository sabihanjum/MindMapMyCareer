'use server';

import {
  generateCareerPathways,
  GenerateCareerPathwaysInput,
  GenerateCareerPathwaysOutput,
} from '@/ai/flows/generate-career-pathways';
import {
  answerCareerQueries,
  AnswerCareerQueriesInput,
  AnswerCareerQueriesOutput,
} from '@/ai/flows/answer-career-queries';
import { User, findUserByEmail, saveUser } from './user-store';

export async function generateCareerPathwaysAction(
  input: GenerateCareerPathwaysInput
): Promise<GenerateCareerPathwaysOutput | { error: string }> {
  try {
    const result = await generateCareerPathways(input);
    return result;
  } catch (error) {
    console.error('Error in generateCareerPathwaysAction:', error);
    return { error: 'Failed to generate career pathways. Please try again later.' };
  }
}

export async function answerCareerQueryAction(
  input: AnswerCareerQueriesInput
): Promise<AnswerCareerQueriesOutput | { error: string }> {
  try {
    const result = await answerCareerQueries(input);
    return result;
  } catch (error) {
    console.error('Error in answerCareerQueryAction:', error);
    if (error instanceof Error) {
      console.error('Error message:', error.message);
      console.error('Error stack:', error.stack);
    } else {
      try {
        console.error('Error JSON:', JSON.stringify(error));
      } catch {
        console.error('Could not stringify error object');
      }
    }
    return { error: 'Failed to get an answer. Please try again later.' };
  }
}

type AuthInput = Omit<User, 'id'>;

export async function signupUserAction(
  input: AuthInput
): Promise<{ success: boolean; error?: string }> {
  try {
    const existingUser = findUserByEmail(input.email);
    if (existingUser) {
      return { success: false, error: 'An account with this email already exists.' };
    }
    saveUser(input);
    // In a real app, you would also create a session/cookie here
    return { success: true };
  } catch (error) {
    console.error('Error in signupUserAction:', error);
    return { success: false, error: 'An unexpected error occurred.' };
  }
}

export async function loginUserAction(
  input: Pick<User, 'email' | 'password'>
): Promise<{ success: boolean; error?: string }> {
  try {
    const user = findUserByEmail(input.email);
    if (!user) {
      return { success: false, error: 'User not found' };
    }
    if (user.password !== input.password) {
      return { success: false, error: 'Incorrect password' };
    }
    // In a real app, you would also create a session/cookie here
    return { success: true };
  } catch (error) {
    console.error('Error in loginUserAction:', error);
    return { success: false, error: 'An unexpected error occurred.' };
  }
}
