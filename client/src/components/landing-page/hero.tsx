"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { CardBody, CardContainer, CardItem } from "../ui/3d-card";

export default function Hero() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="relative mx-auto w-full rounded-3xl"
    >
      <CardContainer className="inter-var mx-auto w-full max-w-6xl pt-2">
        <CardBody className="group/card relative rounded-xl border border-black/[0.1] bg-gray-50 p-6 dark:border-white/[0.2] dark:bg-black dark:hover:shadow-2xl dark:hover:shadow-emerald-500/[0.1]">
          <CardItem
            translateZ="50"
            className="text-neutral-600 dark:text-white"
          >
            <Image
              src={"/hero-image.jpg"}
              alt="Hero Image"
              width={1152}
              height={400}
              blurDataURL="/hero-image.jpg"
              layout="responsive"
              objectFit="cover"
              className="max-h-[560px] rounded-2xl"
              placeholder="blur"
            />
          </CardItem>
        </CardBody>
      </CardContainer>
    </motion.div>
  );
}
