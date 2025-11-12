import { Avatar, AvatarFallback } from "@/components/ui/avatar";

interface Activity {
  id: number;
  user: string;
  action: string;
  time: string;
  initials: string;
}

const activities: Activity[] = [
  { id: 1, user: "John Doe", action: "Created a new user account", time: "2 minutes ago", initials: "JD" },
  { id: 2, user: "Sarah Smith", action: "Updated product inventory", time: "15 minutes ago", initials: "SS" },
  { id: 3, user: "Mike Johnson", action: "Generated monthly report", time: "1 hour ago", initials: "MJ" },
  { id: 4, user: "Emily Brown", action: "Modified system settings", time: "2 hours ago", initials: "EB" },
  { id: 5, user: "David Lee", action: "Completed user verification", time: "3 hours ago", initials: "DL" },
];

export function RecentActivity() {
  return (
    <div className="space-y-4">
      {activities.map((activity) => (
        <div key={activity.id} className="flex items-center gap-4">
          <Avatar className="h-9 w-9">
            <AvatarFallback className="bg-primary/10 text-primary font-medium">
              {activity.initials}
            </AvatarFallback>
          </Avatar>
          <div className="flex-1 space-y-1">
            <p className="text-sm font-medium text-foreground">{activity.user}</p>
            <p className="text-sm text-muted-foreground">{activity.action}</p>
          </div>
          <div className="text-xs text-muted-foreground">{activity.time}</div>
        </div>
      ))}
    </div>
  );
}
