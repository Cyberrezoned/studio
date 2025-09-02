import { Header } from '@/components/header';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { RecoveryForm } from '@/components/recovery-form';
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Terminal } from "lucide-react";


export default function RecoverAccountPage() {
  return (
    <div className="flex min-h-screen w-full flex-col">
      <Header />
      <main className="flex-1 flex items-center justify-center p-4 bg-muted/40">
        <Card className="w-full max-w-2xl">
          <CardHeader>
            <CardTitle className="text-2xl">Account Recovery Tool</CardTitle>
            <CardDescription>
              Lost access to your account? Use this AI-powered tool to guide you through the recovery process.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Alert className="mb-6">
              <Terminal className="h-4 w-4" />
              <AlertTitle>How it works</AlertTitle>
              <AlertDescription>
                Select your chosen recovery method and provide the necessary information. Our AI assistant will securely verify your details and guide you on the next steps.
              </AlertDescription>
            </Alert>
            <RecoveryForm />
          </CardContent>
        </Card>
      </main>
    </div>
  );
}
