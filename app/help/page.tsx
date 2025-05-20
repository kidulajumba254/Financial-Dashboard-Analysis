import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Badge } from "@/components/ui/badge"
import { Search, FileText, MessageSquare, Phone, Mail, HelpCircle, BookOpen, Video } from "lucide-react"

const faqs = [
  {
    question: "How do I integrate M-Pesa with my account?",
    answer:
      "To integrate M-Pesa with your account, navigate to Settings > Integrations > M-Pesa. Click on 'Connect M-Pesa' and follow the instructions to link your M-Pesa account. You'll need your M-Pesa phone number and will receive an authentication code via SMS to complete the setup.",
    category: "M-Pesa",
  },
  {
    question: "What are the transaction fees for M-Pesa payments?",
    answer:
      "Transaction fees for M-Pesa payments vary based on your account tier. Basic accounts have a 1.5% fee per transaction, while Premium accounts have a 1% fee. Enterprise accounts have custom fee structures. You can view the detailed fee schedule in Settings > Billing > Fee Schedule.",
    category: "M-Pesa",
  },
  {
    question: "How do I generate financial reports?",
    answer:
      "To generate financial reports, go to the Analytics page and click on 'Reports'. Select the type of report you want to generate, specify the date range, and choose the data points you want to include. Click 'Generate Report' to create the report, which can be downloaded in PDF, Excel, or CSV format.",
    category: "Reports",
  },
  {
    question: "Can I schedule recurring payments?",
    answer:
      "Yes, you can schedule recurring payments. Navigate to the Payments page and click on 'Scheduled'. Click 'New Schedule', select the payment details, frequency (daily, weekly, monthly), and duration. You can edit or cancel scheduled payments at any time before they process.",
    category: "Payments",
  },
  {
    question: "How do I invite team members to my organization?",
    answer:
      "To invite team members, go to the Members page and click 'Invite Member'. Enter the email address of the person you want to invite, select their role and permissions, and click 'Send Invitation'. The invitee will receive an email with instructions to join your organization.",
    category: "Organization",
  },
  {
    question: "What security measures are in place to protect my data?",
    answer:
      "We implement multiple layers of security to protect your data, including end-to-end encryption, two-factor authentication, regular security audits, and compliance with industry standards. All financial transactions are processed through secure channels, and we never store sensitive payment information like M-Pesa PINs.",
    category: "Security",
  },
  {
    question: "How do I create and manage invoices?",
    answer:
      "To create invoices, navigate to the Invoices page and click 'New Invoice'. Fill in the client details, add line items, set payment terms, and click 'Create'. You can manage existing invoices by viewing, editing, or marking them as paid. You can also set up automatic reminders for overdue invoices.",
    category: "Invoices",
  },
  {
    question: "Can I export my transaction history?",
    answer:
      "Yes, you can export your transaction history. Go to the Transactions page, apply any filters you want (date range, transaction type, etc.), and click 'Export'. You can choose to export in CSV, Excel, or PDF format. The export will include all transactions that match your filter criteria.",
    category: "Transactions",
  },
]

const resources = [
  {
    title: "Getting Started Guide",
    description: "Learn the basics of using the financial dashboard",
    icon: BookOpen,
    type: "Guide",
  },
  {
    title: "M-Pesa Integration Tutorial",
    description: "Step-by-step guide to integrating M-Pesa",
    icon: Video,
    type: "Video",
  },
  {
    title: "Financial Reporting Best Practices",
    description: "Tips for effective financial reporting",
    icon: FileText,
    type: "Article",
  },
  {
    title: "Security Guidelines",
    description: "How to keep your financial data secure",
    icon: HelpCircle,
    type: "Guide",
  },
  {
    title: "API Documentation",
    description: "Technical documentation for developers",
    icon: FileText,
    type: "Documentation",
  },
  {
    title: "Mobile App Tutorial",
    description: "How to use the mobile app effectively",
    icon: Video,
    type: "Video",
  },
]

