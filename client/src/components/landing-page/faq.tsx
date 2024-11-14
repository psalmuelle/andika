import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "../ui/accordion";

const faq = [
  {
    question: "Is it accessible?",
    answer: "Yes. It adheres to the WAI-ARIA design pattern.",
  },
  {
    question: "Is it styled?",
    answer:
      "Yes. It comes with default styles that matches the other components' aesthetic.",
  },
  {
    question: "Is it animated?",
    answer:
      "Yes. It's animated by default, but you can disable it if you prefer.",
  },
];

export default function Faq() {
  return (
    <Accordion
      type="single"
      collapsible
      className="mx-auto mb-14 mt-6 w-full max-w-md"
    >
      {faq.map((item, i) => {
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
