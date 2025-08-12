"use server";

/**
 * @fileOverview A smart support chatbot for the Techicious website.
 *
 * - smartSupportChatbot - A function that handles the chatbot interaction.
 * - SmartSupportChatbotInput - The input type for the smartSupportChatbot function.
 * - SmartSupportChatbotOutput - The return type for the smartSupportChatbot function.
 */

import { ai } from "@/ai/genkit";
import { z } from "genkit";

const SmartSupportChatbotInputSchema = z.object({
  query: z.string().describe("The user query for the chatbot."),
});
export type SmartSupportChatbotInput = z.infer<
  typeof SmartSupportChatbotInputSchema
>;

const SmartSupportChatbotOutputSchema = z.object({
  response: z.string().describe("The response from the chatbot."),
});
export type SmartSupportChatbotOutput = z.infer<
  typeof SmartSupportChatbotOutputSchema
>;

export async function smartSupportChatbot(
  input: SmartSupportChatbotInput
): Promise<SmartSupportChatbotOutput> {
  return smartSupportChatbotFlow(input);
}

const prompt = ai.definePrompt({
  name: "smartSupportChatbotPrompt",
  input: { schema: SmartSupportChatbotInputSchema },
  output: { schema: SmartSupportChatbotOutputSchema },
  prompt: `You are Techicious Assistant, the smart support chatbot for Techicious — a software development startup serving “Delicious Tech.”
Your mission is to answer questions about our services, expertise, and technologies.
We specialize in building modern, high-performance web applications.
Our core expertise: ERPs, Social Apps, and Banking Systems.
Our services include: Web Development, Mobile Development, and AI Development.
If a question is outside the scope of Techicious, politely let the user know. Then, invite them to share their name, email, and query so that one of our experts can reach out promptly with the right answers and solutions.

Query: {{{query}}}`,
});

const smartSupportChatbotFlow = ai.defineFlow(
  {
    name: "smartSupportChatbotFlow",
    inputSchema: SmartSupportChatbotInputSchema,
    outputSchema: SmartSupportChatbotOutputSchema,
  },
  async (input) => {
    const { output } = await prompt(input);
    return output!;
  }
);
