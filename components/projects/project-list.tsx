import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Progress } from "@/components/ui/progress"
import { Calendar, MoreHorizontal, Users } from "lucide-react"

type ProjectStatus = "active" | "completed" | "archived"

interface Project {
  id: number
  name: string
  description: string
  status: ProjectStatus
  progress: number
  dueDate: string
  teamSize: number
  lead: {
    name: string
    avatar: string
  }
  tags: string[]
}

const projects: Project[] = [
  {
    id: 1,
    name: "M-Pesa API Integration",
    description: "Integrate the Safaricom Daraja API for seamless M-Pesa transactions",
    status: "active",
    progress: 75,
    dueDate: "June 15, 2025",
    teamSize: 5,
    lead: {
      name: "Faith Njeri",
      avatar: "/placeholder.svg?height=40&width=40",
    },
    tags: ["API", "M-Pesa", "Integration"],
  },
  {
    id: 2,
    name: "Financial Dashboard Redesign",
    description: "Redesign the financial dashboard for better user experience",
    status: "active",
    progress: 60,
    dueDate: "July 1, 2025",
    teamSize: 3,
    lead: {
      name: "John Kamau",
      avatar: "/placeholder.svg?height=40&width=40",
    },
    tags: ["UI/UX", "Dashboard", "Design"],
  },
  {
    id: 3,
    name: "Transaction Analytics Engine",
    description: "Build a robust analytics engine for transaction data",
    status: "active",
    progress: 40,
    dueDate: "August 10, 2025",
    teamSize: 4,
    lead: {
      name: "Lucy Wambui",
      avatar: "/placeholder.svg?height=40&width=40",
    },
    tags: ["Analytics", "Data", "Reporting"],
  },
  {
    id: 4,
    name: "Mobile App Development",
    description: "Develop a mobile app for the financial dashboard",
    status: "active",
    progress: 25,
    dueDate: "September 30, 2025",
    teamSize: 6,
    lead: {
      name: "David Omondi",
      avatar: "/placeholder.svg?height=40&width=40",
    },
    tags: ["Mobile", "App", "Development"],
  },
  {
    id: 5,
    name: "Security Audit & Compliance",
    description: "Conduct a comprehensive security audit and ensure compliance",
    status: "completed",
    progress: 100,
    dueDate: "April 30, 2025",
    teamSize: 3,
    lead: {
      name: "Sarah Ochieng",
      avatar: "/placeholder.svg?height=40&width=40",
    },
    tags: ["Security", "Compliance", "Audit"],
  },
  {
    id: 6,
    name: "Legacy System Migration",
    description: "Migrate data from legacy systems to the new platform",
    status: "completed",
    progress: 100,
    dueDate: "March 15, 2025",
    teamSize: 7,
    lead: {
      name: "Peter Kipchoge",
      avatar: "/placeholder.svg?height=40&width=40",
    },
    tags: ["Migration", "Legacy", "Data"],
  },
  {
    id: 7,
    name: "Customer Onboarding Workflow",
    description: "Streamline the customer onboarding process",
    status: "archived",
    progress: 100,
    dueDate: "January 20, 2025",
    teamSize: 4,
    lead: {
      name: "Mary Wanjiku",
      avatar: "/placeholder.svg?height=40&width=40",
    },
    tags: ["Onboarding", "Workflow", "Customer"],
  },
]

interface ProjectListProps {
  filter: "all" | "active" | "completed" | "archived"
}

export function ProjectList({ filter }: ProjectListProps) {
  const filteredProjects = filter === "all" ? projects : projects.filter((project) => project.status === filter)

  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
      {filteredProjects.map((project) => (
        <Card key={project.id} className="overflow-hidden">
          <CardContent className="p-0">
            <div className="p-6">
              <div className="flex items-start justify-between">
                <div className="space-y-1">
                  <h3 className="font-semibold">{project.name}</h3>
                  <p className="text-sm text-muted-foreground line-clamp-2">{project.description}</p>
                </div>
                <Button variant="ghost" size="icon" className="h-8 w-8">
                  <MoreHorizontal className="h-4 w-4" />
                </Button>
              </div>

              <div className="mt-4 flex flex-wrap gap-2">
                {project.tags.map((tag) => (
                  <Badge key={tag} variant="secondary" className="text-xs">
                    {tag}
                  </Badge>
                ))}
              </div>

              <div className="mt-6 space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">Progress</span>
                  <span className="font-medium">{project.progress}%</span>
                </div>
                <Progress value={project.progress} className="h-2" />
              </div>
            </div>

            <div className="border-t bg-muted/50 p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Avatar className="h-8 w-8">
                    <AvatarImage src={project.lead.avatar || "/placeholder.svg"} alt={project.lead.name} />
                    <AvatarFallback>{project.lead.name.charAt(0)}</AvatarFallback>
                  </Avatar>
                  <div className="text-sm font-medium">{project.lead.name}</div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="flex items-center text-sm text-muted-foreground">
                    <Users className="mr-1 h-4 w-4" />
                    {project.teamSize}
                  </div>
                  <div className="flex items-center text-sm text-muted-foreground">
                    <Calendar className="mr-1 h-4 w-4" />
                    {project.dueDate}
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
