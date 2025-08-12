'use server';

/**
 * @fileOverview A smart support chatbot for the Techicious website.
 *
 * - smartSupportChatbot - A function that handles the chatbot interaction.
 * - SmartSupportChatbotInput - The input type for the smartSupportChatbot function.
 * - SmartSupportChatbotOutput - The return type for the smartSupportChatbot function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const SmartSupportChatbotInputSchema = z.object({
  query: z.string().describe('The user query for the chatbot.'),
});
export type SmartSupportChatbotInput = z.infer<typeof SmartSupportChatbotInputSchema>;

const SmartSupportChatbotOutputSchema = z.object({
  response: z.string().describe('The response from the chatbot.'),
});
export type SmartSupportChatbotOutput = z.infer<typeof SmartSupportChatbotOutputSchema>;

export async function smartSupportChatbot(input: SmartSupportChatbotInput): Promise<SmartSupportChatbotOutput> {
  return smartSupportChatbotFlow(input);
}

const prompt = ai.definePrompt({
  name: 'smartSupportChatbotPrompt',
  input: {schema: SmartSupportChatbotInputSchema},
  output: {schema: SmartSupportChatbotOutputSchema},
  prompt: `You are a smart support chatbot for Techicious, a software development startup.

  Your goal is to answer questions about the company's services and expertise.

  Use the following information about Techicious to answer the user's query:
  - Techicious is a software development startup that specializes in building modern web applications. We serve "Delicious Tech".
  - Techicious has expertise in NextJS, Firebase, and Genkit.
  - Techicious offers services such as web development, mobile development, and AI development.

  If the user asks a question that is not related to Techicious, you should politely decline to answer.

  Query: {{{query}}}`,
});

const smartSupportChatbotFlow = ai.defineFlow(
  {
    name: 'smartSupportChatbotFlow',
    inputSchema: SmartSupportChatbotInputSchema,
    outputSchema: SmartSupportChatbotOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
