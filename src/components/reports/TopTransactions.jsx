// src/components/report/TopTransactions.jsx
import { Card } from "@/components/ui/card";
import { ArrowUpRight } from "lucide-react";

export const TopTransactions = ({ data }) => (
  <Card className="col-span-4 lg:col-span-2 p-6">
    <h3 className="text-lg font-semibold mb-4">Top Transactions</h3>
    <div className="space-y-6">
      <div>
        <h4 className="text-sm font-medium text-muted-foreground mb-3">Top Receivers</h4>
        <div className="space-y-2">
          {data?.topReceivedUser.map((userId) => (
            <div key={userId} className="flex items-center justify-between p-2 bg-muted rounded-lg">
              <span className="text-sm font-medium">{userId}</span>
              <ArrowUpRight className="h-4 w-4 text-green-500" />
            </div>
          ))}
        </div>
      </div>
      <div>
        <h4 className="text-sm font-medium text-muted-foreground mb-3">Top Senders</h4>
        <div className="space-y-2">
          {data?.topSendUser.map((userId) => (
            <div key={userId} className="flex items-center justify-between p-2 bg-muted rounded-lg">
              <span className="text-sm font-medium">{userId}</span>
              <ArrowUpRight className="h-4 w-4 text-red-500" />
            </div>
          ))}
        </div>
      </div>
    </div>
  </Card>
);