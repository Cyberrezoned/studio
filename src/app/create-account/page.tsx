'use client';
import { Header } from '@/components/header';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { ArrowRight, Copy } from 'lucide-react';
import Link from 'next/link';
import { useToast } from '@/hooks/use-toast';

export default function CreateAccountPage() {
  const { toast } = useToast();
  const publicKey = '0x0a1B2c3D4e5F6g7H8i9J0k1L2m3N4o5P6q7R8s9T';
  const privateKey = 'zxyw9876vuts5432rqpo1098nmlkji0987hgfedcba';

  const copyToClipboard = (text: string, label: string) => {
    navigator.clipboard.writeText(text);
    toast({
      title: `${label} Copied!`,
      description: 'The key has been copied to your clipboard.',
    });
  };

  return (
    <div className="flex min-h-screen w-full flex-col">
      <Header />
      <main className="flex-1 flex items-center justify-center p-4">
        <Card className="w-full max-w-2xl animate-fade-in-up">
          <CardHeader>
            <CardTitle className="text-2xl">Create Your Secure Wallet</CardTitle>
            <CardDescription>
              Your unique keys have been generated. Store your private key in a safe place.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-2">
              <Label>Public Key (Shareable)</Label>
              <div className="flex items-center gap-2">
                <Input readOnly value={publicKey} className="font-mono text-sm" />
                <Button variant="ghost" size="icon" onClick={() => copyToClipboard(publicKey, 'Public Key')}>
                  <Copy className="h-4 w-4" />
                </Button>
              </div>
            </div>
            <div className="space-y-2">
              <Label>Private Key (Secret)</Label>
              <div className="flex items-center gap-2">
                <Input readOnly value={'•'.repeat(privateKey.length)} className="font-mono text-sm" />
                <Button variant="ghost" size="icon" onClick={() => copyToClipboard(privateKey, 'Private Key')}>
                  <Copy className="h-4 w-4" />
                </Button>
              </div>
              <p className="text-xs text-destructive">Never share your private key with anyone!</p>
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Create a Password</Label>
              <Input id="password" type="password" placeholder="Enter a strong password to encrypt your key" />
            </div>
          </CardContent>
          <CardFooter>
            <Button asChild className="w-full group">
              <Link href="/dashboard">
                Continue to Dashboard
                <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Link>
            </Button>
          </CardFooter>
        </Card>
      </main>
    </div>
  );
}
