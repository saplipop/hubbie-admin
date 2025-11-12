import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { FileText, Download, Calendar } from "lucide-react";

const reports = [
  { id: 1, title: "Monthly Sales Report", date: "June 2024", size: "2.4 MB", type: "Sales" },
  { id: 2, title: "User Activity Analysis", date: "May 2024", size: "1.8 MB", type: "Analytics" },
  { id: 3, title: "Financial Summary Q2", date: "Q2 2024", size: "3.1 MB", type: "Finance" },
  { id: 4, title: "Inventory Overview", date: "June 2024", size: "890 KB", type: "Inventory" },
  { id: 5, title: "Performance Metrics", date: "May 2024", size: "1.2 MB", type: "Performance" },
];

export default function Reports() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Reports</h1>
          <p className="text-muted-foreground mt-1">Access and download your generated reports.</p>
        </div>
        <Button className="gap-2">
          <FileText className="h-4 w-4" />
          Generate Report
        </Button>
      </div>

      <div className="grid gap-4">
        {reports.map((report) => (
          <Card key={report.id} className="shadow-sm hover:shadow-md transition-shadow">
            <CardHeader>
              <div className="flex items-start justify-between">
                <div className="flex items-start gap-4">
                  <div className="p-2 bg-primary/10 rounded-lg">
                    <FileText className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <CardTitle className="text-lg">{report.title}</CardTitle>
                    <CardDescription className="flex items-center gap-4 mt-2">
                      <span className="flex items-center gap-1">
                        <Calendar className="h-3 w-3" />
                        {report.date}
                      </span>
                      <span>{report.size}</span>
                      <span className="text-primary font-medium">{report.type}</span>
                    </CardDescription>
                  </div>
                </div>
                <Button variant="ghost" size="sm" className="gap-2">
                  <Download className="h-4 w-4" />
                  Download
                </Button>
              </div>
            </CardHeader>
          </Card>
        ))}
      </div>

      <Card className="shadow-sm">
        <CardHeader>
          <CardTitle>Report Schedule</CardTitle>
          <CardDescription>Configure automatic report generation</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between p-4 border border-border rounded-lg">
            <div>
              <p className="font-medium text-foreground">Weekly Sales Report</p>
              <p className="text-sm text-muted-foreground">Every Monday at 9:00 AM</p>
            </div>
            <Button variant="outline" size="sm">Edit</Button>
          </div>
          
          <div className="flex items-center justify-between p-4 border border-border rounded-lg">
            <div>
              <p className="font-medium text-foreground">Monthly Analytics Summary</p>
              <p className="text-sm text-muted-foreground">First day of each month</p>
            </div>
            <Button variant="outline" size="sm">Edit</Button>
          </div>
          
          <div className="flex items-center justify-between p-4 border border-border rounded-lg">
            <div>
              <p className="font-medium text-foreground">Quarterly Financial Report</p>
              <p className="text-sm text-muted-foreground">End of each quarter</p>
            </div>
            <Button variant="outline" size="sm">Edit</Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
