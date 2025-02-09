import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { Badge } from "@/components/ui/badge"
import { Monitor } from "lucide-react"

export default function AccountSecurityPage() {
  return (
    <div className="max-w-3xl mx-auto p-4 md:p-6 space-y-6">
      <h1 className="text-2xl font-semibold">Account Security</h1>

      <Card>
        <CardHeader>
          <CardTitle>Account Information</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-1">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-medium">E-mail address</h3>
                <p className="text-sm text-muted-foreground">
                  If you need to change your e-mail address, please contact Customer Service
                </p>
              </div>
              <span className="text-muted-foreground">p***yy@gmail.com</span>
            </div>
          </div>

          <div className="space-y-1">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-medium">Wallet address</h3>
                <p className="text-sm text-muted-foreground">Log in with your preferred wallet address</p>
              </div>
              <Button variant="secondary">Set address</Button>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Security settings</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-1">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-medium">Google Authenticator (2FA)</h3>
                <p className="text-sm text-muted-foreground">
                  Use the Authenticator to get verification codes for better security.
                </p>
              </div>
              <div className="flex items-center gap-3">
                <Badge variant="secondary">Status: off</Badge>
                <Button>Enable</Button>
              </div>
            </div>
          </div>

          <Separator />

          <div className="space-y-1">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-medium">E-mail address verification (2FA)</h3>
                <p className="text-sm text-muted-foreground">
                  If you need to change your e-mail address, please contact Customer Service
                </p>
              </div>
              <Badge variant="outline" className="text-green-500 bg-green-500/10">
                Status: on
              </Badge>
            </div>
          </div>

          <Separator />

          <div className="space-y-1">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-medium">Password</h3>
                <p className="text-sm text-muted-foreground">Set a unique password for better protection</p>
              </div>
              <Button variant="outline">Change password</Button>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Devices and activities</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-1">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Monitor className="w-5 h-5 text-muted-foreground" />
                <div>
                  <h3 className="font-medium">Device Management</h3>
                  <p className="text-sm text-muted-foreground">Authorize devices with access to your account</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <span className="text-sm text-muted-foreground">In use: Edge 129</span>
                <Button variant="outline">Manage</Button>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}