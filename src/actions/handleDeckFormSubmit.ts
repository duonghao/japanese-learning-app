"use server";

import { addDeck } from "@/lib/firebase/firestore";
import { getAuthenticatedAppForUser } from "@/lib/firebase/serverApp";
import { deckFormSchema } from "@/schemas";
import { getFirestore } from "firebase/firestore";

export async function createDeck(
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  prevState: any,
  formData: FormData,
) {
  const { firebaseServerApp } = await getAuthenticatedAppForUser();
  const db = getFirestore(firebaseServerApp);

  const validatedFields = deckFormSchema.safeParse({
    name: formData.get("name"),
    description: formData.get("description"),
    tag: formData.get("tag"),
  });

  if (!validatedFields.success) {
    return {
      message: "Failed to add deck!",
    };
  }

  const { name, description, tag } = validatedFields.data;

  await addDeck(db, {
    name: name,
    description: description,
    tag: tag,
  });

  return {
    message: "Deck added!",
  };
}
