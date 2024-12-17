import Link from "next/link";
import { Button } from "../ui/button";
import { Card, CardTitle } from "../ui/card";
import { useEffect, useState } from "react";
import { Badge } from "antd";
import { ProjectType } from "types";

const categories = [
  { name: "Pending", emoji: "🚧" },
  { name: "Active", emoji: "🎯" },
  { name: "Completed", emoji: "🚀" },
];

export default function ArticleMetrics({
  quantity,
  projects,
  setActiveBar,
}: {
  quantity: number;
  projects: ProjectType[] | undefined;
  setActiveBar: (tab: number) => void;
}) {
  const [activeTab, setActiveTab] = useState(1);

  useEffect(() => {
    setActiveBar(activeTab);
  }, [activeTab]);

  return (
    <Card className="mt-8 w-full">
      <div className="p-4">
        <CardTitle className="flex items-center justify-between pt-2 text-sm font-medium">
          <p>Projects</p>{" "}
          <Button size={"sm"} asChild variant={"link"}>
            <Link href={"/dashboard/projects"}>View All</Link>
          </Button>
        </CardTitle>
        <div className="mt-4 rounded-xl border p-4">
          <div className="mx-auto flex w-fit justify-center gap-2 rounded-md bg-accent p-2">
            {categories.map((category, index) => {
              return (
                <Badge
                key={index}
                  dot={
                    projects &&
                    projects?.filter(
                      (project) =>
                        project.status.toLowerCase() ===
                        category.name.toLowerCase(),
                    ).length > 0
                  }
                >
                  <div
                    onClick={() => setActiveTab(index)}
                    className={`w-[95px] cursor-pointer rounded-md p-2 text-center max-sm:w-[80px] max-sm:text-xs ${activeTab === index ? "bg-accent-foreground text-white shadow-sm" : "bg-white"}`}
                    key={index}
                  >
                    <p className="font-medium">{category.name}</p>
                    <p>{category.emoji}</p>
                  </div>
                </Badge>
              );
            })}
          </div>

          <div className="mx-auto mt-4">
            <p className="text-center text-xs">
              Number of{" "}
              <span className="font-medium text-zinc-600">
                {categories[activeTab].name}
              </span>{" "}
              project(s)
            </p>

            <p className="mt-4 text-center text-3xl font-bold text-neutral-900">
              {quantity}
            </p>
          </div>
        </div>
      </div>
    </Card>
  );
}
