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
import { Clock } from "lucide-react";
import { supportChannels, faqs } from "@/constant/dashboard";

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
