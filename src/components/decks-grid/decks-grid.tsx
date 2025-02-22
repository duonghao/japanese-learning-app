import Link from "next/link";

import { Row, Table } from "@tanstack/react-table";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import DeckForm from "@/components/forms/deck-form";
import {
  DataGrid,
  DataGridContent,
  DataGridFacetedFilter,
  DataGridPagination,
  DataGridToolbar,
} from "@/components/data-grid/data-grid";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { columns } from "@/components/decks-grid/columns";
import { Deck, WithId } from "@/lib/firebase/types";

function DecksActionsToolbar() {
  return (
    <div className="flex items-center gap-4">
      <Dialog>
        <DialogTrigger asChild>
          <Button variant="default">Add</Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Add a Deck</DialogTitle>
            <DialogDescription>
              Enter your new deck information. Click save when you&apos;re done.
            </DialogDescription>
          </DialogHeader>
          <DeckForm />
        </DialogContent>
      </Dialog>
    </div>
  );
}

interface DecksFiltersToolbarProps<TData> {
  table: Table<TData>;
}
function DecksFiltersToolbar<TData>({
  table,
}: DecksFiltersToolbarProps<TData>) {
  return (
    <div className="flex items-center gap-4">
      <Input
        placeholder="Filter by name..."
        value={(table.getColumn("name")?.getFilterValue() as string) ?? ""}
        onChange={(event) =>
          table.getColumn("name")?.setFilterValue(event.target.value)
        }
        className="max-w-sm"
      />
      <DataGridFacetedFilter column={table.getColumn("tag")} title={"Tags"} />
    </div>
  );
}

interface DeckCardProps<TData> {
  row: Row<TData>;
}
function DeckCard<TData>({ row }: DeckCardProps<TData>) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>{row.getValue("name")}</CardTitle>
        <CardDescription>
          <Badge variant="secondary">{row.getValue("tag")}</Badge>
        </CardDescription>
      </CardHeader>
      <CardContent>{row.getValue("description")}</CardContent>
      <CardFooter className="flex justify-between">
        <Button asChild variant="outline">
          <Link href={`/decks/${row.getValue("id")}`}>View</Link>
        </Button>
      </CardFooter>
    </Card>
  );
}

interface DecksGridProps {
  decks: WithId<Deck>[] | null;
}
export default function DecksGrid({ decks }: DecksGridProps) {
  return (
    <DataGrid name="deck" data={decks ?? []} columns={columns}>
      <DataGridToolbar>
        {(table) => {
          return (
            <div className="flex justify-between py-4">
              <DecksFiltersToolbar table={table} />
              <DecksActionsToolbar />
            </div>
          );
        }}
      </DataGridToolbar>
      <DataGridContent>
        {(row) => <DeckCard key={row.id} row={row} />}
      </DataGridContent>
      <DataGridPagination />
    </DataGrid>
  );
}
