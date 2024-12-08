"use client";
import { useToast } from "@/hooks/use-toast";
import useProjectStore from "@/context/project";
import RequestSuccessDialogue from "../RequestSuccessDialogue";
import { AxiosError } from "axios";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Upload, type UploadProps } from "antd";
import { Textarea } from "@/components/ui/textarea";
import { InboxIcon } from "lucide-react";
import { Input } from "@/components/ui/input";

const { Dragger } = Upload;

const formSchema = z.object({
  usefulLinks: z.string(),
  info: z.string(),
});

export default function RequestEditingForm() {
  const [fileList, setFileList] = useState<any[]>();
  const [btnLoading, setBtnLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const { createEditingRequest } = useProjectStore();
  const { toast } = useToast();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      usefulLinks: "",
      info: "",
    },
  });

  const uploadProps: UploadProps = {
    name: "file",
    accept: ".doc,.docx,.xml,.pdf,.txt,.md",
    multiple: true,
    onChange(info) {
      const files = info.fileList.map((file) => file.originFileObj);
      setFileList(files);
    },
  };

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      setBtnLoading(true);

      const formData = new FormData();
      formData.append("usefulLinks", values.usefulLinks);
      formData.append("info", values.info);

      if (fileList && fileList.length > 0) {
        fileList.forEach((file: File) => {
          formData.append("drafts", file);
        });
      }
      await createEditingRequest(formData);
      setSuccess(true);
      setBtnLoading(false);
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Uh oh! Something went wrong.",
        description:
          error instanceof AxiosError
            ? error.response?.data.message
            : "There was a problem with your request.",
      });
      setBtnLoading(false);
    }
  }
  return (
    <>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <FormItem>
            <FormLabel>Upload Writeups/Drafts</FormLabel>
            <div className="my-4" />
            <FormControl>
              <Dragger {...uploadProps}>
                <p className="ant-upload-drag-icon">
                  <InboxIcon size={36} className="mx-auto" />
                </p>
                <p className="ant-upload-text">
                  Click or drag file to this area to upload
                </p>
                <p className="ant-upload-hint">
                  You can upload multiple files of writeups and articles here.
                  Note that the files can only be .md, .txt or .doc formats.
                </p>
              </Dragger>
            </FormControl>
            <FormMessage />
          </FormItem>

          <FormField
            control={form.control}
            name={"usefulLinks"}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Useful Links & Materials- if any</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="E.g link to landing page of product"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name={"info"}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Other Information </FormLabel>
                <FormControl>
                  <Textarea placeholder="E.g style guide..." {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button
            loading={btnLoading}
            size={"lg"}
            className="w-full"
            type="submit"
          >
            Submit
          </Button>
        </form>
      </Form>
      <RequestSuccessDialogue open={success} onChange={() => {}} />
    </>
  );
}
