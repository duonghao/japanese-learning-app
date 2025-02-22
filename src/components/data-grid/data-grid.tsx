"use client";

import { createContext, useState, ReactNode, useContext } from "react";
import { cn } from "@/lib/utils";

import {
  Column,
  ColumnDef,
  ColumnFiltersState,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getFacetedUniqueValues,
  useReactTable,
  Table,
  Row,
} from "@tanstack/react-table";

import {
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
  Check,
  PlusCircle,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Separator } from "@/components/ui/separator";

interface DataGridContext<TData> {
  table: Table<TData>;
  name: string;
}
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const DataGridContext = createContext<DataGridContext<any>>(undefined as any);
const useDataGrid = <T,>() => {
  const dataGridContext = useContext<DataGridContext<T>>(DataGridContext);

  if (dataGridContext === undefined) {
    throw new Error("No context provided");
  }

  return dataGridContext;
};

interface DataGridProps<TData, TValue> {
  name: string;
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
  children: ReactNode;
}

function DataGrid<TData, TValue>({
  name,
  columns,
  data,
  children,
}: DataGridProps<TData, TValue>) {
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [pagination, setPagination] = useState({
    pageIndex: 0, //initial page index
    pageSize: 10, //default page size
  });
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    onColumnFiltersChange: setColumnFilters,
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    onPaginationChange: setPagination,
    getFacetedUniqueValues: getFacetedUniqueValues(),
    state: {
      pagination,
      columnFilters,
    },
  });

  return (
    <DataGridContext.Provider value={{ table, name }}>
      {children}
    </DataGridContext.Provider>
  );
}

interface DataGridToolbarProps<TData> {
  children: (table: Table<TData>) => ReactNode;
}

function DataGridToolbar<TData>({ children }: DataGridToolbarProps<TData>) {
  const { table } = useDataGrid<TData>();

  return children(table);
}

interface DataGridContentProps<TData> {
  children: (row: Row<TData>) => ReactNode;
}

function DataGridContent<TData>({ children }: DataGridContentProps<TData>) {
  const { table } = useDataGrid<TData>();

  return (
    <div>
      <div className="rounded-xl border p-4 mb-4 min-h-screen bg-muted">
        {table.getRowModel().rows?.length ? (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
            {table.getRowModel().rows.map((row) => children(row))}
          </div>
        ) : (
          <div className="flex justify-center items-center">
            <div>No results.</div>
          </div>
        )}
      </div>
    </div>
  );
}

