import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface Invoice {
  serialNumber: string;
  customerName: string;
  productName: string;
  quantity: number;
  tax: number;
  totalAmount: number;
  date: string;
}

const invoicesSlice = createSlice({
  name: "invoices",
  initialState: [] as Invoice[],
  reducers: {
    addInvoice(state, action: PayloadAction<Invoice>) {
      state.push(action.payload);
    },
    setInvoice: (state, action: PayloadAction<Invoice[]>) => {
      return action.payload;
    },
  },
});

export const { addInvoice, setInvoice } = invoicesSlice.actions;

export default invoicesSlice.reducer;
