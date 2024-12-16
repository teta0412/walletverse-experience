import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ArrowDownUp, DollarSign, Users, Activity } from "lucide-react";
import SideNav from "@/components/SideNav";
import { useDashboard } from "@/hooks/useDashboard";
const formatDate = (dateString) => {
  const date = new Date(dateString);
  const now = new Date();
  const diffInHours = Math.floor((now - date) / (1000 * 60 * 60));
  
  if (diffInHours < 24) {
    return `${diffInHours} hours ago`;
  }
  return date.toLocaleDateString();
};
const Dashboard = () => {
  const { dashboard, loading } = useDashboard();
  if (loading) {
    return <div className="flex min-h-screen items-center justify-center">
      <p>Loading...</p>
    </div>;
  }
  const recentSend = dashboard?.sentTransactions || [];
  const recentReceived = dashboard?.receivedTransactions || [];
  console.log(recentSend)
  console.log(recentReceived);
  return (
    <div className="flex min-h-screen">
      <SideNav />
      <div className="flex-1 ml-64 p-4 lg:p-8 bg-muted animate-fadeIn overflow-y-auto">
        <div className="max-w-7xl mx-auto space-y-8">
          <div className="flex items-center gap-4">
            <Avatar className="h-16 w-16">
              <AvatarFallback>{dashboard?.name?.charAt(0) || "U"}</AvatarFallback>
            </Avatar>
            <div>
              <h1 className="text-2xl font-bold">Welcome, {dashboard?.firstName + ' ' + dashboard?.lastName || "User"}</h1>
              <p className="text-muted-foreground">{dashboard?.email}</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <Card className="glass-card card-hover">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Wallet Balance
                </CardTitle>
                <DollarSign className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">${dashboard?.data.balance}</div>
                {/* <p className="text-xs text-muted-foreground">
                  +20.1% from last month
                </p> */}
              </CardContent>
            </Card>
            <Card className="glass-card card-hover">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Weekly Deposits
                </CardTitle>
                <ArrowDownUp className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">+${dashboard?.weeklyDeposits || 0}</div>
                {/* <p className="text-xs text-muted-foreground">
                  +19% from last week
                </p> */}
              </CardContent>
            </Card>
            <Card className="glass-card card-hover">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Weekly Withdrawals
                </CardTitle>
                <Users className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">-${dashboard?.weeklyWithdrawals || 0}</div>
                {/* <p className="text-xs text-muted-foreground">
                  -4% from last week
                </p> */}
              </CardContent>
            </Card>
            <Card className="glass-card card-hover">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Total Transactions
                </CardTitle>
                <Activity className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{dashboard?.totalTransactions || 0}</div>
                {/* <p className="text-xs text-muted-foreground">
                  +7% from last month
                </p> */}
              </CardContent>
            </Card>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            <Card className="glass-card">
              <CardHeader>
                <CardTitle>Recent Sent Transactions</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {recentSend.map((transaction) => (
                    <div
                      key={transaction.transactionId}
                      className="flex items-center justify-between p-2 hover:bg-muted/50 rounded-lg transition-colors"
                    >
                      <div className="flex items-center gap-2">
                        <Avatar className="h-8 w-8">
                          <AvatarFallback>U</AvatarFallback>
                        </Avatar>
                        <div>
                          <p className="text-sm font-medium">Transaction</p>
                          <p className="text-xs text-muted-foreground">
                            {transaction.transactionId}
                          </p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="text-sm font-medium text-error">-${transaction.amount}</p>
                        <p className="text-xs text-muted-foreground">
                        {formatDate(transaction.createdAt)}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card className="glass-card">
              <CardHeader>
                <CardTitle>Recent Received Transactions</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {recentReceived.map((transaction) => (
                    <div
                      key={transaction.transactionId}
                      className="flex items-center justify-between p-2 hover:bg-muted/50 rounded-lg transition-colors"
                    >
                      <div className="flex items-center gap-2">
                        <Avatar className="h-8 w-8">
                          <AvatarFallback>U</AvatarFallback>
                        </Avatar>
                        <div>
                          <p className="text-sm font-medium">Transaction</p>
                          <p className="text-xs text-muted-foreground">
                            {transaction.transactionId}
                          </p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="text-sm font-medium text-success">+${transaction.amount}</p>
                        <p className="text-xs text-muted-foreground">
                          {formatDate(transaction.createdAt)}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
