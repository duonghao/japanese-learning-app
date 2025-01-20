import FlashcardForm from "@/components/flashcardform";
import Flashcards from "@/components/flashcards";

export default function Main() {
  return (
    <div className="grid grid-cols-2 h-screen">
      <div className="flex justify-center items-center">
        <FlashcardForm />
      </div>
      <div className="flex justify-center items-center">
        <Flashcards />
      </div>
    </div>
  );
}
