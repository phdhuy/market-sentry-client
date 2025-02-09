import { CalendarIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Avatar } from "@/components/ui/avatar";

export default function ProfilePage() {
  return (
    <div className="min-h-screen p-6">
      <div className="max-w-2xl mx-auto space-y-8">
        <h1 className="text-2xl font-semibold">Profile</h1>

        <section className="space-y-6">
          <h2 className="text-xl">About me</h2>

          <div className="space-y-4">
            <div className="space-y-2">
              <Label>Your Avatar</Label>
              <div className="flex items-center gap-4">
                <div className="relative w-20 h-20">
                  <Avatar className="h-20 w-20">
                    <img
                      src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-rntUDpP0dp9EkZTi4SvjVcu2vtVK17.png"
                      alt="Profile avatar"
                      className="h-full w-full rounded-full"
                    />
                  </Avatar>
                </div>
                <div className="flex items-center gap-3">
                  <Button variant="secondary">Edit</Button>
                  <Button variant="link">Get Avatar Frame</Button>
                </div>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="display-name">Display name</Label>
              <div className="relative">
                <Input id="display-name" defaultValue="duc_heo" />
                <span className="absolute right-3 top-1/2 -translate-y-1/2 text-sm">
                  7/20
                </span>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="username">Username</Label>
              <div className="relative">
                <Input id="username" defaultValue="yyliidzxfjan" />
                <span className="absolute right-3 top-1/2 -translate-y-1/2 text-sm">
                  12/20
                </span>
              </div>
              <p className="text-sm">
                * Username can only be changed once per 7 days
              </p>
            </div>

            <div className="space-y-2">
              <Label htmlFor="bio">Bio</Label>
              <div className="relative">
                <Textarea
                  id="bio"
                  placeholder="A brief introduction about yourself"
                  className="min-h-[100px] resize-none"
                />
                <span className="absolute right-3 bottom-3 text-sm">0/250</span>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="birthday">Birthday</Label>
              <div className="relative">
                <Input
                  id="birthday"
                  type="text"
                  placeholder="Birthday"
                  className="pl-10"
                />
                <CalendarIcon className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5" />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="website">Website</Label>
              <div className="relative">
                <Input id="website" type="url" placeholder="Add your website" />
                <span className="absolute right-3 top-1/2 -translate-y-1/2 text-sm">
                  0/100
                </span>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
