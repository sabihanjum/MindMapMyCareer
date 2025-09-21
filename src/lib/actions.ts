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
