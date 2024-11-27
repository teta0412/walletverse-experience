import { ArrowUpRight } from "lucide-react";
import { Card } from "@/components/ui/card";

const StatsCards = ({ stats }) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      {stats.map((stat, index) => (
        <Card key={index} className="p-4">
          <div className="flex justify-between items-start">
            <h3 className="text-sm font-medium text-muted-foreground">{stat.title}</h3>
            <ArrowUpRight className="h-4 w-4 text-success" />
          </div>
          <div className="mt-2">
            <span className="text-2xl font-bold">{stat.value}</span>
            <span className="ml-2 text-sm text-success">
              {stat.change}
            </span>
          </div>
        </Card>
      ))}
    </div>
  );
};

export default StatsCards;