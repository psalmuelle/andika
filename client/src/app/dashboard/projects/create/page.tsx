"use client";
import { useEffect, useState } from "react";
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
import { useSearchParams } from "next/navigation";

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
  const searchParams = useSearchParams();
  const [selectedService, setSelectedService] = useState<String>("");
  const [step, setStep] = useState<number>(0);

  useEffect(() => {
    const service = searchParams.get("service");
    if (service) {
      setSelectedService(service);
      setStep(1);
    }
  }, []);

  return (
    <div className="mt-6 px-[3%] pb-6">
      <div className="text-center">
        <h1 className="text-base font-semibold">
          Make Request for your technical writings
        </h1>
        <p className="mx-auto max-w-xl">
          We'll ask a little question and everything is going to be okay!
        </p>
      </div>

      {step === 0 && (
        <Card className="mx-auto my-12 max-w-lg">
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
            <Button
              onClick={() => setStep(1)}
              className="w-full"
              disabled={selectedService.length <= 1}
            >
              Continue
            </Button>
          </CardFooter>
        </Card>
      )}

      {step == 1 && selectedService === "Technical Articles" && (
        <Card className="mx-auto my-12 max-w-lg">
          <CardHeader className="flex flex-row items-center gap-3">
            <Button
              size={"sm"}
              variant={"secondary"}
              onClick={() => setStep(0)}
            >
              Back
            </Button>
            <CardTitle className="-ml-6 w-full text-center">
              Technical Articles
            </CardTitle>
          </CardHeader>
          <CardContent className="mt-4">
            <RequestArticleForm />
          </CardContent>
        </Card>
      )}

      {step == 1 && selectedService === "API/SDK Documentation" && (
        <Card className="mx-auto my-12 max-w-lg">
          <CardHeader className="flex flex-row items-center gap-3">
            <Button
              size={"sm"}
              variant={"secondary"}
              onClick={() => setStep(0)}
            >
              Back
            </Button>
            <CardTitle className="-ml-6 w-full text-center">
              API/SDK Documentation
            </CardTitle>
          </CardHeader>
          <CardContent className="mt-4">
            <RequestApiDocForm />
          </CardContent>
        </Card>
      )}

      {step == 1 && selectedService === "Whitepapers" && (
        <Card className="mx-auto my-12 max-w-lg">
          <CardHeader className="flex flex-row items-center gap-3">
            <Button
              size={"sm"}
              variant={"secondary"}
              onClick={() => setStep(0)}
            >
              Back
            </Button>
            <CardTitle className="-ml-6 w-full text-center">
              Whitepaper
            </CardTitle>
          </CardHeader>
          <CardContent className="mt-4">
            <RequestWhitepaperForm />
          </CardContent>
        </Card>
      )}

      {step == 1 && selectedService === "Editing and Proofreading" && (
        <Card className="mx-auto my-12 max-w-lg">
          <CardHeader className="flex flex-row items-center gap-3">
            <Button
              size={"sm"}
              variant={"secondary"}
              onClick={() => setStep(0)}
            >
              Back
            </Button>
            <CardTitle className="-ml-6 w-full text-center">
              Editing and Proofreading
            </CardTitle>
          </CardHeader>
          <CardContent className="mt-4">
            <RequestEditingForm />
          </CardContent>
        </Card>
      )}
    </div>
  );
}
