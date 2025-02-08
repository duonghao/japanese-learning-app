"use client";

import { getDecks } from "@/lib/firebase/firestore";
import { useEffect, useState } from "react";
import { DataGrid } from "./data-grid";
import { columns } from "./columns";
import { DeckDisplay } from "@/lib/firebase/types";

export default function Decks() {
  const [decks, setDecks] = useState<DeckDisplay[] | null>(null);

  useEffect(() => {
    const unsub = getDecks((decks) => setDecks(decks));
    return unsub;
  }, []);

  return (
    <main>
      <section className="px-4 py-4">
        <header className="flex justify-between mb-4">
          <h2 className="text-3xl font-bold tracking-tight">Decks</h2>
        </header>
        <DataGrid data={decks ?? []} columns={columns} />
      </section>
    </main>
  );
}
