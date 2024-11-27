import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { Card } from "@/components/ui/card";

const UserActivityChart = ({ data, timeFilter }) => {
  return (
    <Card className="p-4 w-full">
      <h2 className="text-lg font-semibold mb-4">User Activity</h2>
      <div className="h-[300px] w-full">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey={timeFilter === "month" ? "day" : "month"} />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="users" fill="#34D399" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </Card>
  );
};

export default UserActivityChart;