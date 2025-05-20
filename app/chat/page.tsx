"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Search, Plus, Send, Paperclip, MoreHorizontal, Phone, Video } from "lucide-react"

const contacts = [
  {
    id: 1,
    name: "Faith Njeri",
    avatar: "/placeholder.svg?height=40&width=40",
    status: "online",
    lastMessage: "Can you review the M-Pesa integration PR?",
    time: "10:30 AM",
    unread: 2,
  },
  {
    id: 2,
    name: "John Kamau",
    avatar: "/placeholder.svg?height=40&width=40",
    status: "online",
    lastMessage: "Meeting at 2 PM to discuss the project timeline",
    time: "9:45 AM",
    unread: 0,
  },
  {
    id: 3,
    name: "Lucy Wambui",
    avatar: "/placeholder.svg?height=40&width=40",
    status: "offline",
    lastMessage: "I've sent you the financial report",
    time: "Yesterday",
    unread: 0,
  },
  {
    id: 4,
    name: "David Omondi",
    avatar: "/placeholder.svg?height=40&width=40",
    status: "online",
    lastMessage: "The UI designs are ready for review",
    time: "Yesterday",
    unread: 0,
  },
  {
    id: 5,
    name: "Sarah Ochieng",
    avatar: "/placeholder.svg?height=40&width=40",
    status: "offline",
    lastMessage: "Let's discuss the customer feedback tomorrow",
    time: "Monday",
    unread: 0,
  },
]

const messages = [
  {
    id: 1,
    sender: "Faith Njeri",
    content: "Hi there! Can you review the M-Pesa integration PR?",
    time: "10:30 AM",
    isMe: false,
  },
  {
    id: 2,
    sender: "Me",
    content: "Sure, I'll take a look at it. Is there anything specific I should focus on?",
    time: "10:32 AM",
    isMe: true,
  },
  {
    id: 3,
    sender: "Faith Njeri",
    content: "Yes, please check the authentication flow and the transaction processing logic.",
    time: "10:35 AM",
    isMe: false,
  },
  {
    id: 4,
    sender: "Faith Njeri",
    content: "I'm particularly concerned about the error handling in the callback function.",
    time: "10:36 AM",
    isMe: false,
  },
  {
    id: 5,
    sender: "Me",
    content: "Got it. I'll review those sections carefully and provide feedback.",
    time: "10:40 AM",
    isMe: true,
  },
]

