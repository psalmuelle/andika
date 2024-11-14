"use client";
import { Carousel } from "antd";
import Image from "next/image";
import Typography from "../ui/typography";
import { testimonials } from "@/constant/landingPage";

export default function Testimonials() {
  return (
    <Carousel effect="fade" autoplay className="max-w-md max-sm:w-[90vw] p-4">
      {testimonials.map((testimonial) => {
        return (
          <div key={testimonial.id}>
            <div>
              <div className="min-h-16">
                <Typography as="h4" className="font-mono">
                  "{testimonial.comment}"
                </Typography>
              </div>
              <div className="mt-2 flex items-center gap-2.5">
                <Image
                  width="32"
                  height="32"
                  src="https://img.icons8.com/fluency-systems-filled/50/user.png"
                  alt="user"
                  className="block rounded-full border"
                />
                <div>
                  <p className="font-bold leading-tight">{testimonial.name}</p>
                  <p className="text-xs font-medium">{testimonial.title}</p>
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </Carousel>
  );
}
