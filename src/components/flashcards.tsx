"use client";

import FlashcardsGrid from "./flashcards-grid/flashcards-grid";
import { useFlashcards } from "@/hooks/useFlashcards";

interface FlashcardsProps {
  deckId: string;
}
export default function Flashcards({ deckId }: FlashcardsProps) {
  const { flashcards } = useFlashcards(deckId);

  return <FlashcardsGrid flashcards={flashcards} deckId={deckId} />;
}
