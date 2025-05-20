"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Calendar } from "@/components/ui/calendar"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Plus, Video, Users, Clock, CalendarIcon, MapPin } from "lucide-react"

const meetings = [
  {
    id: 1,
    title: "M-Pesa Integration Planning",
    date: "May 15, 2025",
    time: "10:00 AM - 11:00 AM",
    location: "Conference Room A",
    attendees: [
      { name: "Faith Njeri", avatar: "/placeholder.svg?height=40&width=40" },
      { name: "John Kamau", avatar: "/placeholder.svg?height=40&width=40" },
      { name: "Lucy Wambui", avatar: "/placeholder.svg?height=40&width=40" },
      { name: "David Omondi", avatar: "/placeholder.svg?height=40&width=40" },
    ],
    status: "upcoming",
    description:
      "Planning session for the M-Pesa integration project. We'll discuss the project scope, timeline, and resource allocation.",
  },
  {
    id: 2,
    title: "Weekly Team Standup",
    date: "May 16, 2025",
    time: "9:00 AM - 9:30 AM",
    location: "Zoom Meeting",
    attendees: [
      { name: "Faith Njeri", avatar: "/placeholder.svg?height=40&width=40" },
      { name: "John Kamau", avatar: "/placeholder.svg?height=40&width=40" },
      { name: "Lucy Wambui", avatar: "/placeholder.svg?height=40&width=40" },
      { name: "David Omondi", avatar: "/placeholder.svg?height=40&width=40" },
      { name: "Sarah Ochieng", avatar: "/placeholder.svg?height=40&width=40" },
    ],
    status: "upcoming",
    description: "Weekly team standup to discuss progress, blockers, and upcoming tasks.",
  },
  {
    id: 3,
    title: "Client Demo: Financial Dashboard",
    date: "May 18, 2025",
    time: "2:00 PM - 3:00 PM",
    location: "Client Office",
    attendees: [
      { name: "John Kamau", avatar: "/placeholder.svg?height=40&width=40" },
      { name: "Lucy Wambui", avatar: "/placeholder.svg?height=40&width=40" },
      { name: "James Mwangi", avatar: "/placeholder.svg?height=40&width=40" },
    ],
    status: "upcoming",
    description:
      "Demonstration of the financial dashboard to the client. We'll showcase the key features and gather feedback.",
  },
  {
    id: 4,
    title: "API Integration Review",
    date: "May 10, 2025",
    time: "11:00 AM - 12:00 PM",
    location: "Conference Room B",
    attendees: [
      { name: "Faith Njeri", avatar: "/placeholder.svg?height=40&width=40" },
      { name: "David Omondi", avatar: "/placeholder.svg?height=40&width=40" },
    ],
    status: "completed",
    description:
      "Review of the API integration work. We'll discuss the implementation details and any issues encountered.",
  },
  {
    id: 5,
    title: "Project Kickoff: Mobile App",
    date: "May 5, 2025",
    time: "10:00 AM - 11:30 AM",
    location: "Conference Room A",
    attendees: [
      { name: "John Kamau", avatar: "/placeholder.svg?height=40&width=40" },
      { name: "Faith Njeri", avatar: "/placeholder.svg?height=40&width=40" },
      { name: "David Omondi", avatar: "/placeholder.svg?height=40&width=40" },
      { name: "Sarah Ochieng", avatar: "/placeholder.svg?height=40&width=40" },
    ],
    status: "completed",
    description:
      "Kickoff meeting for the mobile app project. We'll discuss the project goals, timeline, and team responsibilities.",
  },
]

