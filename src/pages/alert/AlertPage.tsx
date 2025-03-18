import { useState } from "react";
import {
  Plus,
  Trash2,
  Mail,
  BellRing,
  ArrowUp,
  ArrowDown,
  Loader2,
  AlertCircle,
  Calendar,
  CheckCircle2,
  Clock,
  Edit,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
  DialogDescription,
} from "@/components/ui/dialog";
import { useDeleteAlert } from "./hooks/use-delete-alert";
import { useUpdateAlert } from "./hooks/use-update-alert";
import { useAlertList } from "./hooks/use-alert-list";
import { AlertInfoResponse } from "@/api/alert-api";

export default function AlertPage() {
  const [dialogOpen, setDialogOpen] = useState(false);
  const [selectedAsset, setSelectedAsset] = useState("");
  const [targetPrice, setTargetPrice] = useState("");
  const [alertType, setAlertType] = useState<"above" | "below">("above");
  const [notificationMethods, setNotificationMethods] = useState<
    ("email" | "telegram")[]
  >(["email"]);
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedAlertId, setSelectedAlertId] = useState<string | null>(null);
  const [isEditing, setIsEditing] = useState(false);

  const { data, isLoading } = useAlertList({
    sort: "created_at",
    order: "desc",
    page: currentPage,
    paging: 10,
  });

  const deleteAlertMutation = useDeleteAlert();
  const updateAlertMutation = useUpdateAlert({
    onSuccess: () => {
      setDialogOpen(false);
      resetForm();
    },
  });

  const toggleNotificationMethod = (method: "email" | "telegram") => {
    if (notificationMethods.includes(method)) {
      setNotificationMethods(notificationMethods.filter((m) => m !== method));
    } else {
      setNotificationMethods([...notificationMethods, method]);
    }
  };

  const handleDeleteAlert = (alertId: string) => {
    if (confirm("Are you sure you want to delete this alert?")) {
      deleteAlertMutation.mutate(alertId);
    }
  };

  const handleUpdateAlert = () => {
    if (!selectedAlertId || !targetPrice) return;

    const condition = alertType === "above" ? "GREATER_THAN" : "LESS_THAN";

    updateAlertMutation.mutate({
      alertId: selectedAlertId,
      data: {
        alert_type: "PRICE",
        alert_condition_type: condition,
        value: Number(targetPrice),
        trigger_type: "ONLY_ONCE",
        expiration_at: "2025-03-13T16:03:56.636Z",
        alert_method_types: ["EMAIL"],
      },
    });
  };

  const handleEditAlert = (alert: AlertInfoResponse) => {
    setIsEditing(true);
    setSelectedAlertId(alert.id);
    setSelectedAsset(alert.asset.id);
    setTargetPrice(alert.value.toString());
    setAlertType(
      alert.alert_condition_type === "GREATER_THAN" ? "above" : "below"
    );
    setNotificationMethods(
      alert.alert_method_types.map((method: string) =>
        method.toLowerCase()
      ) as ("email" | "telegram")[]
    );
    setDialogOpen(true);
  };

  const resetForm = () => {
    setSelectedAlertId(null);
    setSelectedAsset("");
    setTargetPrice("");
    setAlertType("above");
    setNotificationMethods(["email"]);
    setIsEditing(false);
  };

  const formatDate = (timestamp: number) => {
    return new Date(timestamp).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  return (
    <div className="container mx-auto py-10 px-4 max-w-5xl">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 mb-10">
        <div>
          <h1 className="text-3xl font-bold tracking-tight bg-gradient-to-r from-orange-500 to-orange-700 bg-clip-text text-transparent">
            Price Alerts
          </h1>
          <p className="text-muted-foreground mt-2">
            Get notified when your favorite cryptocurrencies hit your target
            price
          </p>
        </div>
        <Dialog
          open={dialogOpen}
          onOpenChange={(open) => {
            if (!open) resetForm();
            setDialogOpen(open);
          }}
        >
          <DialogTrigger asChild>
            <Button className="bg-orange-500 hover:bg-orange-600 text-white shadow-lg shadow-orange-500/20 transition-all hover:shadow-orange-500/30 rounded-full px-5">
              <Plus className="w-4 h-4 mr-2" />
              Create Alert
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[500px] rounded-xl border-border/40 shadow-xl">
            <DialogHeader>
              <DialogTitle className="text-xl">
                {isEditing ? "Update Alert" : "Create New Alert"}
              </DialogTitle>
              <DialogDescription>
                {isEditing
                  ? "Update your price alert settings"
                  : "Set up price alerts for your selected cryptocurrency"}
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-6 py-4">
              <div className="grid sm:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label className="text-sm font-medium">Cryptocurrency</Label>
                  <Select
                    value={selectedAsset}
                    onValueChange={setSelectedAsset}
                    disabled={isEditing}
                  >
                    <SelectTrigger className="h-11 rounded-lg border-border/60 bg-background/50 focus:ring-orange-500">
                      <SelectValue placeholder="Select cryptocurrency" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="btc">Bitcoin (BTC)</SelectItem>
                      <SelectItem value="eth">Ethereum (ETH)</SelectItem>
                      <SelectItem value="sol">Solana (SOL)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label className="text-sm font-medium">
                    Target Price (USDT)
                  </Label>
                  <Input
                    type="number"
                    placeholder="Enter price"
                    value={targetPrice}
                    onChange={(e) => setTargetPrice(e.target.value)}
                    className="h-11 rounded-lg border-border/60 bg-background/50 focus-visible:ring-orange-500"
                  />
                </div>
              </div>

              <div className="space-y-3">
                <Label className="text-sm font-medium">Alert Type</Label>
                <RadioGroup
                  value={alertType}
                  onValueChange={(value) =>
                    setAlertType(value as "above" | "below")
                  }
                  className="flex flex-col sm:flex-row gap-4"
                >
                  <div className="flex items-center space-x-2 bg-background/50 border border-border/60 rounded-lg px-4 py-3 flex-1 hover:border-green-500/30 hover:bg-green-500/5 transition-colors">
                    <RadioGroupItem
                      value="above"
                      id="above"
                      className="text-green-500"
                    />
                    <Label
                      htmlFor="above"
                      className="flex items-center gap-1.5 cursor-pointer"
                    >
                      <ArrowUp className="w-3.5 h-3.5 text-green-500" />
                      Price goes above
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2 bg-background/50 border border-border/60 rounded-lg px-4 py-3 flex-1 hover:border-red-500/30 hover:bg-red-500/5 transition-colors">
                    <RadioGroupItem
                      value="below"
                      id="below"
                      className="text-red-500"
                    />
                    <Label
                      htmlFor="below"
                      className="flex items-center gap-1.5 cursor-pointer"
                    >
                      <ArrowDown className="w-3.5 h-3.5 text-red-500" />
                      Price goes below
                    </Label>
                  </div>
                </RadioGroup>
              </div>

              <div className="space-y-3">
                <Label className="text-sm font-medium">
                  Notification Methods
                </Label>
                <div className="flex flex-col sm:flex-row gap-4">
                  <div className="flex items-center space-x-2 bg-background/50 border border-border/60 rounded-lg px-4 py-3 flex-1 hover:border-blue-500/30 transition-colors">
                    <Switch
                      id="email"
                      checked={notificationMethods.includes("email")}
                      onCheckedChange={() => toggleNotificationMethod("email")}
                      className="data-[state=checked]:bg-blue-500"
                    />
                    <Label
                      htmlFor="email"
                      className="flex items-center gap-1.5 cursor-pointer"
                    >
                      <Mail className="w-3.5 h-3.5 text-blue-500" />
                      Email
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2 bg-background/50 border border-border/60 rounded-lg px-4 py-3 flex-1 hover:border-purple-500/30 transition-colors">
                    <Switch
                      id="push"
                      checked={notificationMethods.includes("telegram")}
                      onCheckedChange={() =>
                        toggleNotificationMethod("telegram")
                      }
                      className="data-[state=checked]:bg-purple-500"
                    />
                    <Label
                      htmlFor="push"
                      className="flex items-center gap-1.5 cursor-pointer"
                    >
                      <BellRing className="w-3.5 h-3.5 text-purple-500" />
                      Push Notification
                    </Label>
                  </div>
                </div>
              </div>
            </div>
            <DialogFooter>
              <Button
                onClick={isEditing ? handleUpdateAlert : () => {}}
                disabled={
                  updateAlertMutation.isPending ||
                  !targetPrice ||
                  (!isEditing && !selectedAsset)
                }
                className="bg-orange-500 hover:bg-orange-600 text-white shadow-md shadow-orange-500/20 transition-all hover:shadow-orange-500/30 rounded-lg px-5"
              >
                {updateAlertMutation.isPending ? (
                  <>
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    {isEditing ? "Updating..." : "Creating..."}
                  </>
                ) : isEditing ? (
                  "Update Alert"
                ) : (
                  "Create Alert"
                )}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      <Card className="border-border/30 shadow-xl rounded-xl overflow-hidden">
        <CardHeader className="pb-4 bg-gradient-to-r from-orange-500/10 to-orange-700/5">
          <CardTitle className="text-xl flex items-center gap-2">
            <BellRing className="w-5 h-5 text-orange-500" />
            Active Alerts
          </CardTitle>
          <CardDescription>Manage your existing price alerts</CardDescription>
          <Separator className="mt-4 bg-border/40" />
        </CardHeader>
        <CardContent className="space-y-5 pt-5">
          {isLoading ? (
            // Loading skeleton
            Array(3)
              .fill(0)
              .map((_, index) => (
                <div
                  key={index}
                  className="flex flex-col sm:flex-row items-start sm:items-center justify-between p-5 rounded-xl border border-border/30 gap-4 bg-background/50"
                >
                  <div className="flex items-center gap-4">
                    <Skeleton className="h-10 w-10 rounded-full" />
                    <div className="space-y-2">
                      <Skeleton className="h-5 w-32" />
                      <Skeleton className="h-4 w-24" />
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <Skeleton className="h-8 w-16 rounded-full" />
                    <Skeleton className="h-8 w-8 rounded-md" />
                  </div>
                </div>
              ))
          ) : data?.data && data.data.length > 0 ? (
            <>
              {data.data.map((alert) => (
                <div
                  key={alert.id}
                  className={`flex flex-col sm:flex-row items-start sm:items-center justify-between p-5 rounded-xl gap-4 transition-all duration-200 ${
                    alert.alert_status === "ACTIVE"
                      ? "bg-background/80 border border-border/60 shadow-sm hover:shadow-md"
                      : alert.alert_status === "TRIGGERED"
                      ? "bg-green-500/5 border border-green-500/20"
                      : "bg-muted/30 border border-border/30 opacity-70"
                  }`}
                >
                  <div className="flex items-center gap-4">
                    {alert.alert_status === "TRIGGERED" ? (
                      <div className="w-10 h-10 rounded-full bg-green-500/10 border border-green-500/20 flex items-center justify-center text-green-500">
                        <CheckCircle2 className="w-5 h-5" />
                      </div>
                    ) : (
                      <div className="w-10 h-10 rounded-full bg-orange-500/10 border border-orange-500/20 flex items-center justify-center text-orange-500">
                        <BellRing className="w-5 h-5" />
                      </div>
                    )}
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <h3 className="font-medium text-base">
                          {alert.asset.name}
                        </h3>
                        <Badge
                          variant="outline"
                          className={`${
                            alert.alert_condition_type === "GREATER_THAN"
                              ? "border-green-500/50 bg-green-500/10 text-green-600"
                              : "border-red-500/50 bg-red-500/10 text-red-600"
                          }`}
                        >
                          {alert.alert_condition_type === "GREATER_THAN" ? (
                            <span className="flex items-center gap-1">
                              <ArrowUp className="w-3 h-3" /> Above
                            </span>
                          ) : (
                            <span className="flex items-center gap-1">
                              <ArrowDown className="w-3 h-3" /> Below
                            </span>
                          )}
                        </Badge>
                        {alert.alert_status === "TRIGGERED" && (
                          <Badge
                            variant="outline"
                            className="border-green-500/50 bg-green-500/10 text-green-600"
                          >
                            Triggered
                          </Badge>
                        )}
                      </div>
                      <div className="flex flex-wrap gap-x-4 gap-y-1 text-sm text-muted-foreground">
                        <p className="flex items-center gap-1">
                          <span className="font-medium text-foreground">
                            ${alert.value.toLocaleString()}
                          </span>
                        </p>
                        <p className="flex items-center gap-1">
                          <Calendar className="w-3.5 h-3.5" />
                          {formatDate(alert.created_at)}
                        </p>
                        {alert.expiration_at && (
                          <p className="flex items-center gap-1">
                            <Clock className="w-3.5 h-3.5" />
                            Expires: {formatDate(alert.expiration_at)}
                          </p>
                        )}
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-4">
                    <div className="flex -space-x-2">
                      {alert.alert_method_types?.includes("EMAIL") && (
                        <div className="w-9 h-9 flex items-center justify-center rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-500">
                          <Mail className="w-4 h-4" />
                        </div>
                      )}
                      {alert.alert_method_types?.includes("PUSH") && (
                        <div className="w-9 h-9 flex items-center justify-center rounded-full bg-purple-500/10 border border-purple-500/20 text-purple-500">
                          <BellRing className="w-4 h-4" />
                        </div>
                      )}
                    </div>
                    <div className="flex items-center gap-2">
                      <Button
                        variant="ghost"
                        size="icon"
                        className="text-muted-foreground hover:text-orange-500 hover:bg-orange-500/10 transition-colors rounded-full h-9 w-9"
                        onClick={() => handleEditAlert(alert)}
                        disabled={alert.alert_status === "TRIGGERED"}
                      >
                        <Edit className="w-4 h-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="text-muted-foreground hover:text-red-500 hover:bg-red-500/10 transition-colors rounded-full h-9 w-9"
                        onClick={() => handleDeleteAlert(alert.id)}
                        disabled={
                          deleteAlertMutation.isPending &&
                          deleteAlertMutation.variables === alert.id
                        }
                      >
                        {deleteAlertMutation.isPending &&
                        deleteAlertMutation.variables === alert.id ? (
                          <Loader2 className="w-4 h-4 animate-spin" />
                        ) : (
                          <Trash2 className="w-4 h-4" />
                        )}
                      </Button>
                    </div>
                  </div>
                </div>
              ))}

              {/* Pagination */}
              {data.meta && data.meta.total_pages > 1 && (
                <div className="flex items-center justify-between mt-8">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handlePageChange(data.meta?.prev_page ?? 1)}
                    disabled={
                      currentPage === 1 || data.meta.prev_page === currentPage
                    }
                    className="border-border/50 bg-background/50 rounded-md hover:border-orange-500/30"
                  >
                    <ChevronLeft className="h-4 w-4 mr-2" />
                    Previous
                  </Button>

                  <div className="flex items-center gap-1 px-3 py-1.5 border border-border/30 rounded-md bg-muted/20">
                    <span className="text-sm text-muted-foreground">Page</span>
                    <span className="font-medium text-sm">{currentPage}</span>
                    <span className="text-sm text-muted-foreground">of</span>
                    <span className="font-medium text-sm">
                      {data.meta.total_pages}
                    </span>
                  </div>

                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handlePageChange(data.meta?.prev_page ?? 1)}
                    disabled={
                      currentPage === data.meta.total_pages ||
                      data.meta.next_page === currentPage
                    }
                    className="border-border/50 bg-background/50 rounded-md hover:border-orange-500/30"
                  >
                    Next
                    <ChevronRight className="h-4 w-4 ml-2" />
                  </Button>
                </div>
              )}
            </>
          ) : (
            <div className="text-center py-12 text-muted-foreground flex flex-col items-center bg-muted/10 rounded-xl border border-dashed border-border/40">
              <AlertCircle className="w-12 h-12 text-muted-foreground mb-3 opacity-50" />
              <p className="text-lg font-medium mb-1">No active alerts</p>
              <p className="text-sm text-muted-foreground mb-4">
                Create one to get notified when prices change
              </p>
              <Button
                onClick={() => setDialogOpen(true)}
                className="bg-orange-500 hover:bg-orange-600 text-white shadow-md shadow-orange-500/20 transition-all hover:shadow-orange-500/30 rounded-full px-5"
              >
                <Plus className="w-4 h-4 mr-2" />
                Create Your First Alert
              </Button>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
