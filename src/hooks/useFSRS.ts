import {
  addFlashcardLog,
  getDeckSub,
  getDueFlashcardsFromDeck,
  patchFlashcard,
} from "@/lib/firebase/firestore";
import { useEffect, useState } from "react";
import { FSRS, Grade } from "ts-fsrs";
import { Deck, Flashcard, WithId } from "@/lib/firebase/types";

export function useFSRS(deckId: string) {
  const [flashcards, setFlashcards] = useState<WithId<Flashcard>[] | null>(
    null,
  );
  const [isLoadedFlashcard, setIsLoadedFlashcard] = useState(false);

  const [deck, setDeck] = useState<Deck | undefined>(undefined);
  const [isLoadedDeck, setIsLoadedDeck] = useState(false);
  const isLoaded = isLoadedFlashcard && isLoadedDeck;

  const current = flashcards?.at(0);
  const updateCurrent = async (grade: Grade) => {
    if (!current || !deck) return;
    const flashcardId = current.id;

    const f = new FSRS(deck);
    const scheduled = f.next(current, new Date(), grade);
    const { card: newFlashcard, log: newLog } = scheduled;

    await patchFlashcard(deckId, flashcardId, {
      ...newFlashcard,
      word: current.word,
    });
    await addFlashcardLog(deckId, flashcardId, newLog);
  };

  useEffect(() => {
    const unsubDeck = getDeckSub(deckId, (deck) => {
      setDeck(deck);
      setIsLoadedDeck(true);
    });
    const unsubFlashcards = getDueFlashcardsFromDeck(deckId, (flashcards) => {
      setFlashcards(flashcards);
      setIsLoadedFlashcard(true);
    });

    return () => {
      unsubDeck();
      unsubFlashcards();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return {
    flashcards,
    isLoaded,
    current,
    updateCurrent,
  };
}
