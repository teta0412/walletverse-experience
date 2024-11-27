import { FileText, Download } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

const Report = () => {
  console.log("Rendering Report page");

  const handleExport = () => {
    console.log("Exporting report");
    // Simulating export process
    toast.success("Report exported successfully!");
  };

  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-2">
          <FileText className="h-6 w-6" />
          <h1 className="text-2xl font-semibold">Reports</h1>
        </div>
        <Button onClick={handleExport} className="flex items-center gap-2">
          <Download className="h-4 w-4" />
          Export
        </Button>
      </div>
      
      <div className="glass-card p-4 rounded-lg">
        <p className="text-muted-foreground">Your reports will appear here</p>
      </div>
    </div>
  );
};

export default Report;