"use client";

import { FlashcardDisplay } from "@/lib/firebase/types";
import { ColumnDef } from "@tanstack/react-table";

export const columns: ColumnDef<FlashcardDisplay>[] = [
  {
    accessorKey: "word",
    header: "Word",
  },
  {
    accessorKey: "definition",
    header: "Definition",
  },
  {
    accessorKey: "id",
    header: "ID",
  },
];
