import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import DeckForm from "@/components/forms/deck-form";

export default function DeckToolbar() {
  return (
    <div className="flex items-center gap-4">
      <Dialog>
        <DialogTrigger asChild>
          <Button variant="default">Add</Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Add a Deck</DialogTitle>
            <DialogDescription>
              Enter your new deck information. Click save when you&apos;re done.
            </DialogDescription>
          </DialogHeader>
          <DeckForm />
        </DialogContent>
      </Dialog>
    </div>
  );
}
