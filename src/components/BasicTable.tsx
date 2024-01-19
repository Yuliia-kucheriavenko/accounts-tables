import {
  flexRender,
  useReactTable,
  getCoreRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  SortingState,
  getFilteredRowModel,
} from "@tanstack/react-table";
import { columnDef } from "./columns";
import { Table, Button, ButtonGroup } from "react-bootstrap";
import dataJSON from "./data.json";
import { useMemo, useState } from "react";

export const BasicTable = () => {
  const data = useMemo(() => dataJSON, []);
  const columns = useMemo(() => columnDef, []);
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
    onSortingChange: setSorting,
    onGlobalFilterChange: setFiltering,
  });

  return (
    <>
      <input
        type="text"
        className="form-control"
        placeholder="Search"
        aria-label="Search"
        aria-describedby="addon-wrapping"
        value={filtering}
        onChange={(e) => setFiltering(e.target.value)}
      />
      <Table striped bordered hover>
        <thead>
          {table.getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <th key={header.id} onClick={header.column.getToggleSortingHandler()}>
                  {flexRender(header.column.columnDef.header, header.getContext())}
                  {{
                    asc: <span className="pl-2">↑</span>,
                    desc: <span className="pl-2">↓</span>,
                  }[header.column.getIsSorted() as string] ?? null}
                </th>
              ))}
            </tr>
          ))}
        </thead>

        <tbody>
          {table.getRowModel().rows.map((row) => (
            <tr key={row.id}>
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
    </>
  );
};
