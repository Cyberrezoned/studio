'use client';

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { CheckCircle, XCircle } from 'lucide-react';
import { useState } from 'react';

export function TransactionDialog() {
  const { toast } = useToast();
  const [open, setOpen] = useState(false);

  const handleAction = (approved: boolean) => {
    setOpen(false);
    if (approved) {
      toast({
        title: (
          <div className="flex items-center">
            <CheckCircle className="mr-2 h-5 w-5 text-green-500" />
            Transaction Approved
          </div>
        ),
        description: 'Your transaction has been successfully signed and broadcasted.',
        variant: 'default',
      });
    } else {
      toast({
        title: (
          <div className="flex items-center">
            <XCircle className="mr-2 h-5 w-5 text-destructive" />
            Transaction Rejected
          </div>
        ),
        description: 'You have rejected the transaction.',
        variant: 'destructive',
      });
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button>Sign a Transaction</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Confirm Transaction</DialogTitle>
          <DialogDescription>
            Review the transaction details before signing with your private key.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <span className="text-right text-sm text-muted-foreground">From</span>
            <span className="col-span-3 truncate font-mono text-sm">0xAb...c9</span>
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <span className="text-right text-sm text-muted-foreground">To</span>
            <span className="col-span-3 truncate font-mono text-sm">0x9F...b1</span>
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <span className="text-right text-sm text-muted-foreground">Amount</span>
            <span className="col-span-3 font-semibold">0.05 ETH</span>
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <span className="text-right text-sm text-muted-foreground">Gas Fee</span>
            <span className="col-span-3">0.001 ETH</span>
          </div>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={() => handleAction(false)}>
            Reject
          </Button>
          <Button type="submit" onClick={() => handleAction(true)}>
            Approve
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
