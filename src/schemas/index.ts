import { z } from "zod";

export const flashcardFormSchema = z.object({
  word: z.string(),
});

export const deckFormSchema = z.object({
  name: z.string(),
  description: z.string(),
  tag: z.string(),
});

export const advancedSettingsSchema = z.object({
  request_retention: z
    .string()
    .nonempty({ message: "Request Retention cannot be empty" })
    .refine((x) => z.coerce.number().safeParse(x).success, {
      message: "Maximum Interval must be a number",
    })
    .transform((x) => Number(x)),
  maximum_interval: z
    .string()
    .nonempty({ message: "Maximum Interval cannot be empty" })
    .refine((x) => z.coerce.number().min(0).safeParse(x).success, {
      message: "Maximum Interval must be a number greater than or equal to 0",
    })
    .transform((x) => Number(x)),
  w: z
    .string({
      invalid_type_error: "Invalid w",
      required_error: "w is required",
    })
    .refine(
      (value) =>
        value
          .split(",")
          .every(
            (item) => item !== "" && z.coerce.number().safeParse(item).success,
          ),
      { message: "Must be a comma separated list of numbers" },
    ),
  enable_fuzz: z.coerce.boolean(),
  enable_short_term: z.coerce.boolean(),
});
