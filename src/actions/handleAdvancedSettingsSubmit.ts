"use server";

import { patchDeck } from "@/lib/firebase/firestore";
import { getAuthenticatedAppForUser } from "@/lib/firebase/serverApp";
import { advancedSettingsSchema } from "@/schemas";
import { getFirestore } from "firebase/firestore";

export async function updateAdvancedSettings(
  context: { deckId: string },
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  prevState: any,
  formData: FormData,
) {
  const { firebaseServerApp } = await getAuthenticatedAppForUser();
  const db = getFirestore(firebaseServerApp);

  const validatedFields = advancedSettingsSchema.safeParse({
    request_retention: formData.get("request_retention"),
    maximum_interval: formData.get("maximum_interval"),
    w: formData.get("w"),
    enable_fuzz: formData.get("enable_fuzz"),
    enable_short_term: formData.get("enable_short_term"),
  });

  if (!validatedFields.success) {
    const formFieldErrors = validatedFields.error.flatten().fieldErrors;
    return {
      error: {
        request_retention: formFieldErrors?.request_retention?.at(0),
        maximum_interval: formFieldErrors?.maximum_interval?.at(0),
        w: formFieldErrors?.w?.at(0),
        enable_fuzz: formFieldErrors?.enable_fuzz?.at(0),
        enable_short_term: formFieldErrors?.enable_short_term?.at(0),
      },
    };
  }

  const {
    request_retention,
    maximum_interval,
    w,
    enable_fuzz,
    enable_short_term,
  } = validatedFields.data;

  patchDeck(db, context.deckId, {
    request_retention,
    maximum_interval,
    w: w.split(",").map(Number),
    enable_fuzz,
    enable_short_term,
  });

  return {
    message: "Parameters updated successfully!",
  };
}
