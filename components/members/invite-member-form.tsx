"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { Checkbox } from "@/components/ui/checkbox"
import { Separator } from "@/components/ui/separator"
import { UserPlus, Send } from "lucide-react"

export default function InviteMemberForm({ departments, roles, onInvite }) {
  const [inviteType, setInviteType] = useState("email")
  const [selectedRole, setSelectedRole] = useState("")
  const [selectedDepartment, setSelectedDepartment] = useState("")
  const [emails, setEmails] = useState("")
  const [message, setMessage] = useState(
    "I'd like to invite you to join our organization on the Financial Dashboard platform.",
  )
  const [sendCopy, setSendCopy] = useState(false)

  const handleSubmit = (e) => {
    e.preventDefault()
    // Process invitation
    console.log("Inviting members:", { inviteType, emails, selectedRole, selectedDepartment, message, sendCopy })
    onInvite()
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="invite-type">Invite Method</Label>
          <div className="flex gap-4">
            <div className="flex items-center space-x-2">
              <Checkbox
                id="invite-email"
                checked={inviteType === "email"}
                onCheckedChange={() => setInviteType("email")}
              />
              <Label htmlFor="invite-email" className="cursor-pointer">
                Email
              </Label>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox
                id="invite-link"
                checked={inviteType === "link"}
                onCheckedChange={() => setInviteType("link")}
              />
              <Label htmlFor="invite-link" className="cursor-pointer">
                Invite Link
              </Label>
            </div>
          </div>
        </div>

        {inviteType === "email" && (
          <div className="space-y-2">
            <Label htmlFor="emails">Email Addresses</Label>
            <Textarea
              id="emails"
              placeholder="Enter email addresses (one per line)"
              className="min-h-[80px]"
              value={emails}
              onChange={(e) => setEmails(e.target.value)}
            />
            <p className="text-xs text-muted-foreground">Enter multiple email addresses separated by line breaks.</p>
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="role">Role</Label>
            <Select value={selectedRole} onValueChange={setSelectedRole}>
              <SelectTrigger id="role">
                <SelectValue placeholder="Select role" />
              </SelectTrigger>
              <SelectContent>
                {roles.map((role) => (
                  <SelectItem key={role} value={role}>
                    {role}
                  </SelectItem>
                ))}
                <SelectItem value="custom">Custom Role</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="department">Department</Label>
            <Select value={selectedDepartment} onValueChange={setSelectedDepartment}>
              <SelectTrigger id="department">
                <SelectValue placeholder="Select department" />
              </SelectTrigger>
              <SelectContent>
                {departments.map((dept) => (
                  <SelectItem key={dept} value={dept}>
                    {dept}
                  </SelectItem>
                ))}
                <SelectItem value="new">New Department</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="message">Invitation Message</Label>
          <Textarea
            id="message"
            placeholder="Enter a personal message (optional)"
            className="min-h-[100px]"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          />
        </div>

        <div className="flex items-center space-x-2">
          <Checkbox id="send-copy" checked={sendCopy} onCheckedChange={setSendCopy} />
          <Label htmlFor="send-copy">Send me a copy of the invitation</Label>
        </div>
      </div>

      <Separator />

      {inviteType === "link" ? (
        <div className="space-y-4">
          <div className="space-y-2">
            <Label>Invite Link</Label>
            <div className="flex gap-2">
              <Input readOnly value="https://acmefinancial.co.ke/invite/team?code=ABC123XYZ" className="flex-1" />
              <Button variant="outline" type="button">
                Copy
              </Button>
            </div>
            <p className="text-xs text-muted-foreground">
              This link expires in 7 days. Anyone with this link can join your organization with the selected role.
            </p>
          </div>
          <Button className="w-full" type="button">
            <UserPlus className="mr-2 h-4 w-4" />
            Generate New Link
          </Button>
        </div>
      ) : (
        <Button className="w-full" type="submit">
          <Send className="mr-2 h-4 w-4" />
          Send Invitation
        </Button>
      )}
    </form>
  )
}
