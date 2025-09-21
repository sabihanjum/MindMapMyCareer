'use server';

import {
  generateCareerPathways,
  GenerateCareerPathwaysInput,
  GenerateCareerPathwaysOutput,
} from '@/ai/flows/generate-career-pathways';
import {
  answerCareerQueries,
  AnswerCareerQueriesInput,
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

export async function* answerCareerQueryAction(
  input: AnswerCareerQueriesInput
): AsyncGenerator<{ answer: string } | { error: string }, void, unknown> {
  try {
    const stream = await answerCareerQueries(input);
    for await (const partial of stream) {
        yield { answer: partial.answer };
    }
  } catch (error) {
    console.error('Error in answerCareerQueryAction:', error);
    yield { error: 'Failed to get an answer. Please try again later.' };
  }
}
