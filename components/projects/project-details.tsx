import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Progress } from "@/components/ui/progress"
import { Edit, FileText, MessageSquare, MoreHorizontal, CheckCircle2, CircleDashed, AlertCircle } from "lucide-react"

export function ProjectDetails() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <h2 className="text-2xl font-bold">M-Pesa API Integration</h2>
            <Badge>Active</Badge>
          </div>
          <p className="text-muted-foreground">Integrate the Safaricom Daraja API for seamless M-Pesa transactions</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline">
            <Edit className="mr-2 h-4 w-4" />
            Edit
          </Button>
          <Button variant="outline">
            <MoreHorizontal className="h-4 w-4" />
          </Button>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Progress</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">75%</div>
            <Progress value={75} className="mt-2 h-2" />
            <div className="mt-2 text-xs text-muted-foreground">Last updated: May 10, 2025</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Timeline</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <div className="text-xs text-muted-foreground">Start Date</div>
                <div className="font-medium">Apr 1, 2025</div>
              </div>
              <div>
                <div className="text-xs text-muted-foreground">Due Date</div>
                <div className="font-medium">Jun 15, 2025</div>
              </div>
              <div>
                <div className="text-xs text-muted-foreground">Duration</div>
                <div className="font-medium">75 days</div>
              </div>
              <div>
                <div className="text-xs text-muted-foreground">Days Left</div>
                <div className="font-medium">32 days</div>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Team</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex -space-x-2">
              <Avatar className="border-2 border-background">
                <AvatarImage src="/placeholder.svg?height=32&width=32" alt="Faith Njeri" />
                <AvatarFallback>FN</AvatarFallback>
              </Avatar>
              <Avatar className="border-2 border-background">
                <AvatarImage src="/placeholder.svg?height=32&width=32" alt="John Kamau" />
                <AvatarFallback>JK</AvatarFallback>
              </Avatar>
              <Avatar className="border-2 border-background">
                <AvatarImage src="/placeholder.svg?height=32&width=32" alt="Lucy Wambui" />
                <AvatarFallback>LW</AvatarFallback>
              </Avatar>
              <Avatar className="border-2 border-background">
                <AvatarImage src="/placeholder.svg?height=32&width=32" alt="David Omondi" />
                <AvatarFallback>DO</AvatarFallback>
              </Avatar>
              <Avatar className="border-2 border-background">
                <AvatarImage src="/placeholder.svg?height=32&width=32" alt="Sarah Ochieng" />
                <AvatarFallback>SO</AvatarFallback>
              </Avatar>
            </div>
            <div className="mt-3 flex items-center justify-between">
              <div className="text-sm">5 team members</div>
              <Button variant="ghost" size="sm" className="h-8 px-2">
                Manage
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="overview" className="w-full">
        <TabsList className="grid w-full grid-cols-4 md:w-auto">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="tasks">Tasks</TabsTrigger>
          <TabsTrigger value="files">Files</TabsTrigger>
          <TabsTrigger value="discussions">Discussions</TabsTrigger>
        </TabsList>
        <TabsContent value="overview">
          <Card>
            <CardHeader>
              <CardTitle>Project Description</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p>
                This project aims to integrate the Safaricom Daraja API to enable seamless M-Pesa transactions within
                our financial dashboard. The integration will allow users to make payments, receive payments, and view
                transaction history directly from the dashboard.
              </p>
              <p>Key objectives include:</p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Implement secure API authentication with Safaricom</li>
                <li>Develop payment processing functionality</li>
                <li>Create transaction reconciliation system</li>
                <li>Build real-time notification system for transactions</li>
                <li>Design user-friendly payment interfaces</li>
                <li>Implement comprehensive error handling and logging</li>
              </ul>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="tasks">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle>Tasks</CardTitle>
                <CardDescription>Track and manage project tasks.</CardDescription>
              </div>
              <Button>Add Task</Button>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="rounded-lg border p-4">
                  <div className="flex items-start justify-between">
                    <div className="flex items-start gap-2">
                      <CheckCircle2 className="mt-0.5 h-5 w-5 text-green-500" />
                      <div>
                        <div className="font-medium">Set up Daraja API credentials</div>
                        <div className="text-sm text-muted-foreground">
                          Register app and obtain API keys from Safaricom
                        </div>
                        <div className="mt-2 flex items-center gap-2">
                          <Badge variant="outline" className="text-xs">
                            High Priority
                          </Badge>
                          <span className="text-xs text-muted-foreground">Completed on May 5, 2025</span>
                        </div>
                      </div>
                    </div>
                    <Button variant="ghost" size="icon" className="h-8 w-8">
                      <MoreHorizontal className="h-4 w-4" />
                    </Button>
                  </div>
                </div>

                <div className="rounded-lg border p-4">
                  <div className="flex items-start justify-between">
                    <div className="flex items-start gap-2">
                      <CheckCircle2 className="mt-0.5 h-5 w-5 text-green-500" />
                      <div>
                        <div className="font-medium">Implement OAuth authentication</div>
                        <div className="text-sm text-muted-foreground">
                          Create secure authentication flow with Daraja API
                        </div>
                        <div className="mt-2 flex items-center gap-2">
                          <Badge variant="outline" className="text-xs">
                            High Priority
                          </Badge>
                          <span className="text-xs text-muted-foreground">Completed on May 8, 2025</span>
                        </div>
                      </div>
                    </div>
                    <Button variant="ghost" size="icon" className="h-8 w-8">
                      <MoreHorizontal className="h-4 w-4" />
                    </Button>
                  </div>
                </div>

                <div className="rounded-lg border p-4">
                  <div className="flex items-start justify-between">
                    <div className="flex items-start gap-2">
                      <CircleDashed className="mt-0.5 h-5 w-5 text-blue-500" />
                      <div>
                        <div className="font-medium">Develop payment processing module</div>
                        <div className="text-sm text-muted-foreground">
                          Create core functionality for processing M-Pesa payments
                        </div>
                        <div className="mt-2 flex items-center gap-2">
                          <Badge variant="outline" className="text-xs">
                            High Priority
                          </Badge>
                          <span className="text-xs text-muted-foreground">In Progress - Due May 20, 2025</span>
                        </div>
                      </div>
                    </div>
                    <Button variant="ghost" size="icon" className="h-8 w-8">
                      <MoreHorizontal className="h-4 w-4" />
                    </Button>
                  </div>
                </div>

                <div className="rounded-lg border p-4">
                  <div className="flex items-start justify-between">
                    <div className="flex items-start gap-2">
                      <CircleDashed className="mt-0.5 h-5 w-5 text-blue-500" />
                      <div>
                        <div className="font-medium">Build transaction reconciliation system</div>
                        <div className="text-sm text-muted-foreground">
                          Create system to match M-Pesa transactions with internal records
                        </div>
                        <div className="mt-2 flex items-center gap-2">
                          <Badge variant="outline" className="text-xs">
                            Medium Priority
                          </Badge>
                          <span className="text-xs text-muted-foreground">In Progress - Due May 30, 2025</span>
                        </div>
                      </div>
                    </div>
                    <Button variant="ghost" size="icon" className="h-8 w-8">
                      <MoreHorizontal className="h-4 w-4" />
                    </Button>
                  </div>
                </div>

                <div className="rounded-lg border p-4">
                  <div className="flex items-start justify-between">
                    <div className="flex items-start gap-2">
                      <AlertCircle className="mt-0.5 h-5 w-5 text-muted-foreground" />
                      <div>
                        <div className="font-medium">Implement notification system</div>
                        <div className="text-sm text-muted-foreground">
                          Create real-time notifications for transaction events
                        </div>
                        <div className="mt-2 flex items-center gap-2">
                          <Badge variant="outline" className="text-xs">
                            Medium Priority
                          </Badge>
                          <span className="text-xs text-muted-foreground">Not Started - Due June 5, 2025</span>
                        </div>
                      </div>
                    </div>
                    <Button variant="ghost" size="icon" className="h-8 w-8">
                      <MoreHorizontal className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="files">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle>Files</CardTitle>
                <CardDescription>Project documentation and resources.</CardDescription>
              </div>
              <Button>Upload File</Button>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="rounded-lg border p-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <FileText className="h-8 w-8 text-blue-500" />
                      <div>
                        <div className="font-medium">Daraja API Documentation.pdf</div>
                        <div className="text-xs text-muted-foreground">2.4 MB • Uploaded on Apr 2, 2025</div>
                      </div>
                    </div>
                    <Button variant="ghost" size="sm">
                      Download
                    </Button>
                  </div>
                </div>

                <div className="rounded-lg border p-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <FileText className="h-8 w-8 text-green-500" />
                      <div>
                        <div className="font-medium">M-Pesa Integration Plan.xlsx</div>
                        <div className="text-xs text-muted-foreground">1.8 MB • Uploaded on Apr 5, 2025</div>
                      </div>
                    </div>
                    <Button variant="ghost" size="sm">
                      Download
                    </Button>
                  </div>
                </div>

                <div className="rounded-lg border p-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <FileText className="h-8 w-8 text-purple-500" />
                      <div>
                        <div className="font-medium">API Authentication Flow.drawio</div>
                        <div className="text-xs text-muted-foreground">0.5 MB • Uploaded on Apr 10, 2025</div>
                      </div>
                    </div>
                    <Button variant="ghost" size="sm">
                      Download
                    </Button>
                  </div>
                </div>

                <div className="rounded-lg border p-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <FileText className="h-8 w-8 text-red-500" />
                      <div>
                        <div className="font-medium">Payment Processing Module Design.pdf</div>
                        <div className="text-xs text-muted-foreground">3.2 MB • Uploaded on Apr 15, 2025</div>
                      </div>
                    </div>
                    <Button variant="ghost" size="sm">
                      Download
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="discussions">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle>Discussions</CardTitle>
                <CardDescription>Team communication and updates.</CardDescription>
              </div>
              <Button>New Thread</Button>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div className="space-y-4">
                  <div className="flex items-start gap-4">
                    <Avatar>
                      <AvatarImage src="/placeholder.svg?height=40&width=40" alt="Faith Njeri" />
                      <AvatarFallback>FN</AvatarFallback>
                    </Avatar>
                    <div className="space-y-2">
                      <div className="flex items-center gap-2">
                        <span className="font-medium">Faith Njeri</span>
                        <span className="text-xs text-muted-foreground">May 10, 2025 at 9:30 AM</span>
                      </div>
                      <div className="rounded-lg bg-muted p-4">
                        <p>
                          Team, I've completed the OAuth authentication implementation. The code is now in the
                          repository. Please review when you get a chance.
                        </p>
                      </div>
                      <div className="flex items-center gap-4">
                        <Button variant="ghost" size="sm" className="h-8 px-2">
                          <MessageSquare className="mr-2 h-4 w-4" />
                          Reply
                        </Button>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-start gap-4 pl-12">
                    <Avatar>
                      <AvatarImage src="/placeholder.svg?height=40&width=40" alt="John Kamau" />
                      <AvatarFallback>JK</AvatarFallback>
                    </Avatar>
                    <div className="space-y-2">
                      <div className="flex items-center gap-2">
                        <span className="font-medium">John Kamau</span>
                        <span className="text-xs text-muted-foreground">May 10, 2025 at 10:15 AM</span>
                      </div>
                      <div className="rounded-lg bg-muted p-4">
                        <p>Great work, Faith! I'll review the code today and provide feedback.</p>
                      </div>
                      <div className="flex items-center gap-4">
                        <Button variant="ghost" size="sm" className="h-8 px-2">
                          <MessageSquare className="mr-2 h-4 w-4" />
                          Reply
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="flex items-start gap-4">
                    <Avatar>
                      <AvatarImage src="/placeholder.svg?height=40&width=40" alt="Lucy Wambui" />
                      <AvatarFallback>LW</AvatarFallback>
                    </Avatar>
                    <div className="space-y-2">
                      <div className="flex items-center gap-2">
                        <span className="font-medium">Lucy Wambui</span>
                        <span className="text-xs text-muted-foreground">May 9, 2025 at 2:45 PM</span>
                      </div>
                      <div className="rounded-lg bg-muted p-4">
                        <p>
                          I've started working on the transaction reconciliation system. I'm encountering some issues
                          with the callback URL configuration. Has anyone dealt with this before?
                        </p>
                      </div>
                      <div className="flex items-center gap-4">
                        <Button variant="ghost" size="sm" className="h-8 px-2">
                          <MessageSquare className="mr-2 h-4 w-4" />
                          Reply
                        </Button>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-start gap-4 pl-12">
                    <Avatar>
                      <AvatarImage src="/placeholder.svg?height=40&width=40" alt="David Omondi" />
                      <AvatarFallback>DO</AvatarFallback>
                    </Avatar>
                    <div className="space-y-2">
                      <div className="flex items-center gap-2">
                        <span className="font-medium">David Omondi</span>
                        <span className="text-xs text-muted-foreground">May 9, 2025 at 3:20 PM</span>
                      </div>
                      <div className="rounded-lg bg-muted p-4">
                        <p>
                          Lucy, I had a similar issue. The callback URL needs to be publicly accessible. We can use
                          ngrok for testing. I'll send you the setup instructions.
                        </p>
                      </div>
                      <div className="flex items-center gap-4">
                        <Button variant="ghost" size="sm" className="h-8 px-2">
                          <MessageSquare className="mr-2 h-4 w-4" />
                          Reply
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
