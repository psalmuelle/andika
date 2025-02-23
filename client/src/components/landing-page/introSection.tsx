"use client";

import { motion } from "framer-motion";
import { Avatar, Tooltip } from "antd";
import Typography from "../ui/typography";
import Image from "next/image";
import { Button } from "../ui/button";
import Link from "next/link";
import { ArrowRightIcon } from "lucide-react";

export default function IntroSection() {
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
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
    },
  };

  return (
    <motion.section
      className="mx-auto mt-12"
      variants={container}
      initial="hidden"
      animate="visible"
    >
      <motion.div
        key={"avatar_groups"}
        variants={item}
        className="mx-auto flex w-fit items-center justify-center gap-2 rounded-full border bg-muted px-3 py-1 text-base shadow"
      >
        <Avatar.Group>
          <Tooltip title="Virtua Labs" placement="top">
            <Avatar src="/company-1.jpg" className="cursor-pointer" />
          </Tooltip>
          <Tooltip title="Mon AI" placement="top">
            <Avatar src={"/company-2.jpg"} className="cursor-pointer" />
          </Tooltip>
          <Tooltip title="Aboo" placement="top">
            <Avatar src={"/company-3.jpg"} className="cursor-pointer" />
          </Tooltip>
        </Avatar.Group>
        <p className="text-muted-foreground">Served 40+ Companies</p>
      </motion.div>

      <motion.div key={"short_info"} variants={item}>
        <Typography
          as="h1"
          className="mx-auto mt-8 max-w-2xl px-[5%] text-center "
        >
          Technical Writing, Simplified.
        </Typography>

        <Typography
          as="p"
          className="mx-auto max-w-4xl px-[5%] text-center text-lg"
        >
          We'll help handle your technical writing needs so you can focus on
          innovation. From API documentation to whitepapers, we craft clear,
          concise, and impactful content that speaks to your audience.
        </Typography>
      </motion.div>

      <motion.div
        key={"cta"}
        variants={item}
        className="relative mx-auto mt-14 flex w-full items-center justify-center gap-4 px-[5%] max-sm:mt-10"
      >
        <div className="absolute -top-[32px] right-[60%] max-sm:-top-[16px] max-sm:right-[80%]">
          <Image
            src={"/cta-design.svg"}
            className="rotate-45 opacity-95"
            width={100}
            height={200}
            alt="for aesthetic design"
          />
        </div>
        <Button
          size={"lg"}
          variant={"outline"}
          className="h-14 w-full max-w-[240px] rounded-full bg-gradient-to-b from-primary/90 to-primary text-base text-white shadow transition duration-200 hover:text-white hover:shadow-xl focus:ring-2 focus:ring-primary/40"
          asChild
        >
          <Link href={"/auth/register"}>
            Get Started <ArrowRightIcon className="ml-2 font-bold" />
          </Link>
        </Button>
      </motion.div>
    </motion.section>
  );
}
