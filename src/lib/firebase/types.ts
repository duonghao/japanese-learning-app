import { Card as FSRSCardProps, ReviewLog as FSRSLog } from "ts-fsrs";

export type FlashcardLog = FSRSLog;
export type FlashcardProps = FSRSCardProps;
export type Flashcard = {
  word: string;
  definition: string;
};

export type Deck = {
  name: string;
  description: string;
  tag: string;
};

type Display<T> = T & {
  id: string;
};

export type FlashcardLogDisplay = Display<FSRSLog>;
export type FlashcardPropsDisplay = Display<FSRSCardProps>;
export type FlashcardDisplay = Display<Flashcard>;
export type DeckDisplay = Display<Deck>;
