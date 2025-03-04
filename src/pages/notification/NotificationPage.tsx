import { Mail, Bell, ChevronRight } from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Card } from "@/components/ui/card";

interface Notification {
  id: string;
  message: string;
  timestamp: string;
  type: "email" | "push";
  recipient?: string;
}

// Group notifications by date
const groupNotificationsByDate = (notifications: Notification[]) => {
  const groups: { [key: string]: Notification[] } = {};
  notifications.forEach((notification) => {
    const date = new Date(notification.timestamp).toLocaleDateString();
    if (!groups[date]) {
      groups[date] = [];
    }
    groups[date].push(notification);
  });
  return groups;
};

export default function NotificationPage() {
  const notifications: Notification[] = [
    {
      id: "1",
      message:
        "An upper limit was triggered. The price of BTCUSDT is above the $63,600.00 limit.",
      timestamp: "2024-02-09T10:36:00",
      type: "email",
      recipient: "kinphan189@gmail.com",
    },
    {
      id: "2",
      message:
        "An upper limit was triggered. The price of BTCUSDT is above the $63,600.00 limit.",
      timestamp: "2024-02-09T10:36:00",
      type: "push",
    },
  ];

  const groupedNotifications = groupNotificationsByDate(notifications);

  return (
    <div className="space-y-6 mt-6 p-6"> 
      <div className="space-y-4">
        <h1 className="text-2xl font-bold tracking-tight">Your notifications</h1>
        <p className="text-muted-foreground">
          Showing your latest {notifications.length} notifications
        </p>
      </div>
  
      <Card>
        <ScrollArea className="h-[600px] rounded-lg">
          {Object.entries(groupedNotifications).map(([date, notifications]) => (
            <div key={date} className="border-b last:border-b-0">
              <div className="sticky top-0 bg-background/95 backdrop-blur p-4 border-b">
                <p className="font-medium">{date}</p>
              </div>
              <div className="divide-y">
                {notifications.map((notification) => (
                  <div
                    key={notification.id}
                    className="flex items-start gap-4 p-6 hover:bg-muted/50 transition-colors" // Increased padding for better spacing
                  >
                    <div className="mt-1">
                      {notification.type === "email" ? (
                        <Mail className="h-6 w-6" /> // Slightly larger icon
                      ) : (
                        <Bell className="h-6 w-6" />
                      )}
                    </div>
                    <div className="flex-1 space-y-2"> {/* Added more spacing */}
                      <p className="text-sm font-medium">{notification.message}</p>
                      <div className="flex items-center justify-between text-sm text-muted-foreground">
                        <time>
                          {new Date(notification.timestamp).toLocaleTimeString(
                            [],
                            {
                              hour: "numeric",
                              minute: "2-digit",
                              hour12: true,
                            }
                          )}
                        </time>
                        <div className="flex items-center gap-2"> {/* Increased gap */}
                          {notification.type === "email" ? (
                            <>
                              <Mail className="h-4 w-4" />
                              <span>Email sent to {notification.recipient}</span>
                            </>
                          ) : (
                            <>
                              <Bell className="h-4 w-4" />
                              <span>Push Notification</span>
                            </>
                          )}
                        </div>
                      </div>
                    </div>
                    <ChevronRight className="h-5 w-5 text-muted-foreground/50" />
                  </div>
                ))}
              </div>
            </div>
          ))}
        </ScrollArea>
      </Card>
    </div>
  );
}