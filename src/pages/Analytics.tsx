import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { AreaChart, Area, PieChart, Pie, Cell, ResponsiveContainer, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from "recharts";

const trafficData = [
  { name: "Mon", visits: 2400, pageviews: 4000 },
  { name: "Tue", visits: 1398, pageviews: 3200 },
  { name: "Wed", visits: 3800, pageviews: 5000 },
  { name: "Thu", visits: 3908, pageviews: 4800 },
  { name: "Fri", visits: 4800, pageviews: 6200 },
  { name: "Sat", visits: 3490, pageviews: 5300 },
  { name: "Sun", visits: 2300, pageviews: 3900 },
];

const deviceData = [
  { name: "Desktop", value: 63, color: "hsl(var(--chart-1))" },
  { name: "Mobile", value: 28, color: "hsl(var(--chart-2))" },
  { name: "Tablet", value: 9, color: "hsl(var(--chart-3))" },
];

export default function Analytics() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-foreground">Analytics</h1>
        <p className="text-muted-foreground mt-1">Detailed insights into your platform performance.</p>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        <Card className="shadow-sm">
          <CardHeader>
            <CardTitle className="text-sm font-medium text-muted-foreground">Page Views</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-foreground">342,567</div>
            <p className="text-xs text-success mt-1">+18.2% from last week</p>
          </CardContent>
        </Card>
        
        <Card className="shadow-sm">
          <CardHeader>
            <CardTitle className="text-sm font-medium text-muted-foreground">Bounce Rate</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-foreground">32.4%</div>
            <p className="text-xs text-success mt-1">-5.3% from last week</p>
          </CardContent>
        </Card>
        
        <Card className="shadow-sm">
          <CardHeader>
            <CardTitle className="text-sm font-medium text-muted-foreground">Avg. Session</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-foreground">4m 32s</div>
            <p className="text-xs text-success mt-1">+12.1% from last week</p>
          </CardContent>
        </Card>
      </div>

      <Card className="shadow-sm">
        <CardHeader>
          <CardTitle>Traffic Overview</CardTitle>
          <CardDescription>Website visits and pageviews over the past week</CardDescription>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={350}>
            <AreaChart data={trafficData}>
              <defs>
                <linearGradient id="colorVisits" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="hsl(var(--chart-1))" stopOpacity={0.3}/>
                  <stop offset="95%" stopColor="hsl(var(--chart-1))" stopOpacity={0}/>
                </linearGradient>
                <linearGradient id="colorPageviews" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="hsl(var(--chart-2))" stopOpacity={0.3}/>
                  <stop offset="95%" stopColor="hsl(var(--chart-2))" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" className="stroke-border" />
              <XAxis dataKey="name" className="text-xs" />
              <YAxis className="text-xs" />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: 'hsl(var(--card))',
                  border: '1px solid hsl(var(--border))',
                  borderRadius: '0.5rem'
                }}
              />
              <Legend />
              <Area type="monotone" dataKey="visits" stroke="hsl(var(--chart-1))" fillOpacity={1} fill="url(#colorVisits)" />
              <Area type="monotone" dataKey="pageviews" stroke="hsl(var(--chart-2))" fillOpacity={1} fill="url(#colorPageviews)" />
            </AreaChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      <Card className="shadow-sm">
        <CardHeader>
          <CardTitle>Device Distribution</CardTitle>
          <CardDescription>Traffic breakdown by device type</CardDescription>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={deviceData}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                outerRadius={100}
                fill="#8884d8"
                dataKey="value"
              >
                {deviceData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
    </div>
  );
}
