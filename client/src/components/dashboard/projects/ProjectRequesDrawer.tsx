import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ProjectRequestType } from "types";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { formatDistance } from "date-fns";
import { Badge } from "antd";

export default function ProjectRequestDrawer({
  data,
  isLoading,
}: {
  data: ProjectRequestType[];
  isLoading: boolean;
}) {
  const timeAgo = (date: string) => {
    return formatDistance(new Date(date), new Date(), { addSuffix: true });
  };
  return (
    <Drawer>
      <DrawerTrigger asChild>
        <Badge
          showZero
          count={
            data?.filter((projectRequest) => projectRequest?.status === "NEW")
              .length
          }
        >
          <Button>New Project</Button>
        </Badge>
      </DrawerTrigger>

      <DrawerContent>
        <div className="mx-auto w-full">
          <DrawerHeader className="mx-auto max-w-sm">
            <DrawerTitle>Select Project Requests</DrawerTitle>
          </DrawerHeader>

          <ScrollArea className="mx-auto mt-8 w-[600px] whitespace-nowrap">
            <div className="flex w-max space-x-4 p-4">
              {!isLoading &&
                data &&
                data.length > 0 &&
                data
                  ?.filter((projectRequest) => projectRequest?.status === "NEW")
                  .sort((a, b) => a.id - b.id)
                  .map((projectRequest) => (
                    <div
                      key={projectRequest?.id}
                      className="w-64 space-y-4 rounded-xl border p-4 hover:bg-accent"
                    >
                      <h1 className="font-medium">
                        {projectRequest?.requestType}
                      </h1>
                      <div>
                        <p>
                          {projectRequest?.user?.name},{" "}
                          {projectRequest?.user?.company}
                        </p>
                        <p className="mt-2">
                          {timeAgo(projectRequest?.createdAt)}
                        </p>
                      </div>
                      <Button asChild className="w-full">
                        <Link
                          href={`/admin/dashboard/projects?create=${projectRequest?.id}`}
                        >
                          Start Project
                        </Link>
                      </Button>
                    </div>
                  ))}
            </div>
            {!isLoading &&
              data &&
              data.filter((projectRequest) => projectRequest?.status === "NEW")
                .length == 0 && (
                <p className="mb-4 w-full text-center font-semibold">
                  No project Request
                </p>
              )}
            <ScrollBar orientation="horizontal" />
          </ScrollArea>

          <DrawerFooter className="mx-auto max-w-sm">
            <DrawerClose asChild>
              <Button variant="outline">Cancel</Button>
            </DrawerClose>
          </DrawerFooter>
        </div>
      </DrawerContent>
    </Drawer>
  );
}
