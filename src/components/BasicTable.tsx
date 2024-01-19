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
        <p>You are on page number: {' '} {table.getState().pagination.pageIndex + 1}</p>
        <p>Total pages: {table.getPageCount()}</p>
        <input 
          type="number"
          defaultValue={table.getState().pagination.pageIndex + 1}
          onChange={(e) => table.setPageIndex(Number(e.target.value) - 1)}
         />
      <div className="">
        <div className="">
          <span className="">Current page size:</span>
          <select
            className=""
            value={table.getState().pagination.pageSize}
            onChange={(e) => {
              table.setPageSize(Number(e.target.value));
            }}
            disabled={!table.getCanNextPage()}
          >
            {[4, 6, 8, 10].map((pageSize) => (
              <option key={pageSize} value={pageSize}>
                {pageSize}
              </option>
            ))}
          </select>
        </div>
        <div className="">
          <button
            className={`${
              !table.getCanPreviousPage() ? "bg-gray-100" : "hover:bg-gray-200 hover:curstor-pointer bg-gray-100"
            } rounded p-1`}
            onClick={() => table.setPageIndex(0)}
          >
            <span className="w-5 h-5">{"<<"}</span>
          </button>
          <button
            className={`${
              !table.getCanPreviousPage() ? "bg-gray-100" : "hover:bg-gray-200 hover:curstor-pointer bg-gray-100"
            } rounded p-1`}
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
          >
            <span className="w-5 h-5">{"<"}</span>
          </button>
          <span className="">
            <input
              min={1}
              max={table.getPageCount()}
              type="number"
              value={table.getState().pagination.pageIndex + 1}
              onChange={(e) => {
                const page = e.target.value ? Number(e.target.value) - 1 : 0;
                table.setPageIndex(page);
              }}
              className=""
            />
            of {table.getPageCount()}
          </span>
          <button
            className={`${
              !table.getCanNextPage() ? "bg-gray-100" : "hover:bg-gray-200 hover:curstor-pointer bg-gray-100"
            } rounded p-1`}
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
          >
            <span className="w-5 h-5">{">"}</span>
          </button>
          <button
            className={`${
              !table.getCanNextPage() ? "bg-gray-100" : "hover:bg-gray-200 hover:curstor-pointer bg-gray-100"
            } rounded p-1`}
            onClick={() => table.setPageIndex(table.getPageCount() - 1)}
            disabled={!table.getCanNextPage()}
          >
            <span className="w-5 h-5">{">>"}</span>
          </button>
        </div>
      </div>
    </>
  );
};
