"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import Typography from "../ui/typography";
import { Button } from "../ui/button";

const SkeletonOne = () => {
  const variants = {
    initial: {
      x: 0,
    },
    animate: {
      x: 10,
      rotate: 5,
      transition: {
        duration: 0.2,
      },
    },
  };
  const variantsSecond = {
    initial: {
      x: 0,
    },
    animate: {
      x: -10,
      rotate: -5,
      transition: {
        duration: 0.2,
      },
    },
  };

  return (
    <motion.div
      initial="initial"
      whileHover="animate"
      className="dark:bg-dot-white/[0.2] bg-dot-black/[0.2] flex h-full min-h-[6rem] w-full flex-1 flex-col space-y-2"
    >
      <motion.div
        variants={variants}
        className="flex flex-row items-center space-x-2 rounded-full border border-neutral-100 bg-white p-2 dark:border-white/[0.2] dark:bg-black"
      >
        <div className="h-4 w-full rounded-full bg-gray-100 dark:bg-neutral-900" />
      </motion.div>
      <motion.div
        variants={variantsSecond}
        className="ml-auto flex w-full flex-row items-center space-x-2 rounded-full border border-neutral-100 bg-white p-2 dark:border-white/[0.2] dark:bg-black"
      >
        <div className="h-4 w-full rounded-full bg-gray-100 dark:bg-neutral-900" />
      </motion.div>
      <motion.div
        variants={variants}
        className="flex flex-row items-center space-x-2 rounded-full border border-neutral-100 bg-white p-2 dark:border-white/[0.2] dark:bg-black"
      >
        <div className="h-4 w-full rounded-full bg-gray-100 dark:bg-neutral-900" />
      </motion.div>
    </motion.div>
  );
};
const SkeletonTwo = () => {
  const variants = {
    initial: {
      width: 0,
    },
    animate: {
      width: "100%",
      transition: {
        duration: 0.2,
      },
    },
    hover: {
      width: ["0%", "100%"],
      transition: {
        duration: 2,
      },
    },
  };
  const arr = new Array(6).fill(0);
  return (
    <motion.div
      initial="initial"
      animate="animate"
      whileHover="hover"
      className="dark:bg-dot-white/[0.2] bg-dot-black/[0.2] flex h-full min-h-[6rem] w-full flex-1 flex-col space-y-2"
    >
      {arr.map((_, i) => (
        <motion.div
          key={"skelenton-two" + i}
          variants={variants}
          style={{
            maxWidth: Math.random() * (100 - 40) + 40 + "%",
          }}
          className="flex h-4 w-full flex-row items-center space-x-2 rounded-full border border-neutral-100 bg-neutral-100 p-2 dark:border-white/[0.2] dark:bg-black"
        ></motion.div>
      ))}
    </motion.div>
  );
};
const SkeletonThree = () => {
  const variants = {
    initial: {
      backgroundPosition: "0 50%",
    },
    animate: {
      backgroundPosition: ["0, 50%", "100% 50%", "0 50%"],
    },
  };
  return (
    <motion.div
      initial="initial"
      animate="animate"
      variants={variants}
      transition={{
        duration: 5,
        repeat: Infinity,
        repeatType: "reverse",
      }}
      className="dark:bg-dot-white/[0.2] bg-dot-black/[0.2] flex h-full min-h-[6rem] w-full flex-1 flex-col space-y-2 rounded-lg"
      style={{
        background:
          "linear-gradient(-45deg, #ee7752, #e73c7e, #23a6d5, #23d5ab)",
        backgroundSize: "400% 400%",
      }}
    >
      <motion.div className="h-full w-full rounded-lg"></motion.div>
    </motion.div>
  );
};
const SkeletonFour = () => {
  const first = {
    initial: {
      x: 16,
      rotate: -5,
    },
    hover: {
      x: 0,
      rotate: 0,
    },
  };
  const second = {
    initial: {
      x: -16,
      rotate: 5,
    },
    hover: {
      x: 0,
      rotate: 0,
    },
  };
  return (
    <motion.div
      initial="initial"
      animate="animate"
      whileHover="hover"
      className="dark:bg-dot-white/[0.2] bg-dot-black/[0.2] mx-auto flex h-full min-h-[6rem] w-full gap-2"
    >
      <motion.div
        variants={first}
        className="flex h-full w-1/3 flex-col items-center justify-center rounded-2xl border border-neutral-200 bg-white p-4 dark:border-white/[0.1] dark:bg-black"
      >
        <div className="h-10 w-10 rounded-full bg-gradient-to-r from-pink-500 to-violet-500" />
        <p className="mt-4 text-center text-base font-semibold text-neutral-500">
          User Manuals
        </p>
        <p className="mt-4 rounded-full border border-red-500 bg-red-100 px-2 py-0.5 text-base text-red-600 dark:bg-red-900/20">
          Manuals
        </p>
      </motion.div>
      <motion.div className="relative z-20 flex h-full w-1/3 flex-col items-center justify-center rounded-2xl border border-neutral-200 bg-white p-4 dark:border-white/[0.1] dark:bg-black">
        <div className="h-10 w-10 rounded-full bg-gradient-to-r from-fuchsia-500 to-cyan-500" />
        <p className="mt-4 text-center text-base font-semibold text-neutral-500">
          User Guides
        </p>
        <p className="mt-4 rounded-full border border-green-500 bg-green-100 px-2 py-0.5 text-base text-green-600 dark:bg-green-900/20">
          Guides
        </p>
      </motion.div>
      <motion.div
        variants={second}
        className="flex h-full w-1/3 flex-col items-center justify-center rounded-2xl border border-neutral-200 bg-white p-4 dark:border-white/[0.1] dark:bg-black"
      >
        <div className="h-10 w-10 rounded-full bg-gradient-to-r from-stone-500 to-stone-700" />
        <p className="mt-4 text-center text-base font-semibold text-neutral-500">
          Technical instructions
        </p>
        <p className="mt-4 rounded-full border border-orange-500 bg-orange-100 px-2 py-0.5 text-base text-orange-600 dark:bg-orange-900/20">
          T.I
        </p>
      </motion.div>
    </motion.div>
  );
};
const SkeletonFive = () => {
  const variants = {
    initial: {
      x: 0,
    },
    animate: {
      x: 10,
      rotate: 5,
      transition: {
        duration: 0.2,
      },
    },
  };
  const variantsSecond = {
    initial: {
      x: 0,
    },
    animate: {
      x: -10,
      rotate: -5,
      transition: {
        duration: 0.2,
      },
    },
  };

  return (
    <motion.div
      initial="initial"
      whileHover="animate"
      className="dark:bg-dot-white/[0.2] bg-dot-black/[0.2] flex h-full min-h-[6rem] w-full flex-1 flex-col space-y-2"
    >
      <motion.div
        variants={variants}
        className="flex flex-row items-start space-x-2 rounded-2xl border border-neutral-100 bg-gradient-to-r from-pink-500 to-violet-500 p-2 py-4 dark:border-white/[0.2]"
      ></motion.div>
      <motion.div
        variants={variantsSecond}
        className="ml-auto flex w-3/4 flex-row items-center justify-end space-x-2 rounded-full border border-neutral-100 bg-white p-2 dark:border-white/[0.2] dark:bg-black"
      >
        <Link href={"/contact"} className="text-base text-neutral-500">
          Book a call.
        </Link>
        <div className="h-6 w-6 flex-shrink-0 rounded-full bg-gradient-to-r from-pink-500 to-violet-500" />
      </motion.div>
    </motion.div>
  );
};

