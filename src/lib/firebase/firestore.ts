import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  Firestore,
  onSnapshot,
} from "firebase/firestore";
import { db } from "./clientApp";

export type Flashcard = {
  word: string;
  definition: string;
};

export type FlashcardDisplay = {
  id: string;
} & Flashcard;

export async function addFlashcard(db: Firestore, flashCard: Flashcard) {
  try {
    const docRef = await addDoc(collection(db, "flashcards"), flashCard);
    console.log(`Flashcard written with id: ${docRef.id}`);
  } catch (error) {
    console.log("There was an error adding a flashcard.", error);
  }
}

export function getFlashcards(cb: (flashcard: FlashcardDisplay[]) => void) {
  const unsub = onSnapshot(collection(db, "flashcards"), (collection) => {
    const flashcards = collection.docs.map((doc) => {
      const flashcard = doc.data() as Flashcard;
      return {
        ...flashcard,
        id: doc.id,
      };
    }) as unknown as FlashcardDisplay[];
    cb(flashcards);
  });
  return unsub;
}

export async function deleteFlashcard(id: string) {
  await deleteDoc(doc(db, "flashcards", id));
}

export type Deck = {
  name: string;
  description: string;
};

export type DeckDisplay = {
  id: string;
} & Deck;

export async function addDeck(db: Firestore, deck: Deck) {
  try {
    const docRef = await addDoc(collection(db, "decks"), deck);
    console.log(`Flashcard written with id: ${docRef.id}`);
  } catch (error) {
    console.log("There was an error adding a flashcard.", error);
  }
}

export function getDecks(cb: (flashcard: DeckDisplay[]) => void) {
  const unsub = onSnapshot(collection(db, "decks"), (collection) => {
    const decks = collection.docs.map((doc) => {
      console.log(doc.data());
      const deck = doc.data() as Deck;
      return {
        ...deck,
        id: doc.id,
      };
    }) as unknown as DeckDisplay[];
    cb(decks);
  });
  return unsub;
}
