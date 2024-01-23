import {
  flexRender,
  useReactTable,
  getCoreRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  SortingState,
  getFilteredRowModel,
} from "@tanstack/react-table";
import { columnDefProfiles } from "./columns";
import { Table, Button, ButtonGroup } from "react-bootstrap";
import dataJSON from "../../public/api/profiles.json";
import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { SearchInput } from "./SearchInput";

export const ProfilesTable = () => {
  const router = useNavigate();
  const data = useMemo(() => dataJSON, []);
  const columns = useMemo(() => columnDefProfiles, []);
  const [sorting, setSorting] = useState<SortingState>([]);
  const [filtering, setFiltering] = useState("");

  const table = useReactTable({
    columns,
    data,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    state: {
      sorting: sorting,
      globalFilter: filtering,
    },
    initialState: {
      pagination: {
        pageSize: 8,
      },
    },
    onSortingChange: setSorting,
    onGlobalFilterChange: setFiltering,
  });

  return (
    <>
      <SearchInput value={filtering} onChange={setFiltering} />
      <Table striped bordered hover>
        <thead>
          {table.getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <th key={header.id} onClick={header.column.getToggleSortingHandler()}>
                  {flexRender(header.column.columnDef.header, header.getContext())}
                  {{
                    asc: <span className="pl-2 text-primary">↑</span>,
                    desc: <span className="pl-2 text-danger">↓</span>,
                  }[header.column.getIsSorted() as string] ?? null}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody>
          {table.getRowModel().rows.map((row) => (
            <tr key={row.id} onClick={() => router("/campaignsTable")}>
              {row.getVisibleCells().map((cell) => (
                <td key={cell.id}>{flexRender(cell.column.columnDef.cell, cell.getContext())}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </Table>
      <ButtonGroup aria-label="Basic example">
        <Button variant="secondary" onClick={() => table.setPageIndex(0)}>
          First page
        </Button>
        <Button variant="secondary" disabled={!table.getCanNextPage()} onClick={() => table.nextPage()}>
          Next page
        </Button>
        <Button variant="secondary" disabled={!table.getCanPreviousPage()} onClick={() => table.previousPage()}>
          Previous page
        </Button>
        <Button variant="secondary" onClick={() => table.setPageIndex(table.getPageCount() - 1)}>
          Last page
        </Button>
      </ButtonGroup>
      <p>You are on page number: {table.getState().pagination.pageIndex + 1}</p>
      <p>Total pages: {table.getPageCount()}</p>
    </>
  );
};
