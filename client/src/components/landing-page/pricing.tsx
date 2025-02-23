import { BadgeCheck, PowerIcon, RocketIcon } from "lucide-react";
import { Button } from "../ui/button";

export default function Pricing() {
  return (
    <div className="my-12 flex items-center justify-center gap-6 px-2 max-lg:flex-col">
      <div className="min-h-[630px] w-full max-w-xl rounded-xl border bg-muted p-4 shadow">
        <div className="flex items-center justify-between">
          <div className="rounded-lg bg-primary/90 p-2">
            <RocketIcon className="h-5 w-5 text-white" />
          </div>
          <Button variant={"outline"}>Monthly Content Package</Button>
        </div>

        <div>
          <p className="mt-6 text-lg font-medium">
            Subscription-Based Writing Service
          </p>
          <p className="mt-4 font-mono text-4xl font-semibold">
            $1000<span className="text-xl">/Month</span>
          </p>

          <p className="mt-4 text-base">
            Our productized content writing service delivers four expertly
            crafted articles each month. Perfect for clients who need
            consistent, high-quality content to elevate their brand and engage
            their audience.
          </p>
        </div>

        <div>
          <div className="mt-4 flex flex-wrap items-center gap-4">
            <Button variant={"outline"}>24+ Subscribers</Button>
            <Button variant={"outline"}>350+ Written Articles</Button>
          </div>

          <div className="mt-6 flex items-center gap-2 font-medium">
            <BadgeCheck />
            <p className="text-base">4 Long-Form Articles per Month</p>
          </div>
          <div className="mt-4 flex items-center gap-2 font-medium">
            <BadgeCheck />
            <p className="text-base">SEO Optimized Contents</p>
          </div>

          <div className="mt-6 flex items-center gap-2 font-medium">
            <BadgeCheck />
            <p className="text-base">Unlimited Revisions</p>
          </div>

          <div className="mt-6 flex items-center gap-2 font-medium">
            <BadgeCheck />
            <p className="text-base">100% Original Contents</p>
          </div>

          <div className="mt-6 flex items-center gap-2 font-medium">
            <BadgeCheck />
            <p className="text-base">No AI-Generated Content</p>
          </div>

          <Button size={"lg"} className="mt-8 h-11 w-full">
            Get Started Now
          </Button>
        </div>
      </div>
      <div className="min-h-[630px] w-full max-w-xl rounded-xl border bg-muted p-4 shadow">
        <div className="flex items-center justify-between">
          <div className="rounded-lg bg-primary/90 p-2">
            <PowerIcon className="h-5 w-5 text-white" />
          </div>
          <Button variant={"outline"}>Custom Package</Button>
        </div>

        <div>
          <p className="mt-6 text-lg font-medium">On-Demand Content Service</p>
          <p className="mt-4 font-mono text-xl font-semibold">
            $ - Based on Negotiation
          </p>

          <p className="mt-4 text-base">
            We provide custom content writing services tailored to your specific
            needs. Our team of expert writers can help you with any writing
            project, big or small. We also make our services affordable.
          </p>
        </div>

        <div>
          <div className="mt-6 flex flex-wrap items-center gap-4">
            <Button variant={"outline"}>19+ Clients</Button>
            <Button variant={"outline"}>50+ Projects</Button>
          </div>

          <div className="mt-6 flex items-center gap-2 font-medium">
            <BadgeCheck />
            <p className="text-base">Custom Written Technical Articles</p>
          </div>
          <div className="mt-4 flex items-center gap-2 font-medium">
            <BadgeCheck />
            <p className="text-base">API/SDK Documentation</p>
          </div>

          <div className="mt-6 flex items-center gap-2 font-medium">
            <BadgeCheck />
            <p className="text-base">Whitepapers & Case-Studies</p>
          </div>

          <div className="mt-6 flex items-center gap-2 font-medium">
            <BadgeCheck />
            <p className="text-base">User Guides & Manuals </p>
          </div>

          <div className="mt-6 flex items-center gap-2 font-medium">
            <BadgeCheck />
            <p className="text-base">Editing and Proofreading</p>
          </div>

          <Button size={"lg"} className="mt-8 h-11 w-full">
            Book a Call Now
          </Button>
        </div>
      </div>
    </div>
  );
}
