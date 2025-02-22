"use client";

import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";

import { getDeckSub } from "@/lib/firebase/firestore";
import { Deck, WithId } from "@/lib/firebase/types";

interface DeckContext {
  deckId?: string;
  deck?: Deck;
}
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const DeckContext = createContext<DeckContext>(undefined as any);

export const DeckContextProvider = ({
  deckId,
  children,
}: {
  deckId: string;
  children: ReactNode;
}) => {
  const [deck, setDeck] = useState<WithId<Deck> | undefined>(undefined);

  useEffect(() => {
    const unsub = getDeckSub(deckId, (deck) => setDeck(deck));
    return unsub;
  }, [deckId]);

  return (
    <DeckContext.Provider value={{ deckId: deckId, deck: deck }}>
      {children}
    </DeckContext.Provider>
  );
};

export const useDeckContext = () => {
  const deckContext = useContext<DeckContext>(DeckContext);

  if (deckContext === undefined) {
    throw new Error("No context provided");
  }

  return deckContext;
};
