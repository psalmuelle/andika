import Image from "next/image";
import { Button } from "@/components/ui/button";
import {
  ArrowRightIcon,
  BarChartIcon,
  BookmarkIcon,
  ChatBubbleIcon,
  ChevronRightIcon,
  DrawingPinIcon,
  RocketIcon,
  StarIcon,
  TargetIcon,
} from "@radix-ui/react-icons";
import Marquee from "react-fast-marquee";
import Typography from "@/components/ui/typography";
import { clients, stats } from "@/constant/landingPage";
import Link from "next/link";
import Features from "@/components/landing-page/features";
import PriceCard from "@/components/landing-page/pricing";
import Faq from "@/components/landing-page/faq";
import Testimonials from "@/components/landing-page/testimonial";

export default function Home() {
  return (
    <div className="min-h-screen">
      <section className="hero-bg pt-10">
        <div className="mx-auto flex w-fit cursor-pointer items-center justify-center gap-2 rounded-full bg-white">
          <Button variant={"link"} size={"icon"} className="rounded-full">
            <RocketIcon />
          </Button>
          <p className="font-medium">Andika</p>
          <Button variant={"link"} size={"icon"} className="rounded-full">
            <ChevronRightIcon />
          </Button>
        </div>
        <Typography
          as="h1"
          className="mx-auto mt-4 max-w-2xl px-[5%] text-center font-sans"
        >
          Technical Writing Don't Have To Be A Hassle
        </Typography>
        <Typography as="p" className="mx-auto max-w-4xl px-[5%] text-center">
          This is going to be the test that's going to be on the under of the
          document that I am talking about. I will also help to check if there
          is anything that I can do with these texts. I think this part can
          accomodate a lot of texts.
        </Typography>
        <div className="mx-auto mt-6 flex w-fit items-center gap-4 px-[5%]">
          <Button size={"lg"} variant={"outline"} className="rounded-full">
            <Link
              href={"/contact"}
              className="flex w-full items-center justify-center"
            >
              Contact us <ChatBubbleIcon className="ml-2 font-bold" />
            </Link>
          </Button>
          <Button size={"lg"} className="rounded-full" asChild>
            <Link href={"/auth/login"}>
              Get Started <ArrowRightIcon className="ml-2 font-bold" />
            </Link>
          </Button>
        </div>
        <div className="mx-auto mt-10 max-w-4xl px-[5%]">
          <Image
            src={"/Dashboard.png"}
            width={2332}
            height={982}
            alt="andika dashboard for managing projects"
          />
        </div>
        <div className="w-full border-b bg-white px-[5%] py-5">
          <Marquee pauseOnHover gradient>
            {clients.map((client) => (
              <div key={client.id} className="px-4">
                {client.name}
              </div>
            ))}
          </Marquee>
        </div>
      </section>

      <section className="bg-white px-[5%] py-8">
        <div className="flex w-fit cursor-pointer items-center justify-center rounded-full border bg-white">
          <Button variant={"link"} size={"icon"} className="rounded-full">
            <DrawingPinIcon />
          </Button>
          <p className="mr-2.5 font-medium">Offers</p>
        </div>
        <div className="mt-3">
          <Typography as={"h3"}>Main Power of Andika.</Typography>
          <p className="mt-2 max-w-xl">
            Our intuitive platforms empowers businesses to automate interactions
            and provide writing services that meet their business needs.
            Increase customer and developers satisfaction.
          </p>
        </div>
        <div className="mt-12">
          <Features />
        </div>
      </section>

      <section className="bg-accent-foreground px-[5%] py-10 text-white">
        <div className="mx-auto flex w-fit cursor-pointer items-center justify-center rounded-full border">
          <Button variant={"link"} size={"icon"} className="rounded-full">
            <BarChartIcon color="white" />
          </Button>
          <p className="mr-2.5 font-medium">Stats</p>
        </div>

        <div className="text-center">
          <Typography as="h3" className="mt-6">
            Unleash the full power of data
          </Typography>
          <p className="mt-2 text-white/80">
            Everything you need to convert, engage and retain more users
          </p>
        </div>

        <div className="mx-auto mb-4 mt-8 flex w-fit flex-wrap items-center justify-center gap-4">
          {stats.map((stat) => {
            return (
              <div key={stat.id} className="w-fit rounded-xl border p-4">
                <Typography as="h4" className="text-2xl font-bold">
                  {stat.figure}
                </Typography>
                <p className="mt-2">{stat.label}</p>
              </div>
            );
          })}
        </div>
      </section>

      <section className="bg-white px-[5%] py-10" id="testimonial">
        <div className="mt-8 flex items-center justify-between max-md:flex-wrap-reverse max-md:justify-center max-md:gap-6">
          <div>
            <div className="flex w-fit cursor-pointer items-center justify-center rounded-full border bg-white">
              <Button variant={"link"} size={"icon"} className="rounded-full">
                <StarIcon />
              </Button>
              <p className="mr-2.5 font-medium">Testimonials</p>
            </div>

            <div className="mt-6">
              <Testimonials />
            </div>
          </div>
          <div className="max-w-lg">
            <Image
              src={"/landing-testimonial.png"}
              width={791}
              height={610}
              alt="testimonial hero"
            />
          </div>
        </div>
      </section>

      <section className="bg-neutral-100 px-[5%] py-8">
        <div className="mx-auto mt-14 flex w-fit cursor-pointer items-center justify-center rounded-full border bg-white">
          <Button variant={"link"} size={"icon"} className="rounded-full">
            <TargetIcon />
          </Button>
          <p className="mr-2.5 font-medium">Pricing</p>
        </div>

        <div className="mt-6 text-center">
          <Typography as="h3">Andika To Make Your Work Easy</Typography>
          <p className="mt-2">
            Choose an affordable plan that's packed with the best features for
            engaging your audience, creating customer loyalty, and driving
            sales.
          </p>
        </div>
        <div className="mx-auto mb-6 mt-12 flex flex-wrap justify-center gap-4">
          <PriceCard />
          <PriceCard />
          <PriceCard />
        </div>
      </section>

      <section className="mt-10 px-[5%]">
        <div className="mx-auto mb-6 flex w-fit cursor-pointer items-center justify-center rounded-full border bg-white">
          <Button variant={"link"} size={"icon"} className="rounded-full">
            <BookmarkIcon />
          </Button>
          <p className="mr-2.5 font-medium">FAQs</p>
        </div>
        <div className="mb-8">
          <Typography as="h3" className="text-center">
            Frequently asked questions
          </Typography>
          <Faq />
        </div>
      </section>

      <section className="mx-[5%] mb-6 mt-8 flex flex-wrap items-center justify-between gap-4 rounded-lg bg-neutral-100 p-4 sm:p-6">
        <div>
          <p className="font-semibold">Still have questions?</p>
          <p className="text-accent-foreground/90">
            Can't find the answer you are looking for? Please chat to our
            friendly team.
          </p>
        </div>
        <Button className="rounded-full" asChild>
          <Link href={"/contact"}>Get in touch</Link>
        </Button>
      </section>
    </div>
  );
}
