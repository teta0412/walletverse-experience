// src/components/report/TransactionSummary.jsx
import { Card } from "@/components/ui/card";
import { ArrowDownLeft, Send } from "lucide-react";
import { formatValue } from "@/utils/formatters";

export const TransactionSummary = ({ data }) => (
  <Card className="col-span-4 lg:col-span-2 p-6">
    <h3 className="text-lg font-semibold mb-4">Transaction Summary</h3>
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
      <div className="flex items-center space-x-4">
        <div className="p-3 bg-green-100 rounded-lg">
          <ArrowDownLeft className="h-6 w-6 text-green-600" />
        </div>
        <div>
          <p className="text-sm text-muted-foreground">Total Received</p>
          <p className="text-2xl font-bold">${formatValue(data?.totalReceived)}</p>
          <p className="text-sm text-muted-foreground">{data?.totalReceivedTransaction} transactions</p>
        </div>
      </div>
      <div className="flex items-center space-x-4">
        <div className="p-3 bg-red-100 rounded-lg">
          <Send className="h-6 w-6 text-red-600" />
        </div>
        <div>
          <p className="text-sm text-muted-foreground">Total Sent</p>
          <p className="text-2xl font-bold">${formatValue(data?.totalSend)}</p>
          <p className="text-sm text-muted-foreground">{data?.totalSendTransaction} transactions</p>
        </div>
      </div>
    </div>
  </Card>
);