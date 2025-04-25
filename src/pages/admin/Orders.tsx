
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
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { useState } from "react";

interface OrderItem {
  name: string;
  quantity: number;
  price: number;
}

interface Order {
  id: number;
  customerName: string;
  customerEmail: string;
  date: string;
  status: "pending" | "processing" | "completed" | "cancelled";
  total: number;
  items: OrderItem[];
}

// Mock data for development
const mockOrders: Order[] = [
  {
    id: 1001,
    customerName: "Alice Johnson",
    customerEmail: "alice@example.com",
    date: "2023-04-15T10:30:00",
    status: "completed",
    total: 23.50,
    items: [
      { name: "Cappuccino", quantity: 2, price: 4.50 },
      { name: "Croissant", quantity: 3, price: 4.50 }
    ]
  },
  {
    id: 1002,
    customerName: "Bob Smith",
    customerEmail: "bob@example.com",
    date: "2023-04-15T14:45:00",
    status: "processing",
    total: 18.25,
    items: [
      { name: "Latte", quantity: 1, price: 4.75 },
      { name: "Blueberry Muffin", quantity: 2, price: 3.50 },
      { name: "Chai Tea", quantity: 1, price: 3.50 }
    ]
  },
  {
    id: 1003,
    customerName: "Charlie Brown",
    customerEmail: "charlie@example.com",
    date: "2023-04-15T09:15:00",
    status: "pending",
    total: 32.75,
    items: [
      { name: "Espresso", quantity: 2, price: 2.99 },
      { name: "Breakfast Sandwich", quantity: 3, price: 8.99 }
    ]
  },
  {
    id: 1004,
    customerName: "Diana Prince",
    customerEmail: "diana@example.com",
    date: "2023-04-14T16:20:00",
    status: "cancelled",
    total: 12.50,
    items: [
      { name: "Green Tea", quantity: 2, price: 3.25 },
      { name: "Cookie", quantity: 2, price: 3.00 }
    ]
  },
  {
    id: 1005,
    customerName: "Ethan Hunt",
    customerEmail: "ethan@example.com",
    date: "2023-04-14T11:05:00",
    status: "completed",
    total: 27.80,
    items: [
      { name: "Cold Brew", quantity: 2, price: 5.50 },
      { name: "Avocado Toast", quantity: 1, price: 7.95 },
      { name: "Fruit Cup", quantity: 1, price: 4.25 }
    ]
  }
];

const AdminOrders = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [orders] = useState<Order[]>(mockOrders);
  
  const filteredOrders = orders.filter(order => {
    // Apply status filter
    if (statusFilter !== "all" && order.status !== statusFilter) {
      return false;
    }
    
    // Apply search term
    const searchLower = searchTerm.toLowerCase();
    return (
      order.id.toString().includes(searchLower) ||
      order.customerName.toLowerCase().includes(searchLower) ||
      order.customerEmail.toLowerCase().includes(searchLower)
    );
  });

  const getStatusBadge = (status: Order["status"]) => {
    switch (status) {
      case "pending":
        return <Badge variant="outline" className="bg-yellow-50 text-yellow-700 border-yellow-300">Pending</Badge>;
      case "processing":
        return <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-300">Processing</Badge>;
      case "completed":
        return <Badge variant="outline" className="bg-green-50 text-green-700 border-green-300">Completed</Badge>;
      case "cancelled":
        return <Badge variant="outline" className="bg-red-50 text-red-700 border-red-300">Cancelled</Badge>;
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-serif">Order Management</h2>
        <div className="flex gap-4">
          <div className="w-48">
            <Select
              value={statusFilter}
              onValueChange={setStatusFilter}
            >
              <SelectTrigger>
                <SelectValue placeholder="Filter by status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Statuses</SelectItem>
                <SelectItem value="pending">Pending</SelectItem>
                <SelectItem value="processing">Processing</SelectItem>
                <SelectItem value="completed">Completed</SelectItem>
                <SelectItem value="cancelled">Cancelled</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="w-64">
            <Input
              placeholder="Search orders..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>
      </div>
      
      <Card>
        <div className="rounded-md border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Order ID</TableHead>
                <TableHead>Customer</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Amount</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredOrders.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={5} className="text-center py-8">
                    No orders found
                  </TableCell>
                </TableRow>
              ) : (
                filteredOrders.map((order) => (
                  <TableRow key={order.id}>
                    <TableCell className="font-medium">#{order.id}</TableCell>
                    <TableCell>
                      <div>
                        {order.customerName}
                        <div className="text-xs text-muted-foreground">
                          {order.customerEmail}
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      {new Date(order.date).toLocaleDateString()} at {new Date(order.date).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}
                    </TableCell>
                    <TableCell>
                      {getStatusBadge(order.status)}
                    </TableCell>
                    <TableCell className="text-right font-medium">
                      ${order.total.toFixed(2)}
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

export default AdminOrders;
