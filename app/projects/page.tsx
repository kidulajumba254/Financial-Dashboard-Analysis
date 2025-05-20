"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Plus, CheckCircle2, AlertCircle, Clock3, ArrowUpRight } from "lucide-react"
import { ProjectList } from "@/components/projects/project-list"

// Sample project data
const initialProjects = [
  {
    id: 1,
    name: "M-Pesa Integration",
    description: "Integrate M-Pesa payment gateway into our financial dashboard",
    status: "in-progress",
    progress: 65,
    dueDate: "2023-10-15",
    budget: 500000,
    client: {
      name: "Safaricom",
      logo: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/9334178.jpg-Y74tW6XFO68g7N36SE5MSNDNVKLQ08.jpeg",
    },
    team: [
      {
        id: 1,
        name: "John Doe",
        avatar:
          "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/9720029.jpg-Yf9h2a3kT7rYyCb648iLIeHThq5wEy.jpeg",
      },
      {
        id: 2,
        name: "Jane Smith",
        avatar: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/799.jpg-0tEi4Xvg5YsFoGoQfQc698q4Dygl1S.jpeg",
      },
      {
        id: 3,
        name: "Alice Johnson",
        avatar: null,
      },
    ],
  },
  {
    id: 2,
    name: "Financial Reporting Dashboard",
    description: "Create a comprehensive financial reporting dashboard for executives",
    status: "completed",
    progress: 100,
    dueDate: "2023-08-30",
    budget: 750000,
    client: {
      name: "Kenya Commercial Bank",
      logo: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/5295.jpg-fLw0wGGZp8wuTzU5dnyfjZDwAHN98a.jpeg",
    },
    team: [
      {
        id: 1,
        name: "John Doe",
        avatar:
          "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/9720029.jpg-Yf9h2a3kT7rYyCb648iLIeHThq5wEy.jpeg",
      },
      {
        id: 4,
        name: "Bob Williams",
        avatar:
          "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/9334228.jpg-eOsHCkvVrVAwcPHKYSs5sQwVKsqWpC.jpeg",
      },
    ],
  },
  {
    id: 3,
    name: "Budget Tracking System",
    description: "Develop a system for tracking and managing departmental budgets",
    status: "planning",
    progress: 15,
    dueDate: "2023-11-30",
    budget: 350000,
    client: {
      name: "Ministry of Finance",
      logo: null,
    },
    team: [
      {
        id: 2,
        name: "Jane Smith",
        avatar: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/799.jpg-0tEi4Xvg5YsFoGoQfQc698q4Dygl1S.jpeg",
      },
      {
        id: 5,
        name: "Charlie Brown",
        avatar: null,
      },
    ],
  },
  {
    id: 4,
    name: "Mobile Banking App",
    description: "Design and develop a mobile banking application with advanced security features",
    status: "in-progress",
    progress: 40,
    dueDate: "2023-12-15",
    budget: 1200000,
    client: {
      name: "Equity Bank",
      logo: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/375238645_11475210.jpg-lU8bOe6TLt5Rv51hgjg8NT8PsDBmvN.jpeg",
    },
    team: [
      {
        id: 1,
        name: "John Doe",
        avatar:
          "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/9720029.jpg-Yf9h2a3kT7rYyCb648iLIeHThq5wEy.jpeg",
      },
      {
        id: 3,
        name: "Alice Johnson",
        avatar: null,
      },
      {
        id: 4,
        name: "Bob Williams",
        avatar:
          "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/9334228.jpg-eOsHCkvVrVAwcPHKYSs5sQwVKsqWpC.jpeg",
      },
    ],
  },
  {
    id: 5,
    name: "Financial Literacy Portal",
    description: "Create an educational portal for financial literacy and investment education",
    status: "planning",
    progress: 5,
    dueDate: "2024-01-31",
    budget: 600000,
    client: {
      name: "Central Bank of Kenya",
      logo: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/375238208_11475222.jpg-poEIzVHAGiIfMFQ7EiF8PUG1u0Zkzz.jpeg",
    },
    team: [
      {
        id: 2,
        name: "Jane Smith",
        avatar: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/799.jpg-0tEi4Xvg5YsFoGoQfQc698q4Dygl1S.jpeg",
      },
      {
        id: 5,
        name: "Charlie Brown",
        avatar: null,
      },
    ],
  },
]