export default function MeetingsPage() {
  const [date, setDate] = useState<Date | undefined>(new Date())
  const [selectedMeeting, setSelectedMeeting] = useState(null)

  const upcomingMeetings = meetings.filter((meeting) => meeting.status === "upcoming")
  const completedMeetings = meetings.filter((meeting) => meeting.status === "completed")

  return (
    <div className="flex flex-col space-y-6 p-6">
      <div className="flex items-center justify-between">
        <div className="space-y-1">
          <h1 className="text-3xl font-bold tracking-tight">Meetings</h1>
          <p className="text-muted-foreground">Schedule and manage your meetings and appointments.</p>
        </div>
        <Button>
          <Plus className="mr-2 h-4 w-4" />
          Schedule Meeting
        </Button>
      </div>

      <div className="grid gap-6 md:grid-cols-[1fr_300px]">
        <div className="space-y-6">
          <Tabs defaultValue="upcoming" className="w-full">
            <TabsList className="grid w-full grid-cols-2 md:w-auto">
              <TabsTrigger value="upcoming">Upcoming</TabsTrigger>
              <TabsTrigger value="completed">Completed</TabsTrigger>
            </TabsList>
            <TabsContent value="upcoming" className="space-y-4">
              {upcomingMeetings.map((meeting) => (
                <Card
                  key={meeting.id}
                  className="cursor-pointer hover:bg-accent/50"
                  onClick={() => setSelectedMeeting(meeting)}
                >
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between">
                      <div className="space-y-1">
                        <h3 className="font-semibold">{meeting.title}</h3>
                        <div className="flex items-center text-sm text-muted-foreground">
                          <CalendarIcon className="mr-1 h-4 w-4" />
                          {meeting.date}
                        </div>
                        <div className="flex items-center text-sm text-muted-foreground">
                          <Clock className="mr-1 h-4 w-4" />
                          {meeting.time}
                        </div>
                        <div className="flex items-center text-sm text-muted-foreground">
                          <MapPin className="mr-1 h-4 w-4" />
                          {meeting.location}
                        </div>
                      </div>
                      <div className="flex flex-col items-end gap-2">
                        <Badge>Upcoming</Badge>
                        <div className="flex -space-x-2">
                          {meeting.attendees.slice(0, 3).map((attendee, index) => (
                            <Avatar key={index} className="border-2 border-background">
                              <AvatarImage src={attendee.avatar || "/placeholder.svg"} alt={attendee.name} />
                              <AvatarFallback>{attendee.name.charAt(0)}</AvatarFallback>
                            </Avatar>
                          ))}
                          {meeting.attendees.length > 3 && (
                            <div className="flex items-center justify-center w-8 h-8 rounded-full bg-muted text-xs font-medium">
                              +{meeting.attendees.length - 3}
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </TabsContent>
            <TabsContent value="completed" className="space-y-4">
              {completedMeetings.map((meeting) => (
                <Card
                  key={meeting.id}
                  className="cursor-pointer hover:bg-accent/50"
                  onClick={() => setSelectedMeeting(meeting)}
                >
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between">
                      <div className="space-y-1">
                        <h3 className="font-semibold">{meeting.title}</h3>
                        <div className="flex items-center text-sm text-muted-foreground">
                          <CalendarIcon className="mr-1 h-4 w-4" />
                          {meeting.date}
                        </div>
                        <div className="flex items-center text-sm text-muted-foreground">
                          <Clock className="mr-1 h-4 w-4" />
                          {meeting.time}
                        </div>
                        <div className="flex items-center text-sm text-muted-foreground">
                          <MapPin className="mr-1 h-4 w-4" />
                          {meeting.location}
                        </div>
                      </div>
                      <div className="flex flex-col items-end gap-2">
                        <Badge variant="secondary">Completed</Badge>
                        <div className="flex -space-x-2">
                          {meeting.attendees.slice(0, 3).map((attendee, index) => (
                            <Avatar key={index} className="border-2 border-background">
                              <AvatarImage src={attendee.avatar || "/placeholder.svg"} alt={attendee.name} />
                              <AvatarFallback>{attendee.name.charAt(0)}</AvatarFallback>
                            </Avatar>
                          ))}
                          {meeting.attendees.length > 3 && (
                            <div className="flex items-center justify-center w-8 h-8 rounded-full bg-muted text-xs font-medium">
                              +{meeting.attendees.length - 3}
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </TabsContent>
          </Tabs>
        </div>

        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Calendar</CardTitle>
              <CardDescription>View and manage your schedule.</CardDescription>
            </CardHeader>
            <CardContent>
              <Calendar mode="single" selected={date} onSelect={setDate} className="rounded-md border" />
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Quick Actions</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <Button className="w-full justify-start" variant="outline">
                <Plus className="mr-2 h-4 w-4" />
                New Meeting
              </Button>
              <Button className="w-full justify-start" variant="outline">
                <Video className="mr-2 h-4 w-4" />
                Start Video Call
              </Button>
              <Button className="w-full justify-start" variant="outline">
                <Users className="mr-2 h-4 w-4" />
                Invite Team Members
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>

      {selectedMeeting && (
        <Dialog open={!!selectedMeeting} onOpenChange={() => setSelectedMeeting(null)}>
          <DialogContent className="sm:max-w-[600px]">
            <DialogHeader>
              <DialogTitle>{selectedMeeting.title}</DialogTitle>
              <DialogDescription>Meeting details and information</DialogDescription>
            </DialogHeader>
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                  <div className="text-sm font-medium">Date</div>
                  <div className="flex items-center text-sm">
                    <CalendarIcon className="mr-1 h-4 w-4 text-muted-foreground" />
                    {selectedMeeting.date}
                  </div>
                </div>
                <div className="space-y-1">
                  <div className="text-sm font-medium">Time</div>
                  <div className="flex items-center text-sm">
                    <Clock className="mr-1 h-4 w-4 text-muted-foreground" />
                    {selectedMeeting.time}
                  </div>
                </div>
                <div className="space-y-1">
                  <div className="text-sm font-medium">Location</div>
                  <div className="flex items-center text-sm">
                    <MapPin className="mr-1 h-4 w-4 text-muted-foreground" />
                    {selectedMeeting.location}
                  </div>
                </div>
                <div className="space-y-1">
                  <div className="text-sm font-medium">Status</div>
                  <Badge variant={selectedMeeting.status === "upcoming" ? "default" : "secondary"}>
                    {selectedMeeting.status === "upcoming" ? "Upcoming" : "Completed"}
                  </Badge>
                </div>
              </div>

              <div className="space-y-2">
                <div className="text-sm font-medium">Description</div>
                <p className="text-sm">{selectedMeeting.description}</p>
              </div>

              <div className="space-y-2">
                <div className="text-sm font-medium">Attendees ({selectedMeeting.attendees.length})</div>
                <div className="flex flex-wrap gap-2">
                  {selectedMeeting.attendees.map((attendee, index) => (
                    <div key={index} className="flex items-center gap-2 rounded-full bg-muted px-3 py-1">
                      <Avatar className="h-6 w-6">
                        <AvatarImage src={attendee.avatar || "/placeholder.svg"} alt={attendee.name} />
                        <AvatarFallback>{attendee.name.charAt(0)}</AvatarFallback>
                      </Avatar>
                      <span className="text-xs">{attendee.name}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex justify-end gap-2">
                {selectedMeeting.status === "upcoming" && (
                  <>
                    <Button variant="outline">Edit Meeting</Button>
                    <Button>Join Meeting</Button>
                  </>
                )}
                {selectedMeeting.status === "completed" && <Button variant="outline">View Notes</Button>}
              </div>
            </div>
          </DialogContent>
        </Dialog>
      )}
    </div>
  )
}
