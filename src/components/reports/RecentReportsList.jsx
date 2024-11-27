import { Card } from "@/components/ui/card";

const RecentReportsList = ({ reports }) => {
  return (
    <Card className="p-4">
      <h2 className="text-lg font-semibold mb-4">Recent Reports</h2>
      <div className="space-y-4">
        {reports.map((report) => (
          <div key={report.id} className="flex flex-col sm:flex-row sm:items-center justify-between p-2 hover:bg-muted/50 rounded-md transition-colors">
            <div>
              <h3 className="font-medium">{report.name}</h3>
              <p className="text-sm text-muted-foreground">{report.date}</p>
            </div>
            <span className={`mt-2 sm:mt-0 px-2 py-1 rounded-full text-xs ${
              report.status === "Completed" ? "bg-success/20 text-success" : "bg-primary/20 text-primary"
            }`}>
              {report.status}
            </span>
          </div>
        ))}
      </div>
    </Card>
  );
};

export default RecentReportsList;