const statusIcons = {
  planning: <Clock3 className="h-4 w-4" />,
  "in-progress": <ArrowUpRight className="h-4 w-4" />,
  completed: <CheckCircle2 className="h-4 w-4" />,
  "on-hold": <AlertCircle className="h-4 w-4" />,
}

const statusColors = {
  planning: "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300",
  "in-progress": "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300",
  completed: "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300",
  "on-hold": "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300",
}

const statusLabels = {
  planning: "Planning",
  "in-progress": "In Progress",
  completed: "Completed",
  "on-hold": "On Hold",
}

export default function ProjectsPage() {
  const [projects, setProjects] = useState(initialProjects)
  const [activeTab, setActiveTab] = useState("all")
  const [searchQuery, setSearchQuery] = useState("")
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false)
  const [newProject, setNewProject] = useState({
    name: "",
    description: "",
    status: "planning",
    dueDate: "",
    budget: "",
    client: "",
  })

  const handleCreateProject = () => {
    // In a real app, you would save the project to your backend
    const project = {
      id: projects.length + 1,
      ...newProject,
      progress: 0,
      budget: Number.parseFloat(newProject.budget) || 0,
      client: {
        name: newProject.client,
        logo: null,
      },
      team: [],
    }
    setProjects([...projects, project])
    setIsCreateDialogOpen(false)
    setNewProject({
      name: "",
      description: "",
      status: "planning",
      dueDate: "",
      budget: "",
      client: "",
    })
  }

  const filteredProjects = projects.filter((project) => {
    // Filter by tab
    if (activeTab !== "all" && project.status !== activeTab) {
      return false
    }

    // Filter by search query
    if (searchQuery && !project.name.toLowerCase().includes(searchQuery.toLowerCase())) {
      return false
    }

    return true
  })

  const getInitials = (name) => {
    return name
      .split(" ")
      .map((part) => part[0])
      .join("")
      .toUpperCase()
  }

  return (
    <div className="flex flex-col space-y-6 p-6">
      <div className="flex items-center justify-between">
        <div className="space-y-1">
          <h1 className="text-3xl font-bold tracking-tight">Projects</h1>
          <p className="text-muted-foreground">Manage your financial projects and initiatives.</p>
        </div>
        <Button>
          <Plus className="mr-2 h-4 w-4" />
          New Project
        </Button>
      </div>

      <Card className="mb-6">
        <CardHeader>
          <CardTitle>Project Overview</CardTitle>
          <CardDescription>Track the status and progress of all your financial projects.</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-3">
            <div className="rounded-lg border p-4">
              <div className="text-sm font-medium text-muted-foreground">Active Projects</div>
              <div className="mt-2 text-3xl font-bold">12</div>
            </div>
            <div className="rounded-lg border p-4">
              <div className="text-sm font-medium text-muted-foreground">Completed This Month</div>
              <div className="mt-2 text-3xl font-bold">4</div>
            </div>
            <div className="rounded-lg border p-4">
              <div className="text-sm font-medium text-muted-foreground">Team Members Involved</div>
              <div className="mt-2 text-3xl font-bold">28</div>
            </div>
          </div>
        </CardContent>
      </Card>

      <Tabs defaultValue="all" className="w-full">
        <TabsList className="grid w-full grid-cols-4 md:w-auto">
          <TabsTrigger value="all">All Projects</TabsTrigger>
          <TabsTrigger value="active">Active</TabsTrigger>
          <TabsTrigger value="completed">Completed</TabsTrigger>
          <TabsTrigger value="archived">Archived</TabsTrigger>
        </TabsList>
        <TabsContent value="all">
          <ProjectList filter="all" />
        </TabsContent>
        <TabsContent value="active">
          <ProjectList filter="active" />
        </TabsContent>
        <TabsContent value="completed">
          <ProjectList filter="completed" />
        </TabsContent>
        <TabsContent value="archived">
          <ProjectList filter="archived" />
        </TabsContent>
      </Tabs>
    </div>
  )
}
