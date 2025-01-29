import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  Firestore,
  onSnapshot,
} from "firebase/firestore";
import { db } from "./clientApp";
import { Flashcard, FlashcardDisplay } from "./types";
import { collectionWithConverter } from "./utils";

export async function addFlashcardToDeck(
  db: Firestore,
  deckId: string,
  flashCard: Flashcard,
) {
  try {
    const docRef = await addDoc(
      collectionWithConverter<Flashcard>(db, "decks", deckId, "flashcards"),
      flashCard,
    );
    console.log(`Flashcard written with id: ${docRef.id}`);
  } catch (error) {
    console.log("There was an error adding a flashcard.", error);
  }
}

export function getFlashcardsFromDeck(
  deckId: string,
  cb: (flashcard: FlashcardDisplay[]) => void,
) {
  const unsub = onSnapshot(
    collectionWithConverter<FlashcardDisplay>(
      db,
      "decks",
      deckId,
      "flashcards",
    ),
    (collection) => {
      const flashcards = collection.docs.map((doc) => {
        return doc.data();
      });
      cb(flashcards);
    },
  );
  return unsub;
}

export async function deleteFlashcardFromDeck(
  deckId: string,
  flashcardId: string,
) {
  await deleteDoc(doc(db, "decks", deckId, "flashcards", flashcardId));
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
    const docRef = await addDoc(
      collectionWithConverter<Deck>(db, "decks"),
      deck,
    );
    for (let i = 0; i < 5; i++) {
      await addDoc(collectionWithConverter<Flashcard>(docRef, "flashcards"), {
        word: "Hello",
        definition: "Word",
      });
    }
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
