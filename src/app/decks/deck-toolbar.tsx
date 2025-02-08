import { Button } from "@/components/ui/button";
import { db } from "@/lib/firebase/clientApp";
import { addDeck } from "@/lib/firebase/firestore";

export default function DeckToolbar() {
  async function handleAddDeck() {
    await addDeck(db, {
      name: "Test",
      description: "This is a test deck.",
      tag: "test",
    });
  }

  return (
    <div className="flex items-center gap-4">
      <Button onClick={handleAddDeck}>Add</Button>
    </div>
  );
}
