'use client';
import { TypographyH3 } from '@/components/ui/typography';
import React, { useEffect, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import {
  ColumnDef,
  ColumnFiltersState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  SortingState,
  useReactTable,
  VisibilityState,
} from '@tanstack/react-table';
import { ArrowUpDown } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { FiEdit } from 'react-icons/fi';
import { MdDeleteOutline } from 'react-icons/md';
import { IoMdAdd } from 'react-icons/io';
import AddSuppliers from './AddSupliers';
import { API_ENDPOINT } from '@/lib/api';
import { Suppliers } from '@/app/types/Suppliers.typs';
import { useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';
import { ApiResponse } from '@/lib/apiTypes';

const SUPPLIER_API_ENDPOINT = 'suppliers';

export type SuppliersData = {
  data: Suppliers[];
};

export const getSupplierColumns = (
  onEdit: (supplier: Suppliers) => void,
  onDelete: (supplier: Suppliers) => void,
): ColumnDef<Suppliers>[] => [
  {
    id: 'select',
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && 'indeterminate')
        }
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: 'name',
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          className="text-left"
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
        >
          Name
          <ArrowUpDown />
        </Button>
      );
    },
    cell: ({ row }) => <div className="capitalize">{row.getValue('name')}</div>,
  },
  {
    accessorKey: 'phone',
    header: 'Phone Number',
    cell: ({ row }) => (
      <div className="capitalize">{row.getValue('phone')}</div>
    ),
  },
  {
    accessorKey: 'email',
    header: 'Email',
    cell: ({ row }) => <div>{row.getValue('email')}</div>,
  },

  {
    accessorKey: 'address',
    header: 'Address',
    cell: ({ row }) => (
      <div className="capitalize">{row.getValue('address')}</div>
    ),
  },
  {
    id: 'actions',
    header: 'Actions',
    cell: ({ row }) => {
      const rowData = row.original;

      return (
        <div className="flex gap-2">
          <Button variant="outline" size="sm" onClick={() => onEdit(rowData)}>
            <FiEdit />
          </Button>
          <Button
            variant="destructive"
            size="sm"
            onClick={() => onDelete(rowData)}
          >
            <MdDeleteOutline />
          </Button>
        </div>
      );
    },
  },
];

const SuplierTable = () => {
  /** Required states */
  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = useState({});
  const [showAddSupplierModal, setShowAddSupplierModal] =
    useState<boolean>(false);
  const [selectedSupplier, setSelectedSupplier] = useState<Suppliers | null>(
    null,
  );
  const queryClient = useQueryClient();

  /** Function to fetch medicine stocks */
  const fetchData = async (): Promise<Suppliers[]> => {
    const { data } = await axios.get<SuppliersData>(
      `${API_ENDPOINT}/${SUPPLIER_API_ENDPOINT}`,
    );
    return data.data;
  };

  const { data } = useQuery<Suppliers[]>({
    queryKey: ['suppliersData'],
    queryFn: fetchData,
    staleTime: 1000 * 60 * 5, // 5 minutes
  });

  /** Function to edit suppliers */
  const handleEditSuppliers = (supplier: Suppliers) => {
    setSelectedSupplier(supplier);
  };

  /** Function to delete suppliers */
  const handleDeleteSuppliers = async (supplier: Suppliers) => {
    try {
      const response = await axios.delete<ApiResponse<null>>(
        `${API_ENDPOINT}/${SUPPLIER_API_ENDPOINT}/${supplier.id}`,
      );
      if (response && response.data && response.data.success) {
        queryClient.invalidateQueries({ queryKey: ['suppliersData'] });
        toast.success(response.data.message, {
          position: 'top-right',
        });
      }
    } catch (error) {
      toast.error('Failed to delete supplier');
      console.error('Failed to add supplier:', error);
    }
  };

  const columns = getSupplierColumns(
    handleEditSuppliers,
    handleDeleteSuppliers,
  );
  const table = useReactTable({
    data: data ?? [],
    columns,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
    },
    initialState: {
      pagination: {
        pageSize: 15,
      },
    },
  });

  /** Effect to show edit suplier modal once user clicks on edit button */
  useEffect(() => {
    if (selectedSupplier && Object.keys(selectedSupplier).length > 0) {
      setShowAddSupplierModal(true);
    }
  }, [selectedSupplier]);

  return (
    <section className="w-full mt-4">
      <TypographyH3 text="Supplier's list" className="mb-4" />
      <div className="flex justify-between items-center py-4">
        <Input
          placeholder="Search Suppliers..."
          value={(table.getColumn('name')?.getFilterValue() as string) ?? ''}
          onChange={(event) =>
            table.getColumn('name')?.setFilterValue(event.target.value)
          }
          className="max-w-sm"
        />
        <Button
          variant="default"
          size="sm"
          onClick={() => setShowAddSupplierModal(true)}
        >
          <IoMdAdd /> Add Supplier
        </Button>
      </div>
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext(),
                          )}
                    </TableHead>
                  );
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && 'selected'}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext(),
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <div className="flex items-center justify-end space-x-2 py-4">
        <div className="text-muted-foreground flex-1 text-sm">
          {table.getFilteredSelectedRowModel().rows.length} of{' '}
          {table.getFilteredRowModel().rows.length} row(s) selected.
        </div>
        <div className="space-x-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
          >
            Previous
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
          >
            Next
          </Button>
        </div>
      </div>

      {/* Add Suplier modal */}
      <AddSuppliers
        open={showAddSupplierModal}
        selectedSupplier={selectedSupplier}
        onClose={() => {
          setShowAddSupplierModal(false);
          setSelectedSupplier(null);
        }}
      />
    </section>
  );
};

export default SuplierTable;
