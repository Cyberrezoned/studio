import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Logo } from '@/components/icons';

export default function LandingPage() {
  return (
    <div className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden bg-background p-4">
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-background [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)]"></div>
      </div>
      <main className="z-10 flex flex-col items-center text-center">
        <Logo className="mb-6 h-20 w-20 text-primary" />
        <h1 className="text-4xl font-bold tracking-tight text-foreground sm:text-5xl md:text-6xl">
          BlockAuth
        </h1>
        <p className="mt-4 max-w-md text-lg text-muted-foreground">
          The next generation of secure, decentralized authentication. Your digital identity, protected by the blockchain.
        </p>
        <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:justify-center">
          <Button asChild size="lg" className="group">
            <Link href="/create-account">
              Create New Wallet
              <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
            </Link>
          </Button>
          <Button asChild variant="outline" size="lg" className="group">
            <Link href="/dashboard">
              Access My Wallet
              <ArrowRight className="ml-2 h-5 w-5 text-primary transition-transform group-hover:translate-x-1" />
            </Link>
          </Button>
        </div>
      </main>
    </div>
  );
}
