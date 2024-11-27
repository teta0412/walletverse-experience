import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Search, Plus } from "lucide-react";
import SideNav from "@/components/SideNav";
import CreateTransactionDialog from "@/components/CreateTransactionDialog";
import { searchTransactions } from "@/services/transactionService";
import { toast } from "sonner";

const Transaction = () => {
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");
  const [transactionId, setTransactionId] = useState("");
  const [wallet, setWallet] = useState("");
  const [createDialogOpen, setCreateDialogOpen] = useState(false);

  const mockTransactions = [
    {
      id: 1,
      uuid: "0x0xxx0xxx0xxxx0xx",
      fromWallet: "1111111111",
      toUser: "Tran Van B",
      toWallet: "2222222222",
      amount: "10,000,000",
      description: "Chuyen tien nha",
      status: "Complete",
    },
  ];

  const handleSearch = async () => {
    try {
      console.log("Searching with filters:", { fromDate, toDate, transactionId, wallet });
      const response = await searchTransactions({ fromDate, toDate, transactionId, wallet });
      console.log("Search results:", response);
      // TODO: Update transactions list when API is implemented
    } catch (error) {
      console.error("Search error:", error);
      toast.error("Failed to search transactions");
    }
  };

  const handleReset = () => {
    setFromDate("");
    setToDate("");
    setTransactionId("");
    setWallet("");
  };

  return (
    <div className="flex min-h-screen">
      <SideNav />
      <div className="flex-1 ml-64 p-4 lg:p-8 bg-muted animate-fadeIn overflow-y-auto">
        <div className="max-w-7xl mx-auto space-y-8">
          <Card className="glass-card">
            <CardHeader>
              <CardTitle>Transaction Management</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
                <div>
                  <label className="text-sm mb-2 block">Transaction UUID</label>
                  <Input
                    value={transactionId}
                    onChange={(e) => setTransactionId(e.target.value)}
                    placeholder="Enter transaction ID"
                  />
                </div>
                <div>
                  <label className="text-sm mb-2 block">Wallet</label>
                  <Input
                    value={wallet}
                    onChange={(e) => setWallet(e.target.value)}
                    placeholder="Enter wallet"
                  />
                </div>
                <div>
                  <label className="text-sm mb-2 block">From Date</label>
                  <Input
                    type="date"
                    value={fromDate}
                    onChange={(e) => setFromDate(e.target.value)}
                  />
                </div>
                <div>
                  <label className="text-sm mb-2 block">To Date</label>
                  <Input
                    type="date"
                    value={toDate}
                    onChange={(e) => setToDate(e.target.value)}
                  />
                </div>
              </div>
              <div className="flex justify-between items-center mb-6">
                <div className="space-x-2">
                  <Button variant="secondary" onClick={handleSearch}>
                    <Search className="h-4 w-4 mr-2" />
                    Search
                  </Button>
                  <Button variant="outline" onClick={handleReset}>Reset</Button>
                </div>
                <Button onClick={() => setCreateDialogOpen(true)}>
                  <Plus className="h-4 w-4 mr-2" />
                  Create
                </Button>
              </div>
              <div className="rounded-md border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>STT</TableHead>
                      <TableHead>Transaction UUID</TableHead>
                      <TableHead>From Wallet</TableHead>
                      <TableHead>To User</TableHead>
                      <TableHead>To Wallet</TableHead>
                      <TableHead>Amount</TableHead>
                      <TableHead>Description</TableHead>
                      <TableHead>Status</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {mockTransactions.map((transaction) => (
                      <TableRow key={transaction.id}>
                        <TableCell>{transaction.id}</TableCell>
                        <TableCell className="font-mono">{transaction.uuid}</TableCell>
                        <TableCell>{transaction.fromWallet}</TableCell>
                        <TableCell>{transaction.toUser}</TableCell>
                        <TableCell>{transaction.toWallet}</TableCell>
                        <TableCell>{transaction.amount}</TableCell>
                        <TableCell>{transaction.description}</TableCell>
                        <TableCell>{transaction.status}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
      <CreateTransactionDialog 
        open={createDialogOpen} 
        onOpenChange={setCreateDialogOpen}
      />
    </div>
  );
};

export default Transaction;
