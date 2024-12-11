// src/components/report/AccountOverview.jsx
import { Card } from "@/components/ui/card";
import { formatValue } from "@/utils/formatters";

export const AccountOverview = ({ data }) => (
  <Card className="col-span-4 lg:col-span-2 p-6">
    <h3 className="text-lg font-semibold mb-4">Account Overview</h3>
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
      <div>
        <p className="text-sm text-muted-foreground">Wallet Balance</p>
        <p className="text-2xl font-bold">${formatValue(data?.balance)}</p>
      </div>
      <div>
        <p className="text-sm text-muted-foreground">Total Transactions</p>
        <p className="text-2xl font-bold">{data?.totalTransaction}</p>
      </div>
      <div>
        <p className="text-sm text-muted-foreground">Wallet Status</p>
        <p className="text-2xl font-bold">{data?.status}</p>
      </div>
    </div>
  </Card>
);