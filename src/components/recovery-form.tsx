'use client';

import { useFormState, useFormStatus } from 'react-dom';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { handleAccountRecovery } from '@/app/actions';
import { useEffect, useRef } from 'react';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Terminal, CheckCircle, XCircle, Loader2 } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const initialState = {
  success: false,
  message: '',
};

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" disabled={pending} className="w-full">
      {pending ? (
        <>
          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          Submitting...
        </>
      ) : (
        'Start Recovery'
      )}
    </Button>
  );
}

export function RecoveryForm() {
  const [state, formAction] = useFormState(handleAccountRecovery, initialState);
  const { toast } = useToast();
  const formRef = useRef<HTMLFormElement>(null);

  useEffect(() => {
    if (state?.error === 'validation') {
      toast({
        title: 'Validation Error',
        description: state.message,
        variant: 'destructive',
      });
    }
    if(state?.success === true) {
        formRef.current?.reset();
    }
  }, [state, toast]);

  return (
    <form ref={formRef} action={formAction} className="space-y-6">
      <div className="space-y-2">
        <Label htmlFor="recoveryMethod">Recovery Method</Label>
        <Select name="recoveryMethod" required>
          <SelectTrigger id="recoveryMethod" className="w-full">
            <SelectValue placeholder="Select a method" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="security-questions">Security Questions</SelectItem>
            <SelectItem value="backup-phrase">Backup Phrase</SelectItem>
            <SelectItem value="trusted-contact">Trusted Contact</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <div className="space-y-2">
        <Label htmlFor="userInput">Provide Details</Label>
        <Textarea
          id="userInput"
          name="userInput"
          placeholder="e.g., For security questions, provide your answers. For backup phrase, enter the phrase..."
          className="min-h-[120px]"
          required
        />
      </div>

      <SubmitButton />

      {state && state.message && state.error !== 'validation' && (
        <Alert variant={state.success ? 'default' : 'destructive'} className="mt-6">
          {state.success ? (
            <CheckCircle className="h-4 w-4" />
          ) : (
            <XCircle className="h-4 w-4" />
          )}
          <AlertTitle>{state.success ? 'Recovery Successful' : 'Recovery Failed'}</AlertTitle>
          <AlertDescription>{state.message}</AlertDescription>
        </Alert>
      )}
    </form>
  );
}
