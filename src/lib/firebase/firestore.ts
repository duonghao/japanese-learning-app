import { addDoc, collection, Firestore, onSnapshot } from "firebase/firestore";
import { db } from "./clientApp";

export type Flashcard = {
  word: string;
  definition: string;
};

export async function addFlashcard(db: Firestore, flashCard: Flashcard) {
  try {
    const docRef = await addDoc(collection(db, "flashcards"), flashCard);
    console.log(`Flashcard written with id: ${docRef.id}`);
  } catch (error) {
    console.log("There was an error adding a flashcard.", error);
  }
}

export function getFlashcards(cb: (flashcard: Flashcard[]) => void) {
  const unsub = onSnapshot(collection(db, "flashcards"), (collection) => {
    const flashcards = collection.docs.map((doc) =>
      doc.data(),
    ) as unknown as Flashcard[];
    cb(flashcards);
  });
  return unsub;
}
