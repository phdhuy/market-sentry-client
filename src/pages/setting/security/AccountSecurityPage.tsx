import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  Monitor,
  Shield,
  Mail,
  Wallet,
  KeyRound,
  ShieldAlert,
  ShieldCheck,
  AlertCircle,
  ChevronRight,
} from "lucide-react"

export default function AccountSecurityPage() {
  return (
    <div className="container mx-auto py-8 px-4 max-w-6xl">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Account Security</h1>
          <p className="text-muted-foreground mt-1">Manage your account security settings and devices</p>
        </div>
        <Button className="bg-orange-500 hover:bg-orange-600 text-white shadow-sm transition-all border border-orange-600/20">
          <Shield className="mr-2 h-4 w-4" />
          Security Checkup
        </Button>
      </div>

      <div className="grid gap-6">
        <Card className="border border-border/30 shadow-sm rounded-xl overflow-hidden">
          <CardHeader className="pb-3 border-b border-border/30">
            <CardTitle className="flex items-center gap-2 text-xl">
              <Mail className="h-5 w-5 text-orange-500" />
              Account Information
            </CardTitle>
          </CardHeader>
          <CardContent className="p-6 space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-4 rounded-lg bg-muted/20 border border-border/30 hover:border-orange-500/20 transition-colors">
              <div>
                <h3 className="font-medium flex items-center">E-mail address</h3>
                <p className="text-sm text-muted-foreground mt-1">
                  If you need to change your e-mail address, please contact Customer Service
                </p>
              </div>
              <div className="flex items-center gap-2">
                <Badge variant="outline" className="bg-background/50 border-border/40 font-mono">
                  p***yy@gmail.com
                </Badge>
                <Button variant="ghost" size="icon" className="h-8 w-8 text-muted-foreground">
                  <ChevronRight className="h-4 w-4" />
                </Button>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-4 rounded-lg bg-muted/20 border border-border/30 hover:border-orange-500/20 transition-colors">
              <div>
                <h3 className="font-medium flex items-center">
                  <Wallet className="mr-2 h-4 w-4 text-orange-500" />
                  Wallet address
                </h3>
                <p className="text-sm text-muted-foreground mt-1">Log in with your preferred wallet address</p>
              </div>
              <Button variant="outline" className="border-border/50 bg-background/50 hover:border-orange-500/30">
                Set address
              </Button>
            </div>
          </CardContent>
        </Card>

        <Card className="border border-border/30 shadow-sm rounded-xl overflow-hidden">
          <CardHeader className="pb-3 border-b border-border/30">
            <CardTitle className="flex items-center gap-2 text-xl">
              <ShieldAlert className="h-5 w-5 text-orange-500" />
              Security Settings
            </CardTitle>
          </CardHeader>
          <CardContent className="p-6 space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-4 rounded-lg bg-muted/20 border border-border/30 hover:border-orange-500/20 transition-colors">
              <div>
                <h3 className="font-medium flex items-center">
                  <AlertCircle className="mr-2 h-4 w-4 text-orange-500" />
                  Google Authenticator (2FA)
                </h3>
                <p className="text-sm text-muted-foreground mt-1">
                  Use the Authenticator to get verification codes for better security.
                </p>
              </div>
              <div className="flex items-center gap-3">
                <Badge variant="outline" className="border-red-500/30 bg-red-500/5 text-red-600">
                  Status: off
                </Badge>
                <Button className="bg-orange-500 hover:bg-orange-600 text-white shadow-sm transition-all border border-orange-600/20">
                  Enable
                </Button>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-4 rounded-lg bg-muted/20 border border-border/30 hover:border-orange-500/20 transition-colors">
              <div>
                <h3 className="font-medium flex items-center">
                  <ShieldCheck className="mr-2 h-4 w-4 text-green-500" />
                  E-mail address verification (2FA)
                </h3>
                <p className="text-sm text-muted-foreground mt-1">
                  If you need to change your e-mail address, please contact Customer Service
                </p>
              </div>
              <Badge variant="outline" className="border-green-500/30 bg-green-500/5 text-green-600">
                Status: on
              </Badge>
            </div>

            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-4 rounded-lg bg-muted/20 border border-border/30 hover:border-orange-500/20 transition-colors">
              <div>
                <h3 className="font-medium flex items-center">
                  <KeyRound className="mr-2 h-4 w-4 text-orange-500" />
                  Password
                </h3>
                <p className="text-sm text-muted-foreground mt-1">Set a unique password for better protection</p>
              </div>
              <Button variant="outline" className="border-border/50 bg-background/50 hover:border-orange-500/30">
                Change password
              </Button>
            </div>
          </CardContent>
        </Card>

        <Card className="border border-border/30 shadow-sm rounded-xl overflow-hidden">
          <CardHeader className="pb-3 border-b border-border/30">
            <CardTitle className="flex items-center gap-2 text-xl">
              <Monitor className="h-5 w-5 text-orange-500" />
              Devices and Activities
            </CardTitle>
          </CardHeader>
          <CardContent className="p-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-4 rounded-lg bg-muted/20 border border-border/30 hover:border-orange-500/20 transition-colors">
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-full bg-orange-500/10 flex items-center justify-center">
                  <Monitor className="h-5 w-5 text-orange-500" />
                </div>
                <div>
                  <h3 className="font-medium">Device Management</h3>
                  <p className="text-sm text-muted-foreground">Authorize devices with access to your account</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Badge variant="outline" className="bg-background/50 border-border/40">
                  In use: Edge 129
                </Badge>
                <Button variant="outline" className="border-border/50 bg-background/50 hover:border-orange-500/30">
                  Manage
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}