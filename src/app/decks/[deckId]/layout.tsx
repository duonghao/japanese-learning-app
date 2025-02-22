import { ReactNode } from "react";

import { DeckContextProvider } from "@/hooks/useDeckContext";

export default async function DeckLayout({
  params,
  children,
}: {
  children: ReactNode;
  params: Promise<{ deckId: string }>;
}) {
  const { deckId } = await params;

  return <DeckContextProvider deckId={deckId}>{children}</DeckContextProvider>;
}
