import { Employee } from "@/hook/useEmployees";

export const columns = [
  {
    id: "name",
    header: "Name",
    accessorKey: "name",
    cell: ({ row }: { row: { original: Employee } }) => row.original.name,
  },
  {
    id: "department",
    header: "Department",
    accessorKey: "department",
    cell: ({ row }: { row: { original: Employee } }) => row.original.department,
  },
];
