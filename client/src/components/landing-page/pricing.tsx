import { Button } from "../ui/button";
import { Separator } from "../ui/separator";
import { cn } from "@/lib/utils";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { CheckCircle2 } from "lucide-react";

type CardProps = React.ComponentProps<typeof Card>;

export default function PriceCard({ className, ...props }: CardProps) {
  return (
    <Card className={cn("w-full max-w-[300px]", className)} {...props}>
      <CardHeader>
        <CardTitle>Basic</CardTitle>
        <CardDescription>
          A basic plan for startups and individual users.
        </CardDescription>
      </CardHeader>
      <CardContent className="grid gap-4">
        <p className="text-3xl font-bold">
          $10 <span className="text-base font-normal">/per article</span>
        </p>
        <Button size={"lg"} className="mb-2 w-full">
          Subscribe
        </Button>
        <Separator />
      </CardContent>
      <CardFooter>
        <ul className="grid gap-3">
          <li className="flex items-center gap-2">
            <CheckCircle2 />
            <span>AI-powered analytics</span>
          </li>

          <li className="flex items-center gap-2">
            <CheckCircle2 />
            <span>AI-powered analytics</span>
          </li>

          <li className="flex items-center gap-2">
            <CheckCircle2 />
            <span>AI-powered analytics</span>
          </li>

          <li className="flex items-center gap-2">
            <CheckCircle2 />
            <span>AI-powered analytics</span>
          </li>
        </ul>
      </CardFooter>
    </Card>
  );
}
