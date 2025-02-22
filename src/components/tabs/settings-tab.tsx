import { useDeckContext } from "@/hooks/useDeckContext";

import DeckForm from "@/components/forms/deck-form";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";
import { Skeleton } from "@/components/ui/skeleton";
import AdvancedSettingsForm from "../forms/advanced-settings-form";

export default function SettingsTab() {
  return (
    <div className="rounded-xl border p-4 h-screen">
      <Tabs
        defaultValue="details"
        orientation="vertical"
        className="flex flex-col lg:flex-row lg:pr-0"
      >
        <TabsList className="flex space-x-2 lg:flex-col lg:space-x-0 lg:space-y-1 pr-4 bg-transparent lg:w-1/5">
          <TabsTrigger
            value="details"
            className="data-[state=active]:bg-muted data-[state=active]:shadow-none lg:pr-32 justify-start"
          >
            Details
          </TabsTrigger>
          <TabsTrigger
            value="advanced"
            className="data-[state=active]:bg-muted data-[state=active]:shadow-none lg:pr-32 justify-start"
          >
            Advanced
          </TabsTrigger>
        </TabsList>
        <TabsContent value="details" className="flex-1 lg:max-w-2xl mt-0">
          <DetailsSubTab />
        </TabsContent>
        <TabsContent value="advanced" className="flex-1 lg:max-w-2xl mt-0">
          <AdvancedSubTab />
        </TabsContent>
      </Tabs>
    </div>
  );
}

function DetailsSubTab() {
  const { deckId, deck } = useDeckContext();

  if (!deckId || !deck) {
    return <FormSkeleton />;
  }

  return (
    <div className="space-y-6">
      <div>
        <h3>Details</h3>
      </div>
      <Separator />
      <DeckForm deck={{ id: deckId, ...deck }} />
    </div>
  );
}

function AdvancedSubTab() {
  const { deck, deckId } = useDeckContext();

  if (!deckId || !deck) {
    return <FormSkeleton />;
  }

  return (
    <div className="space-y-6">
      <div>
        <h3>Advanced</h3>
      </div>
      <Separator />
      <AdvancedSettingsForm deck={{ id: deckId, ...deck }} />
    </div>
  );
}

function FormSkeleton() {
  return (
    <div className="space-y-2">
      <Skeleton className="h-4 w-[250px]" />
      <Skeleton className="h-4 w-[200px]" />
    </div>
  );
}
