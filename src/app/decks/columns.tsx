"use client";

import { DeckDisplay } from "@/lib/firebase/types";
import { ColumnDef } from "@tanstack/react-table";

export const columns: ColumnDef<DeckDisplay>[] = [
  {
    accessorKey: "name",
    header: "Name",
  },
  {
    accessorKey: "description",
    header: "Description",
  },
  {
    accessorKey: "id",
    header: "ID",
  },
  {
    accessorKey: "tag",
    header: "Tag",
  },
];
