import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useState } from "react";
import { createTransaction } from "@/services/transactionService";
import { toast } from "sonner";

const CreateTransactionDialog = ({ open, onOpenChange }) => {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    toUser: "",
    toWallet: "",
    amount: "",
    description: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      console.log("Submitting transaction:", formData);
      const response = await createTransaction(formData);
      console.log("Transaction created:", response);
      toast.success("Transaction created successfully");
      onOpenChange(false);
    } catch (error) {
      console.error("Error creating transaction:", error);
      toast.error("Failed to create transaction");
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Create New Transaction</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="text-sm mb-2 block">To User</label>
            <Input
              name="toUser"
              value={formData.toUser}
              onChange={handleChange}
              placeholder="Enter recipient name"
            />
          </div>
          <div>
            <label className="text-sm mb-2 block">To Wallet</label>
            <Input
              name="toWallet"
              value={formData.toWallet}
              onChange={handleChange}
              placeholder="Enter recipient wallet"
            />
          </div>
          <div>
            <label className="text-sm mb-2 block">Amount</label>
            <Input
              name="amount"
              type="number"
              value={formData.amount}
              onChange={handleChange}
              placeholder="Enter amount"
            />
          </div>
          <div>
            <label className="text-sm mb-2 block">Description</label>
            <Textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              placeholder="Enter transaction description"
            />
          </div>
          <DialogFooter>
            <Button type="submit" disabled={loading}>
              {loading ? "Creating..." : "Create Transaction"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default CreateTransactionDialog;