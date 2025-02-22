import { Row, Table } from "@tanstack/react-table";

import {
  DataGrid,
  DataGridContent,
  DataGridFacetedFilter,
  DataGridPagination,
  DataGridToolbar,
} from "@/components/data-grid/data-grid";
import { Card, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";

import { columns } from "@/components/flashcards-grid/columns";
import { Button } from "../ui/button";
import { deleteFlashcardFromDeck } from "@/lib/firebase/firestore";
import { Flashcard, WithId } from "@/lib/firebase/types";

interface FlashcardsFiltersToolbarProps<TData> {
  table: Table<TData>;
}

function FlashcardsFiltersToolbar<TData>({
  table,
}: FlashcardsFiltersToolbarProps<TData>) {
  return (
    <div className="flex items-center gap-4">
      <Input
        placeholder="Filter words..."
        value={(table.getColumn("word")?.getFilterValue() as string) ?? ""}
        onChange={(event) =>
          table.getColumn("word")?.setFilterValue(event.target.value)
        }
        className="max-w-sm"
      />
      <DataGridFacetedFilter
        column={table.getColumn("state")}
        title={"State"}
      />
    </div>
  );
}

interface FlashcardCardProps<TData> {
  row: Row<TData>;
  deckId: string;
}
function FlashcardCard<TData>({ row, deckId }: FlashcardCardProps<TData>) {
  return (
    <Card key={row.id}>
      <CardHeader>
        <CardTitle>{row.getValue("word")}</CardTitle>
      </CardHeader>
      <CardFooter className="flex justify-end">
        <Button
          variant={"destructive"}
          onClick={() => deleteFlashcardFromDeck(deckId, row.getValue("id"))}
        >
          Delete
        </Button>
      </CardFooter>
    </Card>
  );
}

interface FlashcardsGridProps {
  flashcards: WithId<Flashcard>[] | null;
  deckId: string;
}

export default function FlashcardsGrid({
  flashcards,
  deckId,
}: FlashcardsGridProps) {
  return (
    <DataGrid name="flashcard" data={flashcards ?? []} columns={columns}>
      <DataGridToolbar>
        {(table) => {
          return (
            <div className="flex justify-between pb-4">
              <FlashcardsFiltersToolbar table={table} />
            </div>
          );
        }}
      </DataGridToolbar>
      <DataGridContent>
        {(row) => <FlashcardCard row={row} deckId={deckId} />}
      </DataGridContent>
      <DataGridPagination />
    </DataGrid>
  );
}
