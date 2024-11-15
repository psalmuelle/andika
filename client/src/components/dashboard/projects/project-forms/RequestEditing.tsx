"use client";
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

const { Dragger } = Upload;


const formSchema = z.object({
  usefulLinks: z.string(),
  otherInfo: z.string(),
  docFiles: z.string(),
});

export default function RequestEditingForm() {
  const [fileList, setFileList] = useState<File[]>([]);
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      usefulLinks: "",
      otherInfo: "",
      docFiles: undefined,
    },
  });

  const uploadProps: UploadProps = {
    name: "file",
    accept: ".doc,.docx,.xml,.pdf,.txt,.md",
    multiple: true,
    action: "https://www.mocky.io/v2/5cc8019d300000980a055e76",
    onChange(info) {
      const main = info.fileList.map((file) => file.originFileObj);
      console.log(info);
    },
  };

  async function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values);
  }
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <FormField
          control={form.control}
          name="docFiles"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Upload Writeups/Drafts</FormLabel>
              <div className="my-4" />
              <FormControl>
                <Dragger onChange={field.onChange} {...uploadProps}>
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
          )}
        />

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
          name={"otherInfo"}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Any useful </FormLabel>
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

        <Button size={"lg"} className="w-full" type="submit">
          Submit
        </Button>
      </form>
    </Form>
  );
}
