import { useActionState } from "react";

import { advancedSettingsSchema } from "@/schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Deck, WithId } from "@/lib/firebase/types";
import { Switch } from "../ui/switch";
import { updateAdvancedSettings } from "@/actions/handleAdvancedSettingsSubmit";

const initialState = {
  message: "",
  error: undefined,
};

interface DeckFormProps {
  deck: WithId<Deck>;
}
export default function AdvancedSettingsForm({ deck }: DeckFormProps) {
  const updateAdvancedSettingsWithId = updateAdvancedSettings.bind(null, {
    deckId: deck.id,
  });
  const [state, formAction, pending] = useActionState(
    updateAdvancedSettingsWithId,
    initialState,
  );

  const form = useForm<z.infer<typeof advancedSettingsSchema>>({
    resolver: zodResolver(advancedSettingsSchema),
    defaultValues: {
      ...deck,
      w: deck.w.join(","),
    },
  });

  return (
    <Form {...form}>
      <form action={formAction} className="flex flex-col gap-4">
        <FormField
          control={form.control}
          name="request_retention"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Request Retention</FormLabel>
              <FormControl>
                <Input placeholder="0.85" {...field} type="number" />
              </FormControl>
              {state.error?.request_retention && (
                <FormMessage>{state.error?.request_retention}</FormMessage>
              )}
              <FormDescription>
                Represents the probability of the target memory you want. Note
                that there is a trade-off between higher retention rates and
                higher repetition rates. It is recommended that you set this
                value between 0.8 and 0.9.
              </FormDescription>
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="maximum_interval"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Maximum Interval</FormLabel>
              <FormControl>
                <Input placeholder="365" {...field} type="number" />
              </FormControl>
              {state.error?.maximum_interval && (
                <FormMessage>{state.error?.maximum_interval}</FormMessage>
              )}
              <FormDescription>
                The maximum number of days between reviews of a card. When the
                review interval of a card reaches this number of days, the{" "}
                <i>hard</i>, <i>good</i>, and <i>easy</i> intervals will be
                consistent. The shorter the interval, the more workload.
              </FormDescription>
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="w"
          render={({ field }) => (
            <FormItem>
              <FormLabel>W</FormLabel>
              <FormControl>
                <Input placeholder="0.40255,1.18385,0.15673..." {...field} />
              </FormControl>
              {state.error?.w && <FormMessage>{state.error?.w}</FormMessage>}
              <FormDescription>
                Weights created by running the FSRS optimizer. By default, these
                are calculated from a sample dataset.
              </FormDescription>
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="enable_fuzz"
          render={({ field }) => (
            <FormItem className="flex flex-col">
              <FormLabel>Fuzz</FormLabel>
              <FormControl>
                <Switch
                  checked={field.value}
                  onCheckedChange={field.onChange}
                />
              </FormControl>
              <FormDescription>
                When enabled, this adds a small random delay to the new interval
                time to prevent cards from sticking together and always being
                reviewed on the same day.
              </FormDescription>
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="enable_short_term"
          render={({ field }) => (
            <FormItem className="flex flex-col">
              <FormLabel>Short Term</FormLabel>
              <FormControl>
                <Switch
                  checked={field.value}
                  onCheckedChange={field.onChange}
                />
              </FormControl>
              <FormDescription>
                When disabled, this allow user to skip the short-term schedule.
              </FormDescription>
            </FormItem>
          )}
        />
        <Button type="submit" disabled={pending}>
          Save
        </Button>
        {state.message && <p aria-live="polite">{state.message}</p>}
      </form>
    </Form>
  );
}
