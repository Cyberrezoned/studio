'use server';

/**
 * @fileOverview Provides a guided account recovery process using AI.
 *
 * - accountRecoveryTool - A function that initiates the account recovery process.
 * - AccountRecoveryToolInput - The input type for the accountRecoveryTool function.
 * - AccountRecoveryToolOutput - The return type for the accountRecoveryTool function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const AccountRecoveryToolInputSchema = z.object({
  recoveryMethod: z
    .string()
    .describe(
      'The method the user has chosen to recover their account (e.g., security questions, backup phrase, trusted contact).' /* example: security questions */
    ),
  userInput: z
    .string()
    .describe(
      'The user input based on the chosen recovery method. Provide hints to the user on what to input based on the chosen recovery method.'
    ),
});
export type AccountRecoveryToolInput = z.infer<typeof AccountRecoveryToolInputSchema>;

const AccountRecoveryToolOutputSchema = z.object({
  success: z
    .boolean()
    .describe(
      'Whether the account recovery was successful or not. Provide suggestions on what to do if unsuccessful.'
    ),
  message: z
    .string()
    .describe(
      'A message to the user indicating the status of the recovery process and next steps, based on whether recovery was successful.'
    ),
});
export type AccountRecoveryToolOutput = z.infer<typeof AccountRecoveryToolOutputSchema>;

export async function accountRecoveryTool(input: AccountRecoveryToolInput): Promise<AccountRecoveryToolOutput> {
  return accountRecoveryToolFlow(input);
}

const prompt = ai.definePrompt({
  name: 'accountRecoveryToolPrompt',
  input: {schema: AccountRecoveryToolInputSchema},
  output: {schema: AccountRecoveryToolOutputSchema},
  prompt: `You are an AI assistant that guides users through an account recovery process. The user has selected "{{{recoveryMethod}}}" as their recovery method and has provided the following input: "{{{userInput}}}".

Based on the recovery method and the user's input, determine if the account recovery should be considered successful or not. Always err on the side of caution and data security. For example, if the recovery method is a security question and the user's input does not match the expected answer, mark it as unsuccessful.

If successful, provide a message to the user that their account has been recovered and what their next steps are (e.g., reset password, review account activity).

If unsuccessful, provide a message to the user explaining why the recovery failed and provide alternative recovery methods or steps they can take. Emphasize the importance of security and data integrity.

Return the success status and message in the appropriate fields.

Consider edge cases such as too many attempts and suggest they contact support.
`,
});

const accountRecoveryToolFlow = ai.defineFlow(
  {
    name: 'accountRecoveryToolFlow',
    inputSchema: AccountRecoveryToolInputSchema,
    outputSchema: AccountRecoveryToolOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
