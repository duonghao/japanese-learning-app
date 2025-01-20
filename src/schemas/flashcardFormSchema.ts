import { z } from "zod";

export const flashcardFormSchema = z.object({
  word: z.string(),
  definition: z.string(),
});
