import { UploadSection } from "@/components/upload-section";
import { DataTable } from "@/components/ui/data-table";
import { columns as invoiceColumns } from "@/components/invoices/columns";
import { columns as customerColumns } from "@/components/customers/columns";
import { columns as productColumns } from "@/components/products/columns";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function Home() {
  return (
    <div className="container mx-auto p-4">
      <h2 className="text-3xl tracking-tight font-extrabold">
        Automated Data Extraction and Invoice Management
      </h2>

      <div className="mt-6">
        <UploadSection />
      </div>

      <div className="mt-6">
        <Tabs defaultValue="invoices" className="container py-4">
          <TabsList>
            <TabsTrigger value="invoices">Invoices</TabsTrigger>
            <TabsTrigger value="customers">Customers</TabsTrigger>
            <TabsTrigger value="products">Products</TabsTrigger>
          </TabsList>
          <TabsContent value="invoices">
            <DataTable
              columns={invoiceColumns}
              data={[
                {
                  serialNumber: 1,
                  customerName: "Pradeep Kaswan",
                  productName: "Swipe Assignment",
                  quantity: 1,
                  tax: 10,
                  totalAmount: 100,
                  date: "2023-01-01",
                },
              ]}
            />
          </TabsContent>
          <TabsContent value="customers">
            <DataTable columns={customerColumns} data={[]} />
          </TabsContent>
          <TabsContent value="products">
            <DataTable columns={productColumns} data={[]} />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
