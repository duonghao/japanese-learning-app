"use client";

import { useEffect, useState } from "react";

import { getDecks } from "@/lib/firebase/firestore";
import { WithId, Deck } from "@/lib/firebase/types";

import DecksGrid from "@/components/decks-grid/decks-grid";

export default function Decks() {
  const [decks, setDecks] = useState<WithId<Deck>[] | null>(null);

  useEffect(() => {
    const unsub = getDecks((decks) => setDecks(decks));
    return unsub;
  }, []);

  return (
    <main>
      <section className="p-4">
        <header className="flex justify-between mb-4">
          <h2 className="text-3xl font-bold tracking-tight">Decks</h2>
        </header>
        <DecksGrid decks={decks} />
      </section>
    </main>
  );
}
