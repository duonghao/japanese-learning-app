"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useFlashcards } from "@/hooks/useFlashcards";
import {
  addFlashcardLog,
  getFlashcardProps,
  patchFlashcardProps,
} from "@/lib/firebase/firestore";
import { f } from "@/lib/fsrs/fsrs";
import { useParams } from "next/navigation";
import { Grade, Rating } from "ts-fsrs";

export default function StartPage() {
  const { deckId } = useParams<{ deckId: string }>();
  const { flashcards } = useFlashcards(deckId);

  const handleFlashcardRating = (
    flashcardId: string | undefined,
    grade: Grade,
  ) => {
    if (!flashcardId) return;

    return async () => {
      const props = await getFlashcardProps(deckId, flashcardId);

      if (!props) return;

      const scheduled = f.next(props, new Date(), grade);
      const { card: newProps, log: newLog } = scheduled;

      await patchFlashcardProps(deckId, flashcardId, props.id, newProps);
      await addFlashcardLog(deckId, flashcardId, props.id, newLog);
    };
  };

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
      <div className="flex gap-4 absolute top-[70%]">
        <Button
          onClick={handleFlashcardRating(flashcards?.at(0)?.id, Rating.Again)}
        >
          Again
        </Button>
        <Button
          onClick={handleFlashcardRating(flashcards?.at(0)?.id, Rating.Easy)}
        >
          Easy
        </Button>
        <Button
          onClick={handleFlashcardRating(flashcards?.at(0)?.id, Rating.Good)}
        >
          Good
        </Button>
        <Button
          onClick={handleFlashcardRating(flashcards?.at(0)?.id, Rating.Hard)}
        >
          Hard
        </Button>
      </div>
    </div>
  );
}
