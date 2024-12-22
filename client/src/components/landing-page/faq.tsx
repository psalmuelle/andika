import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "../ui/accordion";
import { faqs } from "@/constant/dashboard";

export default function Faq() {
  return (
    <Accordion
      type="single"
      collapsible
      className="mx-auto mb-14 mt-6 w-full max-w-md"
    >
      {faqs.map((item, i) => {
        return (
          <AccordionItem value={`item-${i}`} key={i}>
            <AccordionTrigger>{item.question}</AccordionTrigger>
            <AccordionContent>{item.answer}</AccordionContent>
          </AccordionItem>
        );
      })}
    </Accordion>
  );
}
