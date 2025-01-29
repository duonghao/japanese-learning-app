export type Flashcard = {
  word: string;
  definition: string;
};

export type Deck = {
  name: string;
  description: string;
};

type Display<T> = T & {
  id: string;
};

export type FlashcardDisplay = Display<Flashcard>;
export type DeckDisplay = Display<Deck>;
