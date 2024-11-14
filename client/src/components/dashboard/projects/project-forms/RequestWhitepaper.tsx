"use client";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const formSchema = z.object({
  projectName: z.string().min(2, {
    message: "Enter project or product name",
  }),
  niche: z.string().min(1, {
    message: "select industry",
  }),
});

export default function RequestWhitepaperForm() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      projectName: "",
      niche: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values);
  }
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <FormField
          control={form.control}
          name="projectName"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Name of Project</FormLabel>
              <FormControl>
                <Input placeholder="Project or product name" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="niche"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Niche</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select project niche" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="Decentralized Finance (DeFi)">
                    Decentralized Finance (DeFi)
                  </SelectItem>
                  <SelectItem value="Non-Fungible Tokens (NFTs)">
                    Non-Fungible Tokens (NFTs)
                  </SelectItem>
                  <SelectItem value="Decentralized Gaming and GameFi">
                    Decentralized Gaming and GameFi
                  </SelectItem>
                  <SelectItem value="Enterprise and Supply Chain">
                    Enterprise and Supply Chain
                  </SelectItem>
                  <SelectItem value="Data Privacy and Security">
                    Data Privacy and Security
                  </SelectItem>
                  <SelectItem value="Smart Contract Platforms">
                    Smart Contract Platforms
                  </SelectItem>
                  <SelectItem value="Decentralized Autonomous Organizations (DAOs)">
                    Decentralized Autonomous Organizations (DAOs)
                  </SelectItem>
                  <SelectItem value="Social and Web3 Networks">
                    Social and Web3 Networks
                  </SelectItem>
                  <SelectItem value="Infrastructure and Developer Tools">
                    Infrastructure and Developer Tools
                  </SelectItem>
                  <SelectItem value="Payments and Remittances">
                    Payments and Remittances
                  </SelectItem>
                  <SelectItem value="Tokenization of Assets">
                    Tokenization of Assets
                  </SelectItem>
                  <SelectItem value="Environmental and Sustainability Initiatives">
                    Environmental and Sustainability Initiatives
                  </SelectItem>
                </SelectContent>
              </Select>
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
