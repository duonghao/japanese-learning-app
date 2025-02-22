"use server";

import { addWordFlashcardToDeck } from "@/lib/firebase/firestore";
import { getAuthenticatedAppForUser } from "@/lib/firebase/serverApp";
import { flashcardFormSchema } from "@/schemas";
import { initializeFirestore } from "firebase/firestore";

export async function createFlashcardInDeck(
  context: { deckId: string },
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  prevState: any,
  formData: FormData,
) {
  const { firebaseServerApp } = await getAuthenticatedAppForUser();
  const db = initializeFirestore(firebaseServerApp, {
    ignoreUndefinedProperties: true,
  });

  const validatedFields = flashcardFormSchema.safeParse({
    word: formData.get("word"),
  });

  if (!validatedFields.success) {
    console.log(validatedFields.error.flatten().fieldErrors.word);
    return {
      message: "Failed to add flashcard!",
    };
  }

  const { word } = validatedFields.data;

  await addWordFlashcardToDeck(db, context.deckId, {
    word,
  });

  return {
    message: "Flashcard added!",
  };
}
