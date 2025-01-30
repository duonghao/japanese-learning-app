"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { db } from "@/lib/firebase/clientApp";
import { addDeck, DeckDisplay, getDecks } from "@/lib/firebase/firestore";
import Link from "next/link";
import { useEffect, useState } from "react";

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
        <ul className="grid grid-cols-3">
          {decks?.map((deck) => (
            <li key={deck.id}>
              <Card className="w-[250px]">
                <CardHeader>
                  <CardTitle>{deck.name}</CardTitle>
                  <CardDescription>{deck.description}</CardDescription>
                </CardHeader>
                <CardFooter className="flex justify-between">
                  <Button variant="destructive">Delete</Button>
                  <Button asChild>
                    <Link href={`/decks/${deck.id}`}>View</Link>
                  </Button>
                </CardFooter>
              </Card>
            </li>
          ))}
        </ul>
      </section>
    </main>
  );
}
