import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useState } from "react";
import { useTransaction } from "@/hooks/useTransaction";
import { toast } from "sonner";

const CreateTransactionDialog = ({ open, onOpenChange }) => {
  const { createTransaction, loading } = useTransaction();
  const [formData, setFormData] = useState({
    fromWalletId:localStorage.getItem("walletId"),
    toWalletId: "",
    amount: "",
    description: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (formData.toWalletId === localStorage.getItem("walletId")) {
        toast.error("Can't transfer to your own wallet");
        throw error;
      } else {
        await createTransaction(formData);
        onOpenChange(false);
      }
    } catch (error) {
      // Error handling is now managed by the hook
      console.error("Error in form submission:", error);
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
            <label className="text-sm mb-2 block">To Wallet</label>
            <Input
              name="toWalletId"
              value={formData.toWalletId}
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
