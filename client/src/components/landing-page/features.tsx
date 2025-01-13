"use client";
import { useEffect, useState } from "react";
import { Button } from "../ui/button";
import Link from "next/link";
import { ArrowRightIcon } from "@radix-ui/react-icons";
import { offeringImages, offers } from "@/constant/landingPage";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  type CarouselApi,
} from "@/components/ui/carousel";
import Autoplay from "embla-carousel-autoplay";
import Image from "next/image";

interface FeatureTextTypes {
  title: string;
  description: string;
  href: string;
  active?: boolean;
}

const FeatureText = ({
  title,
  description,
  href,
  active,
}: FeatureTextTypes) => {
  return (
    <div
      className={`w-full max-w-lg cursor-pointer rounded-r border-l-2 pb-2 pt-4 transition-all duration-150 ease-in-out hover:bg-accent/60 ${
        active ? "border-accent-foreground" : "border-accent"
      }`}
    >
      <div className="mb-1 px-4">
        <h2 className="font-semibold">{title}</h2>
        <p className="mt-2 max-w-md text-zinc-700">{description}</p>
      </div>
      <Button asChild variant={"link"}>
        <Link href={href}>
          Get Started <ArrowRightIcon className="ml-2" />
        </Link>
      </Button>
    </div>
  );
};

export default function Features() {
  const [api, setApi] = useState<CarouselApi>();
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    if (!api) {
      return;
    }
    setCurrent(api.selectedScrollSnap() + 1);

    api.on("select", () => {
      setCurrent(api.selectedScrollSnap() + 1);
    });
  }, [api]);

  return (
    <div className="flex gap-6 max-sm:flex-col-reverse">
      <div className="w-full space-y-2 py-4">
        {offers.map((offer) => {
          return (
            <FeatureText
              active={offer.id === current}
              key={offer.id}
              title={offer.title}
              description={offer.description}
              href={offer.href}
            />
          );
        })}
      </div>
      <div className="relative h-full w-full rounded-lg bg-neutral-100">
        <Carousel
          opts={{
            align: "center",
            loop: true,
          }}
          plugins={[
            Autoplay({
              delay: 3200,
            }),
          ]}
          setApi={setApi}
          orientation="vertical"
          className="my-auto"
        >
          <CarouselContent className="mx-auto h-full max-h-[400px]">
            {offeringImages.map((img) => {
              return (
                <CarouselItem key={img.id} className="mx-auto basis-full">
                  <Image
                    className="mx-auto my-4 block h-full min-h-max object-cover"
                    src={img.src}
                    width={400}
                    height={500}
                    alt={img.alt}
                  />
                </CarouselItem>
              );
            })}
          </CarouselContent>
        </Carousel>
        <div className="absolute top-0 h-full w-full bg-transparent" />
      </div>
    </div>
  );
}
