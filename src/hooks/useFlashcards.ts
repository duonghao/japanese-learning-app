import { useEffect, useState } from "react";

import { getFlashcardsFromDeck } from "@/lib/firebase/firestore";
import { FlashcardDisplay } from "@/lib/firebase/types";

export function useFlashcards(deckId: string) {
  const [flashcards, setFlashcards] = useState<FlashcardDisplay[] | null>(null);

  useEffect(() => {
    const unsub = getFlashcardsFromDeck(deckId, (flashcards) =>
      setFlashcards(flashcards),
    );

    return unsub;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return {
    flashcards,
    setFlashcards,
  };
}
