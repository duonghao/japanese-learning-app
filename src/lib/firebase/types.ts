import {
  Card as FSRSCardProps,
  ReviewLog as FSRSLog,
  FSRSParameters,
} from "ts-fsrs";

export type WithId<T> = T & {
  id: string;
};

export type Word = {
  word: string;
};

export type DeckParams = FSRSParameters;
export type FlashcardLog = FSRSLog;
export type Flashcard = FSRSCardProps & Word;

export type Deck = {
  name: string;
  description: string;
  tag: string;
} & DeckParams;
