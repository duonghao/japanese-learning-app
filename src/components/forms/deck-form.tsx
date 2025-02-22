import { useActionState } from "react";

import { createOrUpdateDeck } from "@/actions/handleDeckFormSubmit";
import { deckFormSchema } from "@/schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Deck, WithId } from "@/lib/firebase/types";

const initialState = {
  message: "",
};

const initialFormValues = {
  name: "",
  description: "",
  tag: "",
};

interface DeckFormProps {
  deck?: WithId<Deck>;
}
export default function DeckForm({ deck }: DeckFormProps) {
  const createOrUpdateDeckWithDeckID = createOrUpdateDeck.bind(null, {
    deckId: deck?.id,
  });
  const [state, formAction, pending] = useActionState(
    createOrUpdateDeckWithDeckID,
    initialState,
  );

  const form = useForm<z.infer<typeof deckFormSchema>>({
    resolver: zodResolver(deckFormSchema),
    defaultValues: deck ? { ...deck } : initialFormValues,
  });

  return (
    <Form {...form}>
      <form action={formAction} className="flex flex-col gap-4">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input placeholder="Japanese N1" {...field} />
              </FormControl>
            </FormItem>
          )}
        ></FormField>
        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Description</FormLabel>
              <FormControl>
                <Input
                  placeholder="All Japanese N1 grammer, vocab, and kanji"
                  {...field}
                />
              </FormControl>
            </FormItem>
          )}
        ></FormField>
        <FormField
          control={form.control}
          name="tag"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Tag</FormLabel>
              <FormControl>
                <Input placeholder="Japanese" {...field} />
              </FormControl>
            </FormItem>
          )}
        ></FormField>
        <Button type="submit" disabled={pending}>
          Save
        </Button>
        <p aria-live="polite">{state.message}</p>
      </form>
    </Form>
  );
}