function DataGridPagination<TData>() {
  const { table, name } = useDataGrid<TData>();

  return (
    <div className="flex items-center justify-between">
      <div className="flex-1 text-sm text-muted-foreground">
        {table.getFilteredRowModel().rows.length} {name}(s)
      </div>
      <div className="flex items-center space-x-6 lg:space-x-8">
        <div className="flex items-center space-x-2">
          <p className="text-sm font-medium">
            <span className="capitalize inline">{name}</span> per page
          </p>
          <Select
            value={`${table.getState().pagination.pageSize}`}
            onValueChange={(value) => {
              table.setPageSize(Number(value));
            }}
          >
            <SelectTrigger className="h-8 w-[70px]">
              <SelectValue placeholder={table.getState().pagination.pageSize} />
            </SelectTrigger>
            <SelectContent side="top">
              {[10, 20, 30, 40, 50].map((pageSize) => (
                <SelectItem key={pageSize} value={`${pageSize}`}>
                  {pageSize}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div className="flex w-[100px] items-center justify-center text-sm font-medium">
          Page {table.getState().pagination.pageIndex + 1} of{" "}
          {table.getPageCount()}
        </div>
        <div className="flex items-center space-x-2">
          <Button
            variant="outline"
            className="hidden h-8 w-8 p-0 lg:flex"
            onClick={() => table.setPageIndex(0)}
            disabled={!table.getCanPreviousPage()}
          >
            <span className="sr-only">Go to first page</span>
            <ChevronsLeft />
          </Button>
          <Button
            variant="outline"
            className="h-8 w-8 p-0"
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
          >
            <span className="sr-only">Go to previous page</span>
            <ChevronLeft />
          </Button>
          <Button
            variant="outline"
            className="h-8 w-8 p-0"
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
          >
            <span className="sr-only">Go to next page</span>
            <ChevronRight />
          </Button>
          <Button
            variant="outline"
            className="hidden h-8 w-8 p-0 lg:flex"
            onClick={() => table.setPageIndex(table.getPageCount() - 1)}
            disabled={!table.getCanNextPage()}
          >
            <span className="sr-only">Go to last page</span>
            <ChevronsRight />
          </Button>
        </div>
      </div>
    </div>
  );
}

interface DataGridFacetedFilterProps<TData, TValue> {
  column?: Column<TData, TValue>;
  title?: string;
}

function DataGridFacetedFilter<TData, TValue>({
  column,
  title,
}: DataGridFacetedFilterProps<TData, TValue>) {
  const facets = column?.getFacetedUniqueValues();
  const selectedValues = new Set(column?.getFilterValue() as string[]);

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="outline" size="sm" className="h-8 border-dashed">
          <PlusCircle />
          {title}
          {selectedValues?.size > 0 && (
            <>
              <Separator orientation="vertical" className="mx-2 h-4" />
              <Badge
                variant="secondary"
                className="rounded-sm px-1 font-normal lg:hidden"
              >
                {selectedValues.size}
              </Badge>
              <div className="hidden space-x-1 lg:flex">
                {selectedValues.size > 2 ? (
                  <Badge
                    variant="secondary"
                    className="rounded-sm px-1 font-normal"
                  >
                    {selectedValues.size} selected
                  </Badge>
                ) : (
                  Array.from(facets?.keys() ?? [])
                    .filter((facet) => selectedValues.has(facet))
                    .map((facet) => (
                      <Badge
                        variant="secondary"
                        key={facet}
                        className="rounded-sm px-1 font-normal"
                      >
                        {facet}
                      </Badge>
                    ))
                )}
              </div>
            </>
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[200px] p-0" align="start">
        <Command>
          <CommandInput placeholder={title} />
          <CommandList>
            <CommandEmpty>No results found.</CommandEmpty>
            <CommandGroup>
              {Array.from(facets?.keys() ?? []).map((facet) => {
                const isSelected = selectedValues.has(facet);
                return (
                  <CommandItem
                    key={facet}
                    onSelect={() => {
                      if (isSelected) {
                        selectedValues.delete(facet);
                      } else {
                        selectedValues.add(facet);
                      }
                      const filterValues = Array.from(selectedValues);
                      column?.setFilterValue(
                        filterValues.length ? filterValues : undefined,
                      );
                    }}
                  >
                    <div
                      className={cn(
                        "mr-2 flex h-4 w-4 items-center justify-center rounded-sm border border-primary",
                        isSelected
                          ? "bg-primary text-primary-foreground"
                          : "opacity-50 [&_svg]:invisible",
                      )}
                    >
                      <Check />
                    </div>
                    <span>{facet}</span>
                    <span className="ml-auto flex h-4 w-4 items-center justify-center font-mono text-xs">
                      {facets?.get(facet)}
                    </span>
                  </CommandItem>
                );
              })}
            </CommandGroup>
            {selectedValues.size > 0 && (
              <>
                <CommandSeparator />
                <CommandGroup>
                  <CommandItem
                    onSelect={() => column?.setFilterValue(undefined)}
                    className="justify-center text-center"
                  >
                    Clear filters
                  </CommandItem>
                </CommandGroup>
              </>
            )}
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}

export {
  DataGrid,
  DataGridContent,
  DataGridToolbar,
  DataGridPagination,
  DataGridFacetedFilter,
};
