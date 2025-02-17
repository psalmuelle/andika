"use client";
import Link from "next/link";
import React, { useState } from "react";
import { Button } from "../ui/button";
import {
  ArrowRightIcon,
  HamburgerMenuIcon,
  Cross1Icon,
} from "@radix-ui/react-icons";
import Image from "next/image";

export default function Header() {
  const [openMobileMenu, setOpenMobileMenu] = useState(false);

  return (
    <header className="sticky top-8 z-20 mx-auto mt-8 max-w-5xl px-5">
      <div className="relative flex items-center justify-between gap-2 rounded-full bg-primary/90 p-3 shadow-sm backdrop-blur">
        <Button
          asChild
          variant={"secondary"}
          className="h-14 rounded-full hover:bg-white"
        >
          <Link
            className="scroll-m-20 font-mono text-xl font-semibold tracking-tight text-zinc-800"
            href={"/"}
          >
            <Image
              width={32}
              height={32}
              src="/logo.png"
              alt="Andika logo"
              className="h-8 w-8 rounded-full"
            />{" "}
            ndikaDocs
          </Link>
        </Button>

        <div className="flex items-center justify-center gap-1 max-sm:hidden">
          <Button variant={"link"} className="text-base text-white">
            <Link href="/blog">Blog</Link>
          </Button>

          <Button variant={"link"} className="text-base text-white">
            <Link href="#testimonials">Testimonials</Link>
          </Button>

          <Button variant={"link"} className="text-base text-white">
            <Link href="/contact">Contact</Link>
          </Button>
        </div>

        <Button
          className="h-14 rounded-full text-base max-sm:hidden"
          asChild
          size={"lg"}
          variant={"secondary"}
        >
          <Link href={"/auth/login"}>
            Start A Project
            <ArrowRightIcon className="ml-2 font-bold" />
          </Link>
        </Button>

        <div className="sm:hidden">
          <Button
            onClick={() => setOpenMobileMenu(!openMobileMenu)}
            variant={"outline"}
            size={"sm"}
            className="h-12 rounded-full"
          >
            {openMobileMenu ? (
              <Cross1Icon width={24} height={24} />
            ) : (
              <HamburgerMenuIcon width={24} height={24} />
            )}
          </Button>
        </div>

        {openMobileMenu && (
          <div
            className="absolute left-0 top-full mt-2 flex w-full flex-col gap-2 rounded-b-lg border-y bg-white px-6 py-8 sm:hidden"
            onClick={() => setOpenMobileMenu(false)}
          >
            <Button variant={"link"} className="justify-start text-base">
              <Link href="/blog">Blog</Link>
            </Button>

            <Button variant={"link"} className="justify-start text-base">
              <Link href="#testimonials">Testimonials</Link>
            </Button>

            <Button variant={"link"} className="justify-start text-base">
              <Link href="/contact">Contact</Link>
            </Button>
            <Button className="mt-2 w-full rounded-full text-base" size={"lg"}>
              <Link
                href={"/auth/login"}
                className="flex w-full items-center justify-center"
              >
                Start Project{" "}
                <ArrowRightIcon className="font-base ml-2 h-10 font-bold" />
              </Link>
            </Button>
          </div>
        )}
      </div>
    </header>
  );
}
