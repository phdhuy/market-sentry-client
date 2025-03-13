import { CalendarIcon, Camera, LinkIcon, User, Pencil } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { useState } from "react"

export default function ProfilePage() {
  const [displayName, setDisplayName] = useState("duc_heo")
  const [username, setUsername] = useState("yyliidzxfjan")
  const [bio, setBio] = useState("")
  const [website, setWebsite] = useState("")

  return (
    <div className="container mx-auto py-8 px-4 max-w-6xl">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-bold tracking-tight">Profile Settings</h1>
        <Button className="bg-orange-500 hover:bg-orange-600 text-white shadow-sm transition-all border border-orange-600/20">
          Save Changes
        </Button>
      </div>

      <Card className="border border-border/30 shadow-sm rounded-xl overflow-hidden">
        <CardHeader className="pb-3 border-b border-border/30">
          <CardTitle className="flex items-center gap-2 text-xl">
            <User className="h-5 w-5 text-orange-500" />
            Personal Information
          </CardTitle>
        </CardHeader>
        <CardContent className="p-6 space-y-6">
          <div className="space-y-1">
            <Label className="text-sm font-medium text-muted-foreground">Your Avatar</Label>
            <div className="flex items-center gap-4 mt-2">
              <div className="relative group">
                <Avatar className="h-24 w-24 border-2 border-orange-500/20 bg-background">
                  <AvatarImage
                    src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-rntUDpP0dp9EkZTi4SvjVcu2vtVK17.png"
                    alt="Profile avatar"
                  />
                  <AvatarFallback>DH</AvatarFallback>
                </Avatar>
                <div className="absolute inset-0 bg-black/40 rounded-full opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                  <Camera className="h-6 w-6 text-white" />
                </div>
              </div>
              <div className="flex flex-col sm:flex-row gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  className="border border-border/50 bg-background/50 hover:border-orange-500/30"
                >
                  <Pencil className="h-3.5 w-3.5 mr-2" />
                  Change Avatar
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  className="text-orange-500 hover:text-orange-600 hover:bg-orange-500/10"
                >
                  Get Avatar Frame
                </Button>
              </div>
            </div>
          </div>

          <Separator className="bg-border/30" />

          <div className="grid gap-5">
            <div className="space-y-2">
              <Label htmlFor="display-name" className="text-sm font-medium">
                Display name
              </Label>
              <div className="relative">
                <Input
                  id="display-name"
                  value={displayName}
                  onChange={(e) => setDisplayName(e.target.value)}
                  className="border-border/50 bg-background/50 focus-visible:ring-orange-500 pr-12"
                  maxLength={20}
                />
                <span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-muted-foreground">
                  {displayName.length}/20
                </span>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="username" className="text-sm font-medium">
                Username
              </Label>
              <div className="relative">
                <Input
                  id="username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="border-border/50 bg-background/50 focus-visible:ring-orange-500 pr-12"
                  maxLength={20}
                />
                <span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-muted-foreground">
                  {username.length}/20
                </span>
              </div>
              <p className="text-xs text-muted-foreground italic">* Username can only be changed once per 7 days</p>
            </div>

            <div className="space-y-2">
              <Label htmlFor="bio" className="text-sm font-medium">
                Bio
              </Label>
              <div className="relative">
                <Textarea
                  id="bio"
                  placeholder="A brief introduction about yourself"
                  className="min-h-[120px] resize-none border-border/50 bg-background/50 focus-visible:ring-orange-500"
                  value={bio}
                  onChange={(e) => setBio(e.target.value)}
                  maxLength={250}
                />
                <span className="absolute right-3 bottom-3 text-xs text-muted-foreground">{bio.length}/250</span>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="birthday" className="text-sm font-medium">
                Birthday
              </Label>
              <div className="relative">
                <CalendarIcon className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  id="birthday"
                  type="date"
                  placeholder="Birthday"
                  className="pl-10 border-border/50 bg-background/50 focus-visible:ring-orange-500"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="website" className="text-sm font-medium">
                Website
              </Label>
              <div className="relative">
                <LinkIcon className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  id="website"
                  type="url"
                  placeholder="Add your website"
                  className="pl-10 border-border/50 bg-background/50 focus-visible:ring-orange-500 pr-12"
                  value={website}
                  onChange={(e) => setWebsite(e.target.value)}
                  maxLength={100}
                />
                <span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-muted-foreground">
                  {website.length}/100
                </span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="flex justify-end mt-6">
        <Button className="bg-orange-500 hover:bg-orange-600 text-white shadow-sm transition-all border border-orange-600/20">
          Save Changes
        </Button>
      </div>
    </div>
  )
}