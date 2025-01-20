import { addDoc, collection, Firestore } from "firebase/firestore";

type FlashCard = {
  word: string;
  definition: string;
};

export async function addFlashcard(db: Firestore, flashCard: FlashCard) {
  try {
    const docRef = await addDoc(collection(db, "flashcards"), flashCard);
    console.log(`Flashcard written with id: ${docRef.id}`);
  } catch (error) {
    console.log("There was an error adding a flashcard.", error);
  }
}
