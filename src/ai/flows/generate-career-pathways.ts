'use server';
/**
 * @fileOverview AI-powered career pathway generator.
 *
 * - generateCareerPathways - A function that generates personalized career pathways based on user data.
 * - GenerateCareerPathwaysInput - The input type for the generateCareerPathways function.
 * - GenerateCareerPathwaysOutput - The return type for the generateCareerPathways function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const GenerateCareerPathwaysInputSchema = z.object({
  skills: z
    .string()
    .describe('A comma-separated list of the student\'s skills.'),
  interests: z
    .string()
    .describe('A comma-separated list of the student\'s interests.'),
  aspirations: z
    .string()
    .describe('A brief description of the student\'s career aspirations.'),
});
export type GenerateCareerPathwaysInput = z.infer<
  typeof GenerateCareerPathwaysInputSchema
>;

const GenerateCareerPathwaysOutputSchema = z.object({
  careerPathways: z
    .array(z.string())
    .describe(
      'A list of 3-5 potential career pathways tailored to the student\'s profile.'
    ),
  upskillingRecommendations: z
    .array(z.string())
    .describe(
      'A list of 3-5 upskilling recommendations to help the student pursue their chosen career paths.'
    ),
});
export type GenerateCareerPathwaysOutput = z.infer<
  typeof GenerateCareerPathwaysOutputSchema
>;

export async function generateCareerPathways(
  input: GenerateCareerPathwaysInput
): Promise<GenerateCareerPathwaysOutput> {
  return generateCareerPathwaysFlow(input);
}

const prompt = ai.definePrompt({
  name: 'generateCareerPathwaysPrompt',
  input: {schema: GenerateCareerPathwaysInputSchema},
  output: {schema: GenerateCareerPathwaysOutputSchema},
  prompt: `You are a career counselor providing personalized career pathway recommendations to students based on their skills, interests, and aspirations.

  Skills: {{{skills}}}
  Interests: {{{interests}}}
  Aspirations: {{{aspirations}}}

  Based on the student's profile, suggest potential career pathways and upskilling recommendations.
  `,
});

const generateCareerPathwaysFlow = ai.defineFlow(
  {
    name: 'generateCareerPathwaysFlow',
    inputSchema: GenerateCareerPathwaysInputSchema,
    outputSchema: GenerateCareerPathwaysOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
