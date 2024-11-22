"use client";

import { useSelector } from "react-redux";
import { RootState } from "@/lib/store";

const InvoicesTable: React.FC = () => {
  const invoices = useSelector((state: RootState) => state.invoices);

  return (
    <table className="min-w-full bg-white">
      <thead>
        <tr className="bg-gray-200 text-gray-600 uppercase text-sm leading-normal">
          <th className="py-3 px-6 text-left">S.No.</th>
          <th className="py-3 px-6 text-left">Customer Name</th>
          <th className="py-3 px-6 text-left">Product Name</th>
          <th className="py-3 px-6 text-center">Qty</th>
          <th className="py-3 px-6 text-center">Tax</th>
          <th className="py-3 px-6 text-center">Total Amount</th>
          <th className="py-3 px-6 text-center">Date</th>
        </tr>
      </thead>
      <tbody className="text-gray-600 text-sm font-light">
        {invoices.map((invoice) => (
          <tr
            key={invoice.serialNumber}
            className="border-b border-gray-200 hover:bg-gray-100"
          >
            <td className="py-3 px-6 text-left whitespace-nowrap">
              {invoice.serialNumber}
            </td>
            <td className="py-3 px-6 text-left">{invoice.customerName}</td>
            <td className="py-3 px-6 text-left">{invoice.productName}</td>
            <td className="py-3 px-6 text-center">{invoice.quantity}</td>
            <td className="py-3 px-6 text-center">{invoice.tax}</td>
            <td className="py-3 px-6 text-center">{invoice.totalAmount}</td>
            <td className="py-3 px-6 text-center">{invoice.date}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default InvoicesTable;
