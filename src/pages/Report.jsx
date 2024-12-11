import { useState, useRef } from "react";
import { useReport } from "@/hooks/useReport";
import { toast } from "sonner";
import SideNav from "@/components/SideNav";
import { exportToPdf } from "@/utils/exportPdf";
import { ReportHeader } from "@/components/reports/ReportHeader";
import { AccountOverview } from "@/components/reports/AccountOverview";
import { TransactionSummary } from "@/components/reports/TransactionSummary";
import { TransactionTrends } from "@/components/reports/TransactionTrends";
import { ComparisonChart } from "@/components/reports/ComparisonChart";
import { TopTransactions } from "@/components/reports/TopTransactions";

const Report = () => {
  const [timeFilter, setTimeFilter] = useState("month");
  const { data, loading } = useReport(localStorage.getItem("walletId"), timeFilter);
  const reportRef = useRef(null);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    );
  }

  const handleExport = async () => {
    try {
      await exportToPdf(
        reportRef.current,
        `financial-report-${data?.firstName}-${data?.lastName}.pdf`
      );
      toast.success("Report exported successfully!");
    } catch (error) {
      console.error('Export failed:', error);
      toast.error("Failed to export report. Please try again.");
    }
  };

  return (
    <div className="flex min-h-screen">
      <SideNav className="sidenav" />
      <div className="flex-1 ml-0 md:ml-64 p-4 lg:p-8 bg-muted animate-fadeIn overflow-y-auto">
        <div ref={reportRef}>
          <ReportHeader
            data={data}
            timeFilter={timeFilter}
            setTimeFilter={setTimeFilter}
            onExport={handleExport}
          />
          <div className="grid grid-cols-4 gap-6">
            <AccountOverview data={data} />
            <TransactionSummary data={data} />
            <TransactionTrends data={data} timeFilter={timeFilter} />
            <ComparisonChart data={data} timeFilter={timeFilter} />
            <TopTransactions data={data} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Report;