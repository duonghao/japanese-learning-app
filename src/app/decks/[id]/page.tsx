import FlashcardForm from "@/components/forms/flashcard-form";
import Flashcards from "@/components/flashcards";

export default async function DeckPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const id = (await params).id;

  return (
    <div className="grid grid-cols-2 h-screen">
      <div className="flex justify-center items-center">
        <FlashcardForm deckId={id} />
      </div>
      <div className="flex justify-center items-center">
        <Flashcards deckId={id} />
      </div>
    </div>
  );
}
