import { z } from "zod";

export const flashcardFormSchema = z.object({
  word: z.string(),
  definition: z.string(),
});

export const deckFormSchema = z.object({
  name: z.string(),
  description: z.string(),
  tag: z.string(),
});
