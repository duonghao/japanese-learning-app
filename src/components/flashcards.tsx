"use client";

import { useEffect, useState } from "react";

import { getFlashcardsFromDeck } from "@/lib/firebase/firestore";
import { FlashcardDisplay } from "@/lib/firebase/types";

import FlashcardsGrid from "./flashcards-grid/flashcards-grid";

interface FlashcardsProps {
  deckId: string;
}
export default function Flashcards({ deckId }: FlashcardsProps) {
  const [flashcards, setFlashcards] = useState<FlashcardDisplay[] | null>(null);

  useEffect(() => {
    const unsub = getFlashcardsFromDeck(deckId, (flashcards) =>
      setFlashcards(flashcards),
    );

    return unsub;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return <FlashcardsGrid flashcards={flashcards} deckId={deckId} />;
}
