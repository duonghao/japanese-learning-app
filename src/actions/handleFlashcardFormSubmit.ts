"use server";

import { addFlashcardToDeck } from "@/lib/firebase/firestore";
import { getAuthenticatedAppForUser } from "@/lib/firebase/serverApp";
import { flashcardFormSchema } from "@/schemas";
import { getFirestore } from "firebase/firestore";

export async function createFlashcardInDeck(
  context: { deckId: string },
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  prevState: any,
  formData: FormData,
) {
  const { firebaseServerApp } = await getAuthenticatedAppForUser();
  const db = getFirestore(firebaseServerApp);

  const validatedFields = flashcardFormSchema.safeParse({
    word: formData.get("word"),
    definition: formData.get("definition"),
  });

  if (!validatedFields.success) {
    console.log(validatedFields.error.flatten().fieldErrors.definition);
    console.log(validatedFields.error.flatten().fieldErrors.word);
    return {
      message: "Failed to add flashcard!",
    };
  }

  const { word, definition } = validatedFields.data;

  await addFlashcardToDeck(db, context.deckId, {
    word,
    definition,
  });

  return {
    message: "Flashcard added!",
  };
}
