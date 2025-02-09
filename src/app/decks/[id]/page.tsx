"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";

import { getDeck } from "@/lib/firebase/firestore";

import { DeckDisplay } from "@/lib/firebase/types";
import FlashcardForm from "@/components/forms/flashcard-form";
import Flashcards from "@/components/flashcards";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function DeckPage() {
  const { id } = useParams<{ id: string }>();
  const [deck, setDeck] = useState<DeckDisplay | undefined>(undefined);

  useEffect(() => {
    const unsub = getDeck(id, (deck) => setDeck(deck));

    return unsub;
  });

  return (
    <section className="p-4">
      <header className="flex flex-col mb-4">
        <h2 className="text-3xl font-bold tracking-tight">{deck?.name}</h2>
        <p className="text-muted-foreground">{deck?.description}</p>
      </header>
      <Tabs defaultValue="flashcards">
        <TabsList className="grid grid-cols-2 w-[400px]">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="flashcards">Flashcards</TabsTrigger>
        </TabsList>
        <TabsContent value="overview">
          <div className="min-h-svh flex justify-center items-center">
            Overview
          </div>
        </TabsContent>
        <TabsContent value="flashcards">
          <div className="grid min-h-svh grid-cols-2 rounded-xl border">
            <div className="flex flex-1 items-center justify-center">
              <div className="w-full max-w-xs">
                <FlashcardForm deckId={id} />
              </div>
            </div>
            <div className="bg-muted">
              <Flashcards deckId={id} />
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </section>
  );
}
