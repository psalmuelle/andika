"use client";
import Image from "next/image";
import Typography from "../ui/typography";
import { Button } from "../ui/button";
import { StarFilledIcon } from "@radix-ui/react-icons";
import { motion } from "framer-motion";

export default function AboutAndika() {
  const container = {
    hidden: { opacity: 1 },
    visible: {
      opacity: 1,
      transition: {
        delayChildren: 0.3,
        staggerChildren: 0.2,
      },
    },
  };

  const item = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
    },
  };

  return (
    <motion.section
      className="px-[5%]"
      variants={container}
      initial="hidden"
      animate="visible"
    >
      <Button
        className="rounded-full bg-white shadow hover:bg-white"
        variant={"outline"}
      >
        <StarFilledIcon className="h-6 w-6 pr-1" /> About AndikaDocs
      </Button>

      <div className="relative mt-10 w-fit">
        <div className="absolute -right-[30%] bottom-[28%] z-0 rotate-[25deg] max-lg:hidden">
          <Image
            src={"/arrow-irregular.png"}
            className="h-full max-h-[480px] w-full max-w-[300px] opacity-80"
            alt="arrow"
            width={300}
            height={480}
          />
        </div>

        <motion.div variants={item} className="max-w-2xl">
          <Typography as="h1" className="max-w-2xl text-left font-bold">
            Bridging the Gap Between Tech and Communication
          </Typography>
          <Typography className="text-lg">
            AndikaDocs is a technical writing agency that helps tech companies
            streamline communication with precise documentation, user-friendly
            guides, and impactful content.
          </Typography>
        </motion.div>

        <div className="mt-10 flex h-auto w-fit flex-wrap items-center gap-4 rounded-xl border p-4 max-sm:mx-auto max-sm:flex-col">
          <motion.div
            variants={item}
            className="group relative inline-block cursor-pointer rounded-xl bg-zinc-800 p-px text-base font-semibold leading-6 text-white no-underline shadow-2xl shadow-zinc-900"
          >
            <span className="absolute inset-0 overflow-hidden rounded-xl">
              <span className="absolute inset-0 rounded-xl bg-[image:radial-gradient(75%_100%_at_50%_0%,rgba(56,189,248,0.6)_0%,rgba(56,189,248,0)_75%)] opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
            </span>
            <div className="relative z-10 flex h-[90px] flex-col items-center justify-center space-y-2 rounded-xl bg-primary px-4 py-4 ring-1 ring-white/10">
              <span className="block">
                <Image
                  src={"/icons8-professional-48.png"}
                  alt="targets"
                  width={34}
                  height={34}
                />
              </span>
              <p>5+ Years of Experience</p>
            </div>
            <span className="absolute -bottom-0 left-[1.125rem] h-px w-[calc(100%-2.25rem)] bg-gradient-to-r from-emerald-400/0 via-emerald-400/90 to-emerald-400/0 transition-opacity duration-500 group-hover:opacity-40" />
          </motion.div>

          <motion.div
            variants={item}
            className="group relative inline-block cursor-pointer rounded-xl bg-zinc-800 p-px text-base font-semibold leading-6 text-white no-underline shadow-2xl shadow-zinc-900"
          >
            <span className="absolute inset-0 overflow-hidden rounded-xl">
              <span className="absolute inset-0 rounded-xl bg-[image:radial-gradient(75%_100%_at_50%_0%,rgba(56,189,248,0.6)_0%,rgba(56,189,248,0)_75%)] opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
            </span>
            <div className="relative z-10 flex h-[90px] flex-col items-center justify-center space-y-2 rounded-xl bg-primary p-4 ring-1 ring-white/10">
              <span className="block">
                <Image
                  src={"/icons8-star-94.png"}
                  alt="targets"
                  width={34}
                  height={34}
                />
              </span>
              <p>Trusted by 40+ Clients</p>
            </div>
            <span className="absolute -bottom-0 left-[1.125rem] h-px w-[calc(100%-2.25rem)] bg-gradient-to-r from-emerald-400/0 via-emerald-400/90 to-emerald-400/0 transition-opacity duration-500 group-hover:opacity-40" />
          </motion.div>

          <motion.div
            variants={item}
            className="group relative inline-block cursor-pointer rounded-xl bg-zinc-800 p-px text-base font-semibold leading-6 text-white no-underline shadow-2xl shadow-zinc-900"
          >
            <span className="absolute inset-0 overflow-hidden rounded-xl">
              <span className="absolute inset-0 rounded-xl bg-[image:radial-gradient(75%_100%_at_50%_0%,rgba(56,189,248,0.6)_0%,rgba(56,189,248,0)_75%)] opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
            </span>
            <div className="relative z-10 flex h-[90px] flex-col items-center justify-center space-y-1 rounded-xl bg-primary px-4 py-4 ring-1 ring-white/10">
              <span className="block">
                <Image
                  src={"/icons8-bullseye-96.png"}
                  alt="targets"
                  width={34}
                  height={34}
                />
              </span>
              <p>Completed 100+ Projects</p>
            </div>
            <span className="absolute -bottom-0 left-[1.125rem] h-px w-[calc(100%-2.25rem)] bg-gradient-to-r from-emerald-400/0 via-emerald-400/90 to-emerald-400/0 transition-opacity duration-500 group-hover:opacity-40" />
          </motion.div>
        </div>
      </div>
    </motion.section>
  );
}