export default function HelpPage() {
  return (
    <div className="flex flex-col space-y-6 p-6">
      <div className="space-y-1">
        <h1 className="text-3xl font-bold tracking-tight">Help & Support</h1>
        <p className="text-muted-foreground">
          Find answers to common questions and get support for your financial dashboard.
        </p>
      </div>

      <div className="relative">
        <Search className="absolute left-3 top-3 h-5 w-5 text-muted-foreground" />
        <Input placeholder="Search for help articles, FAQs, or topics..." className="pl-10 py-6 text-lg" />
      </div>

      <Tabs defaultValue="faq" className="w-full">
        <TabsList className="grid w-full grid-cols-3 md:w-auto">
          <TabsTrigger value="faq">FAQs</TabsTrigger>
          <TabsTrigger value="resources">Resources</TabsTrigger>
          <TabsTrigger value="contact">Contact Support</TabsTrigger>
        </TabsList>
        <TabsContent value="faq">
          <Card>
            <CardHeader>
              <CardTitle>Frequently Asked Questions</CardTitle>
              <CardDescription>Find answers to common questions about the financial dashboard.</CardDescription>
            </CardHeader>
            <CardContent>
              <Accordion type="single" collapsible className="w-full">
                {faqs.map((faq, index) => (
                  <AccordionItem key={index} value={`item-${index}`}>
                    <AccordionTrigger className="text-left">
                      <div className="flex items-center gap-2">
                        {faq.question}
                        <Badge variant="outline">{faq.category}</Badge>
                      </div>
                    </AccordionTrigger>
                    <AccordionContent>
                      <p className="text-muted-foreground">{faq.answer}</p>
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="resources">
          <Card>
            <CardHeader>
              <CardTitle>Help Resources</CardTitle>
              <CardDescription>
                Guides, tutorials, and documentation to help you get the most out of the financial dashboard.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                {resources.map((resource, index) => (
                  <Card key={index} className="cursor-pointer hover:bg-accent/50">
                    <CardContent className="p-6">
                      <div className="flex items-start gap-4">
                        <div className="rounded-full bg-primary/10 p-2">
                          <resource.icon className="h-5 w-5 text-primary" />
                        </div>
                        <div className="space-y-1">
                          <h3 className="font-medium">{resource.title}</h3>
                          <p className="text-sm text-muted-foreground">{resource.description}</p>
                          <Badge variant="outline" className="mt-2">
                            {resource.type}
                          </Badge>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="contact">
          <Card>
            <CardHeader>
              <CardTitle>Contact Support</CardTitle>
              <CardDescription>Get in touch with our support team for personalized assistance.</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-6 md:grid-cols-3">
                <Card>
                  <CardContent className="p-6 flex flex-col items-center text-center">
                    <div className="rounded-full bg-primary/10 p-4 mb-4">
                      <MessageSquare className="h-6 w-6 text-primary" />
                    </div>
                    <h3 className="font-medium mb-2">Live Chat</h3>
                    <p className="text-sm text-muted-foreground mb-4">Chat with our support team in real-time.</p>
                    <Button className="w-full">Start Chat</Button>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="p-6 flex flex-col items-center text-center">
                    <div className="rounded-full bg-primary/10 p-4 mb-4">
                      <Mail className="h-6 w-6 text-primary" />
                    </div>
                    <h3 className="font-medium mb-2">Email Support</h3>
                    <p className="text-sm text-muted-foreground mb-4">
                      Send us an email and we'll respond within 24 hours.
                    </p>
                    <Button variant="outline" className="w-full">
                      Send Email
                    </Button>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="p-6 flex flex-col items-center text-center">
                    <div className="rounded-full bg-primary/10 p-4 mb-4">
                      <Phone className="h-6 w-6 text-primary" />
                    </div>
                    <h3 className="font-medium mb-2">Phone Support</h3>
                    <p className="text-sm text-muted-foreground mb-4">Call us directly for urgent assistance.</p>
                    <Button variant="outline" className="w-full">
                      Call Support
                    </Button>
                  </CardContent>
                </Card>
              </div>

              <div className="mt-8">
                <h3 className="text-lg font-medium mb-4">Submit a Support Ticket</h3>
                <div className="space-y-4">
                  <div className="grid gap-4 md:grid-cols-2">
                    <div className="space-y-2">
                      <label htmlFor="name" className="text-sm font-medium">
                        Name
                      </label>
                      <Input id="name" placeholder="Your name" />
                    </div>
                    <div className="space-y-2">
                      <label htmlFor="email" className="text-sm font-medium">
                        Email
                      </label>
                      <Input id="email" type="email" placeholder="Your email" />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="subject" className="text-sm font-medium">
                      Subject
                    </label>
                    <Input id="subject" placeholder="Brief description of your issue" />
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="message" className="text-sm font-medium">
                      Message
                    </label>
                    <textarea
                      id="message"
                      rows={5}
                      className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                      placeholder="Describe your issue in detail"
                    ></textarea>
                  </div>
                  <Button>Submit Ticket</Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
