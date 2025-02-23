"use client";

import { useActionState, useEffect } from "react";

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
import { toast } from "sonner";
import { Separator } from "../ui/separator";

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

  useEffect(() => {
    if (state.message) {
      toast("Flashcard added!");
    }
  }, [state]);

  return (
    <Form {...form}>
      <form
        action={formAction}
        id="flashcard"
        className="rounded-xl border flex flex-col"
      >
        <div className="flex flex-row justify-between items-end px-6 py-4">
          <h3>Flashcard Editor</h3>
          <div>
            <Button variant="secondary" type="submit" disabled={pending}>
              Save
            </Button>
          </div>
        </div>
        <Separator></Separator>
        <div className="grid grid-cols-2 gap-4 flex-1 p-4">
          <div className="rounded-xl border p-4">
            <div className="flex justify-center items-center h-full">
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
            </div>
          </div>
          <div className="rounded-xl border p-4">
            <div className="text-center h-full flex justify-center items-center">
              <h1>{form.watch("word")}</h1>
            </div>
          </div>
        </div>
      </form>
    </Form>
  );
}
