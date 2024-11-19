import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Mail, Phone, MessageCircle, Clock } from "lucide-react";

const supportChannels = [
  {
    icon: <Phone className="h-6 w-6" />,
    title: "Phone Support",
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

export default function Support() {
  return (
    <div className="mt-6 px-[3%] pb-6">
      <div className="mt-8">
        <h1 className="font-semibold">How can we help you?</h1>
        <p className="mt-2">
          Get support for your technical writing projects through multiple
          channels
        </p>
      </div>

      {/* Support Channels */}
      <div className="my-12 grid gap-6 md:grid-cols-3">
        {supportChannels.map((channel, index) => (
          <Card key={index}>
            <CardHeader>
              <CardTitle className="flex flex-row items-center gap-3">
                {channel.icon} {channel.title}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="min-h-10 text-gray-600">{channel.description}</p>
              <div className="mt-4 flex items-center text-sm text-gray-500">
                <Clock className="mr-2 h-4 w-4" />
                {channel.availability}
              </div>
            </CardContent>
            <CardFooter>
              <Button className="w-full">{channel.action}</Button>
            </CardFooter>
          </Card>
        ))}
      </div>

      <h3 className="mt font-semibold">Frequently Asked Questions</h3>
      <div>
        <Accordion type="single" className="mt-6">
          {faqs.map((faq, index) => (
            <AccordionItem value={`${index}`} key={index}>
              <AccordionTrigger>{faq.question}</AccordionTrigger>
              <AccordionContent>{faq.answer}</AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </div>
  );
}
