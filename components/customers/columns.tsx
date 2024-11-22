"use client";

import { ColumnDef } from "@tanstack/react-table";

export type Customer = {
  customerName: string;
  phoneNumber: string;
  totalPurchaseAmount: number;
};

export const columns: ColumnDef<Customer>[] = [
  {
    accessorKey: "customerName",
    header: "Customer Name",
  },
  {
    accessorKey: "phoneNumber",
    header: "Phone Number",
  },
  {
    accessorKey: "totalPurchaseAmount",
    header: "Total Purchase Amount",
  },
];
