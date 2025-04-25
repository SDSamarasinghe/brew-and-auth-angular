
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { useState } from "react";

interface Customer {
  id: number;
  name: string;
  email: string;
  orders: number;
  totalSpent: number;
  joinDate: string;
}

// Mock data for development
const mockCustomers: Customer[] = [
  {
    id: 1,
    name: "Alice Johnson",
    email: "alice@example.com",
    orders: 8,
    totalSpent: 124.50,
    joinDate: "2023-01-15"
  },
  {
    id: 2,
    name: "Bob Smith",
    email: "bob@example.com",
    orders: 3,
    totalSpent: 45.75,
    joinDate: "2023-02-22"
  },
  {
    id: 3,
    name: "Charlie Brown",
    email: "charlie@example.com",
    orders: 12,
    totalSpent: 210.25,
    joinDate: "2022-11-05"
  },
  {
    id: 4,
    name: "Diana Prince",
    email: "diana@example.com",
    orders: 5,
    totalSpent: 87.40,
    joinDate: "2023-03-10"
  },
  {
    id: 5,
    name: "Ethan Hunt",
    email: "ethan@example.com",
    orders: 2,
    totalSpent: 32.20,
    joinDate: "2023-04-18"
  }
];

const AdminCustomers = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [customers] = useState<Customer[]>(mockCustomers);
  
  const filteredCustomers = customers.filter(customer => 
    customer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    customer.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-serif">Customer Management</h2>
        <div className="w-64">
          <Input
            placeholder="Search customers..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>
      
      <Card>
        <div className="rounded-md border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Email</TableHead>
                <TableHead className="text-center">Orders</TableHead>
                <TableHead className="text-right">Total Spent</TableHead>
                <TableHead className="text-right">Join Date</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredCustomers.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={5} className="text-center py-8">
                    No customers found
                  </TableCell>
                </TableRow>
              ) : (
                filteredCustomers.map((customer) => (
                  <TableRow key={customer.id}>
                    <TableCell className="font-medium">
                      {customer.name}
                    </TableCell>
                    <TableCell>{customer.email}</TableCell>
                    <TableCell className="text-center">{customer.orders}</TableCell>
                    <TableCell className="text-right">${customer.totalSpent.toFixed(2)}</TableCell>
                    <TableCell className="text-right">
                      {new Date(customer.joinDate).toLocaleDateString()}
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </div>
      </Card>
    </div>
  );
};

export default AdminCustomers;
