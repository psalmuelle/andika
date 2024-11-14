"use client";
import { useState } from "react";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import RequestArticleForm from "@/components/dashboard/projects/project-forms/RequestArticle";
import RequestApiDocForm from "@/components/dashboard/projects/project-forms/RequestApiDoc";
import RequestEditingForm from "@/components/dashboard/projects/project-forms/RequestEditing";
import RequestWhitepaperForm from "@/components/dashboard/projects/project-forms/RequestWhitepaper";

const projectTypes = [
  {
    title: "Technical Articles",
    description: "Get your technical articles written by our experts",
  },
  {
    title: "Whitepapers",
    description: "Get your whitepapers written by our experts",
  },
  {
    title: "API/SDK Documentation",
    description: "Get your API/SDK doc written by our experts",
  },
  {
    title: "Editing and Proofreading",
    description: "Edit and proofread your articles and writeups",
  },
];

export default function CreateProjectPage() {
  const [selectedService, setSelectedService] = useState<String>("");
  return (
    <div className="mt-6 px-[3%]">
      <div className="text-center">
        <h1 className="text-base font-semibold">Submit your request</h1>
        <p>We are here to help </p>
      </div>

      <Card className="mx-auto mt-12 max-w-lg">
        <CardHeader>
          <CardTitle className="text-center">
            Select your desired service
          </CardTitle>
        </CardHeader>
        <CardContent className="grid grid-cols-2 gap-4">
          {projectTypes.map((projectType) => (
            <div
              key={projectType.title}
              className={`w-full cursor-pointer rounded-md p-2 hover:bg-accent-foreground hover:text-white ${selectedService === projectType.title ? "bg-accent-foreground text-white" : "bg-accent"}`}
              onClick={() => setSelectedService(projectType.title)}
            >
              <h2 className="mb-2 font-medium">{projectType.title}</h2>
              <p>{projectType.description}</p>
            </div>
          ))}
        </CardContent>
        <CardFooter>
          <Button className="w-full" disabled={selectedService.length <= 1}>
            Continue
          </Button>
        </CardFooter>
      </Card>

      <Card className="mx-auto mt-12 max-w-lg">
        <CardHeader>
          <CardTitle className="text-center">Technical Articles</CardTitle>
        </CardHeader>
        <CardContent className="">
          <RequestArticleForm />
        </CardContent>
      </Card>

      <Card className="mx-auto mt-12 max-w-lg">
        <CardHeader>
          <CardTitle className="text-center">API/SDK Documentation</CardTitle>
        </CardHeader>
        <CardContent className="">
          <RequestApiDocForm />
        </CardContent>
      </Card>

      <Card className="mx-auto mt-12 max-w-lg">
        <CardHeader>
          <CardTitle className="text-center">Whitepaper</CardTitle>
        </CardHeader>
        <CardContent className="">
          <RequestWhitepaperForm />
        </CardContent>
      </Card>

      <Card className="mx-auto mt-12 max-w-lg">
        <CardHeader>
          <CardTitle className="text-center">
            Editing and Proofreading
          </CardTitle>
        </CardHeader>
        <CardContent className="">
          <RequestEditingForm />
        </CardContent>
      </Card>
    </div>
  );
}
