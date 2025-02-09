import Link from "next/link";
import { Button } from "../ui/button";
import { Separator } from "../ui/separator";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { CheckCircle2 } from "lucide-react";

interface CardProps {
  tag: {
    id: number;
    title: string;
    description: string;
    price: string;
    unit: string;
    features: string[];
    link: string;
  };
}

export default function PriceCard({ tag }: CardProps) {
  return (
    <Card className={"w-full max-w-[300px]"}>
      <CardHeader>
        <CardTitle>{tag.title}</CardTitle>
        <CardDescription>{tag.description}</CardDescription>
      </CardHeader>
      <CardContent className="grid gap-4">
        <p className="text-3xl font-bold">
          <span className="font-mono text-lg">FROM</span> {tag.price}{" "}
          <span className="text-base font-normal">{tag.unit}</span>
        </p>
        <Button size={"lg"} className="mb-2 w-full" asChild>
          <Link href={tag.link}>Get Started</Link>
        </Button>
        <Separator />
      </CardContent>
      <CardFooter>
        <ul className="grid gap-3">
          {tag.features.map((feature, index) => (
            <li key={index} className="flex items-center gap-2">
              <CheckCircle2 />
              <span>{feature}</span>
            </li>
          ))}
        </ul>
      </CardFooter>
    </Card>
  );
}
