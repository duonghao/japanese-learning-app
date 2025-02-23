"use client";

import Link from "next/link";

import Flashcards from "@/components/flashcards";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import SettingsTab from "@/components/tabs/settings-tab";
import { useDeckContext } from "@/hooks/useDeckContext";

export default function DeckPage() {
  const { deckId, deck } = useDeckContext();

  return (
    <section className="p-4">
      <header className="flex justify-between items-center mb-4">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">{deck?.name}</h2>
          <p className="text-muted-foreground">{deck?.description}</p>
        </div>
        <ul>
          <Button asChild>
            <Link href={`/decks/start/${deckId}`}>Start</Link>
          </Button>
        </ul>
      </header>
      <Tabs defaultValue="settings">
        <TabsList className="grid grid-cols-3 w-[400px]">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="flashcards">Flashcards</TabsTrigger>
          <TabsTrigger value="settings">Settings</TabsTrigger>
        </TabsList>
        <TabsContent value="overview">
          <OverviewTab />
        </TabsContent>
        <TabsContent value="flashcards">
          <FlashcardsTab />
        </TabsContent>
        <TabsContent value="settings">
          <SettingsTab />
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

function FlashcardsTab() {
  const { deckId } = useDeckContext();

  if (!deckId) {
    return <></>;
  }

  return (
    <div className="min-h-svh rounded-xl border p-4">
      <Flashcards deckId={deckId} />
    </div>
  );
}
