'use server';

import { z } from 'zod';
import { accountRecoveryTool, type AccountRecoveryToolOutput } from '@/ai/flows/account-recovery-tool';

const schema = z.object({
  recoveryMethod: z.string(),
  userInput: z.string().min(10, { message: 'Please provide more detail.' }),
});

export async function handleAccountRecovery(
  prevState: any,
  formData: FormData
): Promise<AccountRecoveryToolOutput & { error?: string }> {
  const parsed = schema.safeParse({
    recoveryMethod: formData.get('recoveryMethod'),
    userInput: formData.get('userInput'),
  });

  if (!parsed.success) {
    return {
      success: false,
      message: parsed.error.errors[0].message,
      error: 'validation',
    };
  }

  try {
    const result = await accountRecoveryTool(parsed.data);
    return result;
  } catch (e) {
    console.error(e);
    return {
      success: false,
      message: 'An unexpected error occurred. Please try again later.',
      error: 'server',
    };
  }
}
