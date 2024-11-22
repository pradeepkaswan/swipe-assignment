"use client";

import { ColumnDef } from "@tanstack/react-table";

export type Product = {
  productName: string;
  quantity: number;
  unitPrice: number;
  tax: number;
  priceWithTax: number;
};

export const columns: ColumnDef<Product>[] = [
  {
    accessorKey: "productName",
    header: "Product Name",
  },
  {
    accessorKey: "quantity",
    header: "Quantity",
  },
  {
    accessorKey: "unitPrice",
    header: "Unit Price",
  },
  {
    accessorKey: "tax",
    header: "Tax",
  },
  {
    accessorKey: "priceWithTax",
    header: "Price with Tax",
  },
];