export function OfferList() {
  return (
    <div className="mx-auto w-full px-[4%]">
      <div className="">
        <section className="mt-16 flex items-center justify-center gap-10">
          <div className="max-w-2xl">
            <h3 className="text-3xl font-semibold">Technical Articles</h3>

            {/*  */}
            <div className="dark:bg-dot-white/[0.2] bg-dot-black/[0.2] my-8 flex h-full min-h-[6rem] flex-1 flex-col space-y-2 md:hidden">
              <SkeletonOne />
            </div>

            {/*  */}
            <Typography className="text-lg max-sm:text-base">
              We help companies with their technical articles in order to boost
              their visibility. From long-form articles about your product to
              any other thing you might want to do, we are here for you.
            </Typography>
            <Button size={"lg"} className="mt-8 h-12 rounded-full text-base">
              Book a Call
            </Button>
          </div>

          <div className="max-md:hidden">
            <div className="dark:bg-dot-white/[0.2] bg-dot-black/[0.2] flex h-full min-h-[6rem] w-96 flex-1 flex-col space-y-2 max-lg:w-80">
              <SkeletonOne />
            </div>
          </div>
        </section>
      </div>

      <div className="">
        <section className="mt-16 flex items-center justify-center gap-10">
          <div className="dark:bg-dot-white/[0.2] bg-dot-black/[0.2] my-8 flex h-full min-h-[6rem] w-full flex-1 flex-col space-y-2 max-md:hidden">
            <SkeletonTwo />
          </div>

          <div className="max-w-2xl">
            <h3 className="text-3xl font-semibold">API/SDK Documentation</h3>

            {/*  */}

            <div className="dark:bg-dot-white/[0.2] bg-dot-black/[0.2] my-8 flex h-full min-h-[6rem] w-full flex-1 flex-col space-y-2 md:hidden">
              <SkeletonTwo />
            </div>
            {/*  */}
            <Typography className="text-lg max-sm:text-base">
              Products APIs and SDKs can be understood better without worries.
              Let us handle the documentation of your products. Our team is
              dedicated to making sure your products is better understood and
              communicated to your users.
            </Typography>
            <Button size={"lg"} className="mt-8 h-12 rounded-full text-base">
              Book a Meeting
            </Button>
          </div>
        </section>
      </div>

      <div className="">
        <section className="mt-16 flex items-center justify-center gap-10">
          <div className="max-w-2xl">
            <h3 className="text-3xl font-semibold">
              Whitepapers and Case Studies
            </h3>

            {/*  */}
            <div className="dark:bg-dot-white/[0.2] bg-dot-black/[0.2] my-8 flex h-full min-h-[6rem] w-full flex-1 flex-col space-y-2 md:hidden">
              <SkeletonThree />
            </div>

            {/*  */}
            <Typography className="text-lg max-sm:text-base">
              We help companies with their technical articles in order to boost
              their visibility. From long-form articles about your product to
              any other thing you might want to do, we are here for you.
            </Typography>
            <Button size={"lg"} className="mt-8 h-12 rounded-full text-base">
              Book a Call
            </Button>
          </div>

          <div className="max-md:hidden">
            <div className="dark:bg-dot-white/[0.2] bg-dot-black/[0.2] flex h-full min-h-[6rem] w-96 flex-1 flex-col space-y-2 max-lg:w-80">
              <SkeletonThree />
            </div>
          </div>
        </section>
      </div>

      <div className="">
        <section className="mt-16 flex items-center justify-center gap-10">
          <div className="max-md:hidden">
            <div className="h-full min-h-[6rem]">
              <SkeletonFour />
            </div>
          </div>

          <div className="max-w-2xl">
            <h3 className="text-3xl font-semibold">User Guides and Manuals</h3>

            {/*  */}
            <div className="mx-auto my-8 h-full min-h-[6rem] w-[82vw] md:hidden">
              <SkeletonFour />
            </div>

            {/*  */}
            <Typography className="text-lg max-sm:text-base">
              Products APIs and SDKs can be understood better without worries.
              Let us handle the documentation of your products. Our team is
              dedicated to making sure your products is better understood and
              communicated to your users.
            </Typography>
            <Button size={"lg"} className="mt-8 h-12 rounded-full text-base">
              Book a Meeting
            </Button>
          </div>
        </section>
      </div>

      <div className="">
        <section className="mt-16 flex items-center justify-center gap-10">
          <div className="max-w-2xl">
            <h3 className="text-3xl font-semibold">Editing and Proofreading</h3>

            {/*  */}
            <div className="dark:bg-dot-white/[0.2] bg-dot-black/[0.2] my-8 flex h-full min-h-[6rem] w-[70%] flex-1 flex-col space-y-2 md:hidden">
              <SkeletonFive />
            </div>

            {/*  */}
            <Typography className="text-lg max-sm:text-base">
              We help companies with their technical articles in order to boost
              their visibility. From long-form articles about your product to
              any other thing you might want to do, we are here for you.
            </Typography>
            <Button size={"lg"} className="mt-8 h-12 rounded-full text-base">
              Book a Call Now
            </Button>
          </div>

          <div className="max-md:hidden">
            <div className="dark:bg-dot-white/[0.2] bg-dot-black/[0.2] flex h-full min-h-[6rem] w-96 flex-1 flex-col space-y-2 max-lg:w-80">
              <SkeletonFive />
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
