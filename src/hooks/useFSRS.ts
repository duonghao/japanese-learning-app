import {
  addFlashcardLog,
  getDueFlashcardsFromDeck,
  patchFlashcard,
} from "@/lib/firebase/firestore";
import { useEffect, useState } from "react";
import { f } from "@/lib/fsrs/fsrs";
import { Grade } from "ts-fsrs";
import { Flashcard, WithId } from "@/lib/firebase/types";

export function useFSRS(deckId: string) {
  const [flashcards, setFlashcards] = useState<WithId<Flashcard>[] | null>(
    null,
  );

  const current = flashcards?.at(0);
  const updateCurrent = async (grade: Grade) => {
    if (!current) return;
    const flashcardId = current.id;

    const scheduled = f.next(current, new Date(), grade);
    const { card: newFlashcard, log: newLog } = scheduled;

    await patchFlashcard(deckId, flashcardId, {
      ...newFlashcard,
      word: current.word,
    });
    await addFlashcardLog(deckId, flashcardId, newLog);
  };

  useEffect(() => {
    const unsub = getDueFlashcardsFromDeck(deckId, (flashcards) =>
      setFlashcards(flashcards),
    );

    return unsub;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return {
    flashcards,
    current,
    updateCurrent,
  };
}
