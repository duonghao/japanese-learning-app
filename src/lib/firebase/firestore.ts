import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  Firestore,
  onSnapshot,
  query,
  updateDoc,
  where,
} from "firebase/firestore";
import { db } from "./clientApp";
import { Deck, Flashcard, FlashcardLog, WithId, Word } from "./types";
import { collectionWithConverter, docWithConverter } from "./utils";

import { createEmptyCard } from "ts-fsrs";

export async function addWordFlashcardToDeck(
  db: Firestore,
  deckId: string,
  word: Word,
) {
  try {
    const fc = createEmptyCard();
    await addDoc(
      collectionWithConverter<Flashcard>(db, "decks", deckId, "flashcards"),
      { ...fc, ...word },
    );
  } catch (error) {
    console.log("There was an error adding a flashcard.", error);
  }
}

export async function patchFlashcard(
  deckId: string,
  flashcardId: string,
  flashcard: Flashcard,
) {
  try {
    await updateDoc(
      docWithConverter<Flashcard>(
        db,
        "decks",
        deckId,
        "flashcards",
        flashcardId,
      ),
      flashcard,
    );
  } catch (error) {
    console.log(
      `There was an error patching the props for ${flashcardId}`,
      error,
    );
  }
}

export async function addFlashcardLog(
  deckId: string,
  flashcardId: string,
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
        "logs",
      ),
      log,
    );
  } catch (error) {
    console.log(`There was an error add logs for ${flashcardId}`, error);
  }
}

export function getFlashcardsFromDeck(
  deckId: string,
  cb: (flashcard: WithId<Flashcard>[]) => void,
) {
  const unsub = onSnapshot(
    collectionWithConverter<WithId<Flashcard>>(
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
      const fc = createEmptyCard();
      await addDoc(collectionWithConverter<Flashcard>(docRef, "flashcards"), {
        ...fc,
        word: "Hello",
      });
    }
    console.log(`Flashcard written with id: ${docRef.id}`);
  } catch (error) {
    console.log("There was an error adding a flashcard.", error);
  }
}

export function getDecks(cb: (flashcard: WithId<Deck>[]) => void) {
  const unsub = onSnapshot(collection(db, "decks"), (collection) => {
    const decks = collection.docs.map((doc) => {
      console.log(doc.data());
      const deck = doc.data() as Deck;
      return {
        ...deck,
        id: doc.id,
      };
    }) as unknown as WithId<Deck>[];
    cb(decks);
  });
  return unsub;
}

export function getDeck(
  id: string,
  cb: (deck: WithId<Deck> | undefined) => void,
) {
  const unsub = onSnapshot(
    docWithConverter<WithId<Deck>>(db, "decks", id),
    (doc) => {
      const deck = doc.data();
      cb(deck);
    },
  );
  return unsub;
}

export function getDueFlashcardsFromDeck(
  deckId: string,
  cb: (deck: WithId<Flashcard>[] | null) => void,
) {
  const unsub = onSnapshot(
    query(
      collectionWithConverter<WithId<Flashcard>>(
        db,
        "decks",
        deckId,
        "flashcards",
      ),
      where("due", "<", new Date()),
    ),
    (collection) => {
      cb(collection.docs.map((doc) => doc.data()));
    },
  );
  return unsub;
}
