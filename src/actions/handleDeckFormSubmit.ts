"use server";

import { addDeck, patchDeck } from "@/lib/firebase/firestore";
import { getAuthenticatedAppForUser } from "@/lib/firebase/serverApp";
import { fsrsParams } from "@/lib/fsrs/fsrs";
import { deckFormSchema } from "@/schemas";
import { getFirestore } from "firebase/firestore";

export async function createOrUpdateDeck(
  context: { deckId?: string },
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

  if (context.deckId) {
    await patchDeck(db, context.deckId, {
      name,
      description,
      tag,
    });
    return { message: "Deck updated!" };
  }

  await addDeck(db, {
    name,
    description,
    tag,
    ...fsrsParams,
  });

  return {
    message: "Deck added!",
  };
}
