// src/components/report/ComparisonChart.jsx
import { Card } from "@/components/ui/card";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import { formatValue } from "@/utils/formatters";

export const ComparisonChart = ({ data }) => {
  const chartData = [
    {
      name: 'Transactions',
      Received: formatValue(data?.totalReceived || 0),
      Sent: formatValue(data?.totalSend || 0),
    }
  ];

  return (
    <Card className="col-span-4 lg:col-span-2 p-6">
      <h3 className="text-lg font-semibold mb-4">Transaction Comparison</h3>
      <div className="h-[300px]">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={chartData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
            <XAxis dataKey="name" />
            <YAxis tickFormatter={(value) => `$${formatValue(value)}`} />
            <Tooltip formatter={(value) => [`$${formatValue(value)}`, '']} />
            <Legend />
            <Bar dataKey="Received" fill="#10B981" radius={[4, 4, 0, 0]} />
            <Bar dataKey="Sent" fill="#EF4444" radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </Card>
  );
};
