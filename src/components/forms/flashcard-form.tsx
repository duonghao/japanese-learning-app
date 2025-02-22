"use client";

import { useActionState } from "react";

import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { createFlashcardInDeck } from "@/actions/handleFlashcardFormSubmit";
import { flashcardFormSchema } from "@/schemas";

const initialState = {
  message: "",
};

export default function FlashcardForm(props: { deckId: string }) {
  const createFlashcardInDeckWithDeckID = createFlashcardInDeck.bind(null, {
    deckId: props.deckId,
  });
  const [state, formAction, pending] = useActionState(
    createFlashcardInDeckWithDeckID,
    initialState,
  );

  const form = useForm<z.infer<typeof flashcardFormSchema>>({
    resolver: zodResolver(flashcardFormSchema),
    defaultValues: {
      word: "",
    },
  });

  return (
    <Form {...form}>
      <form action={formAction} className="flex flex-col gap-4 w-64">
        <FormField
          control={form.control}
          name="word"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Word</FormLabel>
              <FormControl>
                <Input placeholder="Cat" {...field} />
              </FormControl>
            </FormItem>
          )}
        ></FormField>
        <Button type="submit" disabled={pending}>
          Add
        </Button>
        <p aria-live="polite">{state.message}</p>
      </form>
    </Form>
  );
}
