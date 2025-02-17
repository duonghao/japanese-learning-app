import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  Firestore,
  getDocs,
  onSnapshot,
  updateDoc,
} from "firebase/firestore";
import { db } from "./clientApp";
import {
  Flashcard,
  FlashcardDisplay,
  Deck,
  DeckDisplay,
  FlashcardProps,
  FlashcardPropsDisplay,
  FlashcardLog,
} from "./types";
import { collectionWithConverter, docWithConverter } from "./utils";

import { createEmptyCard } from "ts-fsrs";

export async function addFlashcardToDeck(
  db: Firestore,
  deckId: string,
  flashCard: Flashcard,
) {
  try {
    const flashcardRef = await addDoc(
      collectionWithConverter<Flashcard>(db, "decks", deckId, "flashcards"),
      flashCard,
    );

    const props = createEmptyCard();

    await addDoc(
      collectionWithConverter<FlashcardProps>(
        db,
        "decks",
        deckId,
        "flashcards",
        flashcardRef.id,
        "props",
      ),
      props,
    );
  } catch (error) {
    console.log("There was an error adding a flashcard.", error);
  }
}

export async function getFlashcardProps(deckId: string, flashcardId: string) {
  try {
    const doc = await getDocs(
      collectionWithConverter<FlashcardPropsDisplay>(
        db,
        "decks",
        deckId,
        "flashcards",
        flashcardId,
        "props",
      ),
    );
    return doc.docs.at(0)?.data();
  } catch (error) {
    console.log(
      `There was an error retrieving the props for flashcard ${flashcardId}`,
      error,
    );
  }
}

export async function patchFlashcardProps(
  deckId: string,
  flashcardId: string,
  propId: string,
  props: FlashcardProps,
) {
  try {
    await updateDoc(
      docWithConverter<FlashcardProps>(
        db,
        "decks",
        deckId,
        "flashcards",
        flashcardId,
        "props",
        propId,
      ),
      props,
    );
  } catch (error) {
    console.log(`There was an error patching the props for ${propId}`, error);
  }
}

export async function addFlashcardLog(
  deckId: string,
  flashcardId: string,
  propId: string,
  log: FlashcardLog,
) {
  try {
    await addDoc(
      collectionWithConverter<FlashcardLog>(
        db,
        "decks",
        deckId,
        "flashcards",
        flashcardId,
        "props",
        propId,
        "logs",
      ),
      log,
    );
  } catch (error) {
    console.log(`There was an error patching the props for ${propId}`, error);
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

export function getDeck(
  id: string,
  cb: (deck: DeckDisplay | undefined) => void,
) {
  const unsub = onSnapshot(
    docWithConverter<DeckDisplay>(db, "decks", id),
    (doc) => {
      const deck = doc.data();
      cb(deck);
    },
  );
  return unsub;
}
