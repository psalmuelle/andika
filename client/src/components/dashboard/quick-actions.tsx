import Image from "next/image";
import { Card, CardTitle } from "../ui/card";
import { useRouter } from "next/navigation";
import { quickActions } from "@/constant/dashboard";
import Link from "next/link";

type QuickActionProps = {
  title: string;
  description: string;
  startingPrice: number;
  link: string;
  icon: React.FC<React.SVGProps<SVGSVGElement>>;
  onClick: () => void;
};

const QuickAction = ({
  title,
  description,
  startingPrice,
  icon,
  link,
  onClick,
}: QuickActionProps) => {
  const Icon = icon;
  return (
    <div
      onClick={onClick}
      className="w-full max-w-[275px] cursor-pointer rounded-xl border p-4 shadow-sm hover:border-accent-foreground"
    >
      <div className="flex items-start gap-4">
        <div className={`rounded-lg bg-secondary p-2.5`}>
          <Icon className="h-5 w-5" />
        </div>
        <div>
          <h3 className="font-medium">{title}</h3>
          <p className="mt-1 text-sm">{description}</p>
          <Link href={link} className="mt-2 text-sm font-medium">
            Starting from ${startingPrice}
          </Link>
        </div>
      </div>
    </div>
  );
};

export default function QuickActions() {
  const router = useRouter();
  return (
    <Card className="w-full max-w-[640px]">
      <CardTitle className="mt-8 px-4 text-sm font-medium">
        Our Services
      </CardTitle>
      <div className="p-4">
        <div className="mt-4 flex flex-wrap items-stretch justify-stretch gap-2 max-sm:justify-center">
          {quickActions.map((action, index) => (
            <div key={index} className="">
              <div className="p-1">
                <QuickAction
                  key={index}
                  startingPrice={action.startingPrice}
                  title={action.title}
                  icon={action.icon}
                  link={action.link}
                  description={action.description}
                  onClick={() => router.push(action.link)}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </Card>
  );
}
