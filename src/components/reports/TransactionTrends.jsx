// src/components/report/TransactionTrends.jsx
import { Card } from "@/components/ui/card";
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import { formatValue } from "@/utils/formatters";

export const TransactionTrends = ({ data, timeFilter }) => {
  const chartData = data?.listTotalReceived.map((received, index) => ({
    period: timeFilter === 'month' 
      ? `Day ${index + 1}` 
      : ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'][index],
    received: formatValue(received || 0),
    sent: formatValue(data.listTotalSend[index] || 0),
  }));

  return (
    <Card className="col-span-4 p-6">
      <h3 className="text-lg font-semibold mb-4">Transaction Trends</h3>
      <div className="h-[300px]">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={chartData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
            <XAxis 
              dataKey="period"
              tick={{ fill: '#888', fontSize: 12 }}
            />
            <YAxis
              tick={{ fill: '#888', fontSize: 12 }}
              tickFormatter={(value) => `$${formatValue(value)}`}
            />
            <Tooltip 
              contentStyle={{ 
                backgroundColor: '#fff',
                border: '1px solid #ccc',
                borderRadius: '6px'
              }}
              formatter={(value) => [`$${formatValue(value)}`, '']}
            />
            <Legend />
            <Line 
              type="monotone" 
              dataKey="received" 
              stroke="#10B981" 
              name="Received"
              strokeWidth={2}
              dot={false}
            />
            <Line 
              type="monotone" 
              dataKey="sent" 
              stroke="#EF4444" 
              name="Sent"
              strokeWidth={2}
              dot={false}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </Card>
  );
};