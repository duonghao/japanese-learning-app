"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";

import { getDeck } from "@/lib/firebase/firestore";
import { DeckDisplay } from "@/lib/firebase/types";

import FlashcardForm from "@/components/forms/flashcard-form";
import Flashcards from "@/components/flashcards";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function DeckPage() {
  const { deckId } = useParams<{ deckId: string }>();
  const [deck, setDeck] = useState<DeckDisplay | undefined>(undefined);

  useEffect(() => {
    const unsub = getDeck(deckId, (deck) => setDeck(deck));

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
          <OverviewTab />
        </TabsContent>
        <TabsContent value="flashcards">
          <FlashcardsTab deckId={deckId} />
        </TabsContent>
      </Tabs>
    </section>
  );
}

function OverviewTab() {
  return (
    <div className="min-h-svh flex justify-center items-center">Overview</div>
  );
}

interface FlashcardsTabProps {
  deckId: string;
}

function FlashcardsTab({ deckId }: FlashcardsTabProps) {
  return (
    <div className="grid min-h-svh gap-4 grid-cols-2 rounded-xl border p-4">
      <div className="flex flex-1 items-center justify-center rounded-xl border">
        <div className="w-full max-w-xs">
          <FlashcardForm deckId={deckId} />
        </div>
      </div>
      <div className="rounded-xl border p-4">
        <Flashcards deckId={deckId} />
      </div>
    </div>
  );
}
