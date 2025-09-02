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
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { Fingerprint, Wallet, ShieldCheck, History, ArrowRight } from 'lucide-react';
import { TransactionDialog } from '@/components/transaction-dialog';
import Link from 'next/link';

const transactions = [
  { type: 'Received', amount: '+0.5 ETH', from: '0x1a...eF' },
  { type: 'Sent', amount: '-0.1 ETH', to: '0x2b...dC' },
  { type: 'Contract', amount: '-0.01 ETH', to: 'Uniswap' },
];

export default function DashboardPage() {
  return (
    <div className="flex min-h-screen w-full flex-col">
      <Header />
      <main className="flex-1 p-4 sm:p-6 md:p-8">
        <div className="mx-auto max-w-6xl">
          <h1 className="text-3xl font-bold tracking-tight mb-8">Dashboard</h1>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            <Card className="flex flex-col">
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle>Account Details</CardTitle>
                <Wallet className="h-5 w-5 text-accent" />
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-primary">1.25 ETH</div>
                <p className="text-sm text-muted-foreground">$4,321.00 USD</p>
              </CardContent>
              <CardFooter className="mt-auto flex-col items-start gap-2">
                <p className="text-xs font-semibold text-muted-foreground">Public Key</p>
                <p className="font-mono text-xs break-all">0xAbC1234DeFg5678hIjK910LmN11OpQ12RsT13uVw</p>
              </CardFooter>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle>Security</CardTitle>
                <ShieldCheck className="h-5 w-5 text-accent" />
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between rounded-lg border p-3 shadow-sm">
                  <div className="space-y-0.5">
                    <Label htmlFor="biometric-auth" className="flex items-center">
                      <Fingerprint className="mr-2 h-4 w-4" />
                      Biometric Authentication
                    </Label>
                    <p className="text-xs text-muted-foreground">
                      Secure your wallet with your fingerprint or face.
                    </p>
                  </div>
                  <Switch id="biometric-auth" />
                </div>
                 <Button variant="outline" className="w-full group" asChild>
                    <Link href="/recover-account">
                        Account Recovery Tool
                        <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                    </Link>
                </Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle>Recent Activity</CardTitle>
                <History className="h-5 w-5 text-accent" />
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {transactions.map((tx, index) => (
                    <div key={index} className="flex items-center">
                      <div className={`h-8 w-8 rounded-full flex items-center justify-center mr-3 ${tx.type === 'Received' ? 'bg-green-100' : 'bg-red-100'}`}>
                         <ArrowRight className={`h-4 w-4 ${tx.type === 'Received' ? 'text-green-600 -rotate-45' : 'text-red-600 rotate-45'}`} />
                      </div>
                      <div className="flex-1">
                        <p className="font-medium">{tx.type}</p>
                        <p className="text-sm text-muted-foreground">{tx.type === 'Received' ? `From ${tx.from}`: `To ${tx.to}`}</p>
                      </div>
                      <div className={`font-semibold ${tx.type === 'Received' ? 'text-green-600' : ''}`}>{tx.amount}</div>
                    </div>
                  ))}
                </div>
              </CardContent>
              <CardFooter className="mt-4">
                <TransactionDialog />
              </CardFooter>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
}
