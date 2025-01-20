"use server";

import { addFlashcard } from "@/lib/firebase/firestore";
import { getAuthenticatedAppForUser } from "@/lib/firebase/serverApp";
import { flashcardFormSchema } from "@/schemas/flashcardFormSchema";
import { getFirestore } from "firebase/firestore";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export async function createFlashcard(prevState: any, formData: FormData) {
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

  await addFlashcard(db, {
    word,
    definition,
  });

  return {
    message: "Flashcard added!",
  };
}
