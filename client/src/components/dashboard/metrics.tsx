import { Card, CardTitle } from "../ui/card";
import { useState } from "react";
import Typography from "../ui/typography";

const categories = [
  { name: "Active", emoji: "🎯" },
  { name: "Pending", emoji: "🚧" },
  { name: "Completed", emoji: "🚀" },
];

export default function ArticleMetrics() {
  const [activeTab, setActiveTab] = useState(0);

  return (
    <Card className="mt-6 w-full">
      <div className="p-4">
        <CardTitle className="pt-4 text-sm font-medium">Projects</CardTitle>
        <div className="mt-4 rounded-xl border p-4">
          <div className="mx-auto flex w-fit justify-center gap-2 rounded-md bg-accent p-2">
            {categories.map((category, index) => {
              return (
                <div
                  onClick={() => setActiveTab(index)}
                  className={`w-[95px] cursor-pointer rounded-md p-2 text-center max-sm:w-[80px] max-sm:text-xs ${activeTab === index ? "bg-accent-foreground text-white shadow-sm" : "bg-white"}`}
                  key={index}
                >
                  <p className="font-medium">{category.name}</p>
                  <p>{category.emoji}</p>
                </div>
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

            <p className="mb-2 mt-4 text-center text-3xl font-bold text-neutral-900">
              0
            </p>
          </div>
        </div>
      </div>
    </Card>
  );
}
