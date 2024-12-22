import {
  FileText,
  Book,
  Code,
  CheckSquare,
  Phone,
  MessageCircle,
  Mail,
} from "lucide-react";

const quickActions = [
  {
    title: "Technical Articles",
    description: "In-depth articles explaining complex technical concepts",
    icon: FileText,
    startingPrice: 249,
    link: "/dashboard/projects/create?service=Technical Articles",
  },
  {
    title: "API/SDK Documentation",
    description: "Clear and detailed API reference documentation",
    icon: Code,
    startingPrice: 499,
    link: "/dashboard/projects/create?service=API/SDK Documentation",
  },
  {
    title: "Whitepapers",
    description: "Indepth research papers and industry analysis",
    icon: Book,
    startingPrice: 799,
    link: "/dashboard/projects/create?service=Whitepapers",
  },
  {
    title: "Editing/Proofreading",
    description: "Improve the quality and accuracy of your content",
    icon: CheckSquare,
    startingPrice: 149,
    link: "/dashboard/projects/create?service=Editing and Proofreading",
  },
];

const supportChannels = [
  {
    icon: <Phone className="h-6 w-6" />,
    title: "Call Support",
    description: "Schedule a call with our support team",
    availability: "24/7 Support",
    action: "Schedule Call",
  },
  {
    icon: <MessageCircle className="h-6 w-6" />,
    title: "Live Chat",
    description: "Get instant help from our support agents",
    availability: "Available 9AM-6PM EST",
    action: "Start Chat",
  },
  {
    icon: <Mail className="h-6 w-6" />,
    title: "Email Support",
    description: "Send us your queries via email",
    availability: "Response within 24 hours",
    action: "Send Email",
  },
];

const faqs = [
  {
    question: "How long does it take to complete a technical article?",
    answer:
      "The typical turnaround time for a technical article is 5-7 business days, depending on the complexity and length of the content. Rush delivery options are available upon request.",
  },
  {
    question: "What is your revision policy?",
    answer:
      "We offer unlimited revisions within 14 days of delivery to ensure your complete satisfaction with the final content.",
  },
  {
    question: "Can I change my assigned writer?",
    answer:
      "Yes, you can request a different writer at any time during the project if you're not satisfied with the current assignment.",
  },
  {
    question: "Do you sign NDAs?",
    answer:
      "Yes, we're happy to sign NDAs to protect your confidential information. Contact our support team to arrange this.",
  },
];

export { quickActions, supportChannels, faqs };
