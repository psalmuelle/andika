import { Divider } from "antd";
import Image from "next/image";
import Typography from "../ui/typography";

const processes = [
  {
    id: 1,
    imgUrl: "url('/step-1.jpg')",
    title: "Schedule a Call / Signup",
    description: "Book a call with us to discuss your project requirements.",
  },
  {
    id: 2,
    imgUrl: "url('/pexel-1.jpg')",
    title: "Schedule a Call / Signup",
    description: "Book a call with us to discuss your project requirements.",
  },
  {
    id: 3,
    imgUrl: "url('/step-2.webp')",
    title: "Schedule a Call / Signup",
    description: "Book a call with us to discuss your project requirements.",
  },
];

export default function OurProcess() {
  return (
    <div className="my-16 flex flex-wrap items-center justify-center gap-6">
      {processes.map((process) => (
        <div
          key={process.id}
          className="w-full max-w-[360px] rounded-xl border bg-accent-foreground/85 p-4"
        >
          <div
            className="h-[280px] rounded-t-xl bg-cover bg-center"
            style={{ backgroundImage: process.imgUrl }}
          ></div>

          <Divider style={{ borderColor: "#fff" }}>
            <div className="flex items-center justify-center gap-1">
              <Image
                src={"/divider.svg"}
                alt="divider"
                width={16}
                height={16}
                className="rotate-180"
              />{" "}
              <div className="flex h-8 items-center justify-center rounded-full bg-white">
                <span className="text-bold w-8">{process.id}</span>
              </div>{" "}
              <Image
                src={"/divider.svg"}
                alt="divider"
                width={16}
                height={16}
              />
            </div>
          </Divider>

          <div className="mb-5">
            <Typography as="h3" className="text-center text-white">
              {process.title}
            </Typography>
            <p className="mt-3 text-center text-base text-white/70">
              {process.description}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
}
