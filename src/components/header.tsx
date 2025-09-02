import Link from 'next/link';
import { Logo } from '@/components/icons';
import { Button } from '@/components/ui/button';

export function Header() {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center">
        <Link href="/" className="mr-6 flex items-center space-x-2">
          <Logo className="h-6 w-6 text-primary" />
          <span className="font-bold">BlockAuth</span>
        </Link>
        <nav className="flex flex-1 items-center space-x-6 text-sm font-medium">
          <Link href="/dashboard" className="text-foreground/60 transition-colors hover:text-foreground/80">
            Dashboard
          </Link>
          <Link href="/create-account" className="text-foreground/60 transition-colors hover:text-foreground/80">
            Create Account
          </Link>
          <Link href="/recover-account" className="text-foreground/60 transition-colors hover:text-foreground/80">
            Recover Account
          </Link>
        </nav>
      </div>
    </header>
  );
}
