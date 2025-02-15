"use client";

import { Card, CardContent } from "@/components/ui/card";
import { useFlashcards } from "@/hooks/useFlashcards";
import { useParams } from "next/navigation";

export default function StartPage() {
  const { deckId } = useParams<{ deckId: string }>();
  const { flashcards } = useFlashcards(deckId);

  return (
    <div className="h-svh flex justify-center items-center relative flex-direction: column-reverse">
      {flashcards?.map((flashcard, index) => (
        <Card
          key={flashcard.id}
          className={`aspect-square min-w-96 absolute left-0 right-0 m-auto w-fit`}
          style={{ zIndex: -index, top: `calc(10% + ${index * 10}px)` }}
        >
          <CardContent className="h-full flex justify-center items-center">
            <div className="text-center">
              <h1>{flashcard.word}</h1>
              <p>{flashcard.definition}</p>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
