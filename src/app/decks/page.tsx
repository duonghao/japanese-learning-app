"use client";

import { Button } from "@/components/ui/button";
import { db } from "@/lib/firebase/clientApp";
import { addDeck, DeckDisplay, getDecks } from "@/lib/firebase/firestore";
import { useEffect, useState } from "react";
import { DataGrid } from "./data-grid";
import { columns } from "./columns";

export default function Decks() {
  const [decks, setDecks] = useState<DeckDisplay[] | null>(null);

  async function handleAddDeck() {
    await addDeck(db, { name: "Test", description: "This is a test deck." });
  }

  useEffect(() => {
    const unsub = getDecks((decks) => setDecks(decks));

    return unsub;
  }, []);

  return (
    <main>
      <section className="px-4 py-4">
        <header className="flex justify-between mb-4">
          <h2 className="text-3xl font-bold tracking-tight">Decks</h2>
          <div className="flex items-center space-x-2">
            <Button onClick={handleAddDeck}>Add</Button>
          </div>
        </header>
        <DataGrid data={decks ?? []} columns={columns} />
      </section>
    </main>
  );
}
