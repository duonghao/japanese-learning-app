"use client";

import { Flashcard, getFlashcards } from "@/lib/firebase/firestore";
import { useEffect, useState } from "react";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default function Flashcards() {
  const [flashcards, setFlashcards] = useState<Flashcard[] | null>(null);

  useEffect(() => {
    const unsub = getFlashcards((flashcards) => setFlashcards(flashcards));

    return unsub;
  }, []);

  return (
    <div className="grid grid-cols-2 gap-4">
      {flashcards?.map((flashcard) => (
        <Card key={flashcard.word} className="w-48 h-32">
          <CardHeader>
            <CardTitle>{flashcard.word}</CardTitle>
            <CardDescription>{flashcard.definition}</CardDescription>
          </CardHeader>
        </Card>
      ))}
    </div>
  );
}
