import { Mail, Bell, ChevronRight } from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Card } from "@/components/ui/card";
import { useNotificationList } from "./hooks/use-notification-list";
import { formatDateTime } from "@/common";

export default function NotificationPage() {
  const { data } = useNotificationList({
    sort: "createdAt",
    order: "asc",
    page: 1,
    paging: 20,
  });

  return (
    <div className="space-y-6 mt-6 p-6">
      <div className="space-y-4">
        <h1 className="text-2xl font-bold tracking-tight">
          Your notifications
        </h1>
        <p className="text-muted-foreground">
          Showing your latest {data?.data.length} notifications
        </p>
      </div>

      <Card>
        <ScrollArea className="h-[600px] rounded-lg">
          <div className="divide-y">
            {data?.data.map((notification) => (
              <div
                key={notification.id}
                className="flex items-start gap-4 p-6 hover:bg-muted/50 transition-colors"
              >
                <div className="mt-1">
                  <Mail className="h-6 w-6" />
                </div>
                <div className="flex-1 space-y-2">
                  <p className="text-sm font-medium">{notification.content}</p>
                  <div className="flex items-center justify-between text-sm text-muted-foreground">
                    <time>{formatDateTime(notification.created_at)}</time>
                    <div className="flex items-center gap-2">
                      <>
                        <Bell className="h-4 w-4" />
                        <span>Push Notification</span>
                      </>
                    </div>
                  </div>
                </div>
                <ChevronRight className="h-5 w-5 text-muted-foreground/50" />
              </div>
            ))}
          </div>
        </ScrollArea>
      </Card>
    </div>
  );
}