import { Button } from "@/components/ui/button";
import Typography from "@/components/ui/typography";
import Faq from "@/components/landing-page/faq";
import Testimonials from "@/components/landing-page/testimonial";
import BlogPreview from "@/components/blog/landing-page-preview";
import Hero from "@/components/landing-page/hero";
import IntroSection from "@/components/landing-page/introSection";
import { Divider } from "antd";
import AboutAndika from "@/components/landing-page/subHero";
import {
  BookOpenIcon,
  CircleHelpIcon,
  LayoutGridIcon,
  LightbulbIcon,
  ReceiptIcon,
  SmileIcon,
} from "lucide-react";
import { OfferList } from "@/components/landing-page/offersList";
import { TypewriterEffect } from "@/components/ui/typewriter-effect";
import BookMeeting from "@/components/landing-page/bookMeeting";
import Pricing from "@/components/landing-page/pricing";
import OurProcess from "@/components/landing-page/ourProcess";

export default function Home() {
  const words = [
    {
      text: "Each",
    },
    {
      text: "Project",
    },
    {
      text: "we",
    },
    {
      text: "Undertake",
    },
    {
      text: "is",
    },
    {
      text: "a",
    },
    {
      text: "Unique",
    },
    {
      text: "Opportunity",
    },
  ];
  return (
    <div className="min-h-screen">
      <IntroSection />
      <Hero />
      <Divider />
      <AboutAndika />
      <Divider />

      <section className="px-[5%] pt-8">
        <div className="mx-auto w-fit">
          <Button
            className="mx-auto rounded-full bg-primary/90 text-white shadow hover:bg-primary/90 hover:text-white"
            variant={"outline"}
          >
            <LightbulbIcon className="h-6 w-6 pr-1" /> What we do
          </Button>
        </div>

        <div className="mt-8">
          <Typography as="h1" className="mx-auto max-w-2xl text-center">
            All Writing Services At A Discounted Price
          </Typography>
          <Typography className="mx-auto mb-8 max-w-2xl text-center text-lg">
            We offer all ranges of writing services that we can use for this
            website that I need to come back to.
          </Typography>
        </div>

        <OfferList />
      </section>

      <Divider />

      <section className="pt-10">
        <div className="mx-auto w-fit px-[5%]">
          <Button
            className="mx-auto rounded-full bg-primary/90 text-white shadow hover:bg-primary/90 hover:text-white"
            variant={"outline"}
          >
            <LayoutGridIcon className="h-6 w-6 pr-1" /> Our Process
          </Button>
        </div>

        <div className="mt-8 px-[5%]">
          <Typography as="h1" className="mx-auto max-w-2xl text-center">
            Getting Started Steps
          </Typography>
          <Typography className="mx-auto mb-8 max-w-2xl text-center text-lg">
            Follow our simple steps to get started quickly and efficiently with
            AndikaDocs&apos;s seamless process.
          </Typography>

          <OurProcess />
        </div>
      </section>

      <Divider />

      <section className="px-[5%] pt-8">
        <div className="mx-auto w-fit">
          <Button
            className="mx-auto rounded-full bg-primary/90 text-white shadow hover:bg-primary/90 hover:text-white"
            variant={"outline"}
          >
            <ReceiptIcon className="h-6 w-6 pr-1" /> Pricing
          </Button>
        </div>

        <div className="mt-8 px-[5%]">
          <Typography as="h1" className="mx-auto max-w-2xl text-center">
            Affordable Pricing Options
          </Typography>
          <Typography className="mx-auto mb-8 max-w-2xl text-center text-lg">
            Our pricing plans are designed to make getting started as effortless
            as possible. With flexible options tailored to suit a variety of
            needs and budgets.
          </Typography>
        </div>
        <Pricing />
      </section>

      <Divider />

      <section className="px-[5%] pt-4">
        <div className="mx-auto w-fit">
          <Button
            className="mx-auto rounded-full bg-primary/90 text-white shadow hover:bg-primary/90 hover:text-white"
            variant={"outline"}
          >
            <SmileIcon className="h-6 w-6 pr-1" /> Testimonials
          </Button>
        </div>

        <div className="mt-8 px-[5%]">
          <Typography as="h1" className="mx-auto max-w-2xl text-center">
            What Our Clients Say
          </Typography>
          <Typography className="mx-auto mb-8 max-w-2xl text-center text-lg">
            Hear from our happy clients! See how we&apos;ve helped them achieve
            their goals and create lasting impact.
          </Typography>
        </div>

        <div>
          <Testimonials />
        </div>
      </section>

      <Divider />

      <section className="px-[5%] pt-8">
        <div className="mx-auto w-fit">
          <Button
            className="mx-auto rounded-full bg-primary/90 text-white shadow hover:bg-primary/90 hover:text-white"
            variant={"outline"}
          >
            <BookOpenIcon className="h-6 w-6 pr-1" /> Blog
          </Button>
        </div>

        <div className="mt-8 px-[5%]">
          <Typography as="h1" className="mx-auto max-w-2xl text-center">
            Latest Blog Posts
          </Typography>
          <Typography className="mx-auto mb-8 max-w-2xl text-center text-lg">
            Our blog provides expert insights, tips, and resources designed to
            help startups communicate their technical vision clearly and
            effectively.
          </Typography>
        </div>

        <div>
          <BlogPreview />
        </div>
      </section>

      <Divider />

      <section className="px-[5%] pt-6">
        <div className="mx-auto w-fit">
          <Button
            className="mx-auto rounded-full bg-primary/90 text-white shadow hover:bg-primary/90 hover:text-white"
            variant={"outline"}
          >
            <CircleHelpIcon className="h-6 w-6 pr-1" /> FAQ
          </Button>
        </div>

        <div className="mt-8 px-[5%]">
          <Typography as="h1" className="mx-auto max-w-2xl text-center">
            Frequently Asked Questions
          </Typography>
        </div>
        <div className="pt-8">
          <Faq />
        </div>
      </section>

      <Divider />

      <section className="mx-[5%] mb-10 mt-8 rounded-lg bg-neutral-100 p-4 sm:p-6">
        <div className="mx-w-2xl pt-4">
          <TypewriterEffect words={words} />
        </div>
        <Typography className="mx-auto mb-8 max-w-2xl text-center text-lg">
          Ready to take the next step? Join us now and start transforming your
          vision into reality with expert support.
        </Typography>

        <div className="mt-6">
          <BookMeeting />
        </div>
      </section>
    </div>
  );
}
