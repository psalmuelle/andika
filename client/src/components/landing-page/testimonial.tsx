"use client";

import { testimonials } from "@/constant/landingPage";
import Marquee from "react-fast-marquee";
import type { MarqueeProps } from "react-fast-marquee";

export default function Testimonials() {
  const marqueeType: MarqueeProps = {
    autoFill: true,
    speed: 30,
    direction: "right",
    gradient: false,
    pauseOnHover: true,
  };
  return (
    <div>
      <Marquee {...marqueeType} className="h-64">
        {testimonials.map((testimonial) => (
          <div
            key={testimonial.id}
            className="relative mr-4 w-[350px] max-w-full flex-shrink-0 rounded-2xl border border-b-0 border-slate-700 bg-gradient-to-bl from-zinc-600 to-zinc-900 px-8 py-6 md:w-[450px]"
          >
            <blockquote>
              <div
                aria-hidden="true"
                className="user-select-none -z-1 pointer-events-none absolute -left-0.5 -top-0.5 h-[calc(100%_+_4px)] w-[calc(100%_+_4px)]"
              ></div>
              <span className="relative z-20 text-sm font-normal leading-[1.6] text-gray-100">
                {testimonial.comment}
              </span>
              <div className="relative z-20 mt-6 flex flex-row items-center">
                <span className="flex flex-col gap-1">
                  <span className="text-sm font-normal leading-[1.6] text-gray-400">
                    {testimonial.name}
                  </span>
                  <span className="text-sm font-normal leading-[1.6] text-gray-400">
                    {testimonial.title}
                  </span>
                </span>
              </div>
            </blockquote>
          </div>
        ))}
      </Marquee>
    </div>
  );
}
