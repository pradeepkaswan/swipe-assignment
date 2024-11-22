# Swipe Assignment

## Automated Data Extraction and Invoice Management

This React application automates the extraction, processing, and management of invoice data from various file formats (Excel, PDF, and Images). It leverages AI-powered data extraction using OpenAI's API and organizes data into three main tabs: Invoices, Products, and Customers. The app ensures real-time updates across tabs using Redux for state management.

### Features

- File Uploads: Accepts file uploads of multiple types: .xlsx, .pdf, .png, and .jpg.
- AI-Powered Data Extraction: Uses OpenAI's API for structured data extraction from invoices.
- Dynamic Tabs: Data is displayed in organized tabs:
  - Invoices Tab: Displays extracted invoice details (e.g., serial number, customer name, total amount, etc.).
  - Products Tab: Displays product details (e.g., product name, quantity, unit price, etc.).
  - Customers Tab: Displays customer details (e.g., customer name, phone number, total purchase amount, etc.).
- Real-Time Updates: Changes in one tab dynamically reflect in other tabs using Redux for centralized state management.
- Error Handling: Provides user-friendly error messages for unsupported formats and highlights missing fields.

### Technologies Used

- Frontend: React, Redux Toolkit
- AI Integration: Google Gemini's API
- Styling: TailwindCSS

### Usage

1. Upload Files:
   - Drag and drop or select a file using the File Upload component.
   - Supported file types: .xlsx, .pdf, .png, .jpg.
2. View Extracted Data:
   - After processing, extracted data will populate the Invoices, Products, and Customers tabs.
3. Edit Data:
   - Click on any row to update the details. Changes will automatically reflect across all tabs.
4. Handle Missing Data:
   - Missing fields are highlighted, allowing users to manually fill in the information.
