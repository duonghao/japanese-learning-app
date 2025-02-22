"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useFSRS } from "@/hooks/useFSRS";

import { useParams } from "next/navigation";
import { Rating } from "ts-fsrs";

export default function StartPage() {
  const { deckId } = useParams<{ deckId: string }>();
  const { flashcards, updateCurrent } = useFSRS(deckId);

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
            </div>
          </CardContent>
        </Card>
      ))}
      <div className="flex gap-4 absolute top-[70%]">
        <Button onClick={() => updateCurrent(Rating.Again)}>Again</Button>
        <Button onClick={() => updateCurrent(Rating.Easy)}>Easy</Button>
        <Button onClick={() => updateCurrent(Rating.Good)}>Good</Button>
        <Button onClick={() => updateCurrent(Rating.Hard)}>Hard</Button>
      </div>
    </div>
  );
}
