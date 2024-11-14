import Image from "next/image";
import { Card, CardTitle } from "../ui/card";
import { useRouter } from "next/navigation";
import { quickActions } from "@/constant/dashboard";
import { Button } from "../ui/button";

type QuickActionProps = {
  title: string;
  description: string;
  imageSrc: string;
  onClick: () => void;
};

const QuickAction = ({
  title,
  description,
  imageSrc,
  onClick,
}: QuickActionProps) => {
  return (
    <div className="min-h-[180px] min-w-[225px] max-w-[225px] cursor-pointer rounded-xl border p-4 text-gray-600 hover:border-accent-foreground hover:text-gray-800 max-sm:max-w-full xl:min-w-[270px]">
      <div className="flex items-center justify-between">
        <Image
          src={imageSrc}
          alt="avatar"
          width={40}
          height={40}
          className="mb-4 h-10 w-8"
        />
        <Button size={"sm"} variant={"secondary"} onClick={onClick}>
          Request
        </Button>
      </div>
      <h3 className="font-bold">{title}</h3>
      <p className="mt-2">{description}</p>
    </div>
  );
};

export default function QuickActions() {
  const router = useRouter();
  return (
    <Card>
      <CardTitle className="mt-8 px-4 text-sm font-medium">
        Quick Actions
      </CardTitle>
      <div className="p-4">
        <div className="mt-4 flex flex-wrap items-stretch justify-stretch gap-4 max-sm:justify-center">
          {quickActions.map((action, index) => (
            <div key={index} className="">
              <div className="p-1">
                <QuickAction
                  key={index}
                  title={action.title}
                  description={action.description}
                  imageSrc={action.imageSrc}
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