export default function ChatPage() {
  const [selectedContact, setSelectedContact] = useState(contacts[0])
  const [messageInput, setMessageInput] = useState("")

  const handleSendMessage = () => {
    if (messageInput.trim()) {
      // In a real app, you would send the message to your backend
      console.log("Sending message:", messageInput)
      setMessageInput("")
    }
  }

  return (
    <div className="flex h-[calc(100vh-4rem)] overflow-hidden">
      {/* Sidebar */}
      <div className="w-80 border-r flex flex-col">
        <div className="p-4 border-b">
          <div className="relative">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input placeholder="Search conversations..." className="pl-8" />
          </div>
        </div>
        <Tabs defaultValue="all" className="flex-1 flex flex-col">
          <div className="px-4 pt-4">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="all">All</TabsTrigger>
              <TabsTrigger value="unread">Unread</TabsTrigger>
              <TabsTrigger value="groups">Groups</TabsTrigger>
            </TabsList>
          </div>
          <TabsContent value="all" className="flex-1 overflow-auto p-0">
            <div className="space-y-1 p-2">
              {contacts.map((contact) => (
                <div
                  key={contact.id}
                  className={`flex items-center gap-3 rounded-lg p-2 cursor-pointer hover:bg-accent ${
                    selectedContact.id === contact.id ? "bg-accent" : ""
                  }`}
                  onClick={() => setSelectedContact(contact)}
                >
                  <div className="relative">
                    <Avatar>
                      <AvatarImage src={contact.avatar || "/placeholder.svg"} alt={contact.name} />
                      <AvatarFallback>{contact.name.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <div
                      className={`absolute bottom-0 right-0 h-3 w-3 rounded-full border-2 border-background ${
                        contact.status === "online" ? "bg-green-500" : "bg-gray-400"
                      }`}
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                      <div className="font-medium">{contact.name}</div>
                      <div className="text-xs text-muted-foreground">{contact.time}</div>
                    </div>
                    <div className="text-sm truncate text-muted-foreground">{contact.lastMessage}</div>
                  </div>
                  {contact.unread > 0 && <Badge className="ml-auto">{contact.unread}</Badge>}
                </div>
              ))}
            </div>
          </TabsContent>
          <TabsContent value="unread" className="flex-1 overflow-auto p-0">
            <div className="space-y-1 p-2">
              {contacts
                .filter((c) => c.unread > 0)
                .map((contact) => (
                  <div
                    key={contact.id}
                    className={`flex items-center gap-3 rounded-lg p-2 cursor-pointer hover:bg-accent ${
                      selectedContact.id === contact.id ? "bg-accent" : ""
                    }`}
                    onClick={() => setSelectedContact(contact)}
                  >
                    <div className="relative">
                      <Avatar>
                        <AvatarImage src={contact.avatar || "/placeholder.svg"} alt={contact.name} />
                        <AvatarFallback>{contact.name.charAt(0)}</AvatarFallback>
                      </Avatar>
                      <div
                        className={`absolute bottom-0 right-0 h-3 w-3 rounded-full border-2 border-background ${
                          contact.status === "online" ? "bg-green-500" : "bg-gray-400"
                        }`}
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between">
                        <div className="font-medium">{contact.name}</div>
                        <div className="text-xs text-muted-foreground">{contact.time}</div>
                      </div>
                      <div className="text-sm truncate text-muted-foreground">{contact.lastMessage}</div>
                    </div>
                    {contact.unread > 0 && <Badge className="ml-auto">{contact.unread}</Badge>}
                  </div>
                ))}
            </div>
          </TabsContent>
          <TabsContent value="groups" className="flex-1 overflow-auto p-0">
            <div className="p-8 text-center">
              <p className="text-muted-foreground">No group conversations yet</p>
              <Button className="mt-4">
                <Plus className="mr-2 h-4 w-4" />
                Create Group
              </Button>
            </div>
          </TabsContent>
        </Tabs>
      </div>

      {/* Chat Area */}
      <div className="flex-1 flex flex-col">
        {/* Chat Header */}
        <div className="flex items-center justify-between p-4 border-b">
          <div className="flex items-center gap-3">
            <Avatar>
              <AvatarImage src={selectedContact.avatar || "/placeholder.svg"} alt={selectedContact.name} />
              <AvatarFallback>{selectedContact.name.charAt(0)}</AvatarFallback>
            </Avatar>
            <div>
              <div className="font-medium">{selectedContact.name}</div>
              <div className="text-xs text-muted-foreground">
                {selectedContact.status === "online" ? "Online" : "Offline"}
              </div>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="icon">
              <Phone className="h-5 w-5" />
            </Button>
            <Button variant="ghost" size="icon">
              <Video className="h-5 w-5" />
            </Button>
            <Button variant="ghost" size="icon">
              <MoreHorizontal className="h-5 w-5" />
            </Button>
          </div>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-auto p-4 space-y-4">
          {messages.map((message) => (
            <div key={message.id} className={`flex ${message.isMe ? "justify-end" : "justify-start"}`}>
              <div
                className={`max-w-[70%] rounded-lg p-3 ${
                  message.isMe ? "bg-primary text-primary-foreground" : "bg-muted"
                }`}
              >
                <div className="text-sm">{message.content}</div>
                <div
                  className={`text-xs mt-1 ${message.isMe ? "text-primary-foreground/70" : "text-muted-foreground"}`}
                >
                  {message.time}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Message Input */}
        <div className="p-4 border-t">
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="icon">
              <Paperclip className="h-5 w-5" />
            </Button>
            <Input
              placeholder="Type a message..."
              value={messageInput}
              onChange={(e) => setMessageInput(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  handleSendMessage()
                }
              }}
            />
            <Button size="icon" onClick={handleSendMessage}>
              <Send className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
