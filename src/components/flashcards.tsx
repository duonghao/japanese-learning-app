"use client";

import {
  deleteFlashcard,
  FlashcardDisplay,
  getFlashcardsFromDeck,
} from "@/lib/firebase/firestore";
import { useEffect, useState } from "react";
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "./ui/button";

export default function Flashcards(props: { deckId: string }) {
  const [flashcards, setFlashcards] = useState<FlashcardDisplay[] | null>(null);

  useEffect(() => {
    const unsub = getFlashcardsFromDeck(props.deckId, (flashcards) =>
      setFlashcards(flashcards),
    );

    return unsub;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="grid grid-cols-2 gap-4">
      {flashcards?.map((flashcard) => (
        <Card key={flashcard.id} className="w-48 h-48">
          <CardHeader>
            <CardTitle>{flashcard.word}</CardTitle>
            <CardDescription>{flashcard.definition}</CardDescription>
          </CardHeader>
          <CardFooter>
            <Button
              variant={"destructive"}
              onClick={() => deleteFlashcard(flashcard.id)}
            >
              X
            </Button>
          </CardFooter>
        </Card>
      ))}
    </div>
  );
}
