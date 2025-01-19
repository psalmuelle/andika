"use client";
import Link from "next/link";
import React, { useState } from "react";
import { Button } from "../ui/button";
import {
  ArrowRightIcon,
  HamburgerMenuIcon,
  Cross1Icon,
} from "@radix-ui/react-icons";
import { cn } from "@/lib/utils";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "../ui/navigation-menu";
import { components } from "@/constant/nav";

export default function Header() {
  const [openMobileMenu, setOpenMobileMenu] = useState(false);

  return (
    <header className="sticky top-0 z-20 bg-white/70 px-[5%] py-3 shadow-sm backdrop-blur">
      <div className="relative flex items-center justify-between gap-2">
        <Link
          className="scroll-m-20 font-mono text-xl font-semibold tracking-tight text-zinc-800"
          href={"/"}
        >
          Andika
        </Link>

        <div className="flex items-center justify-center gap-4 max-sm:hidden">
          <NavigationMenu>
            <NavigationMenuList>
              <NavigationMenuItem>
                <NavigationMenuTrigger className="bg-transparent">
                  Services
                </NavigationMenuTrigger>
                <NavigationMenuContent>
                  <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px]">
                    {components.map((component) => (
                      <ListItem
                        key={component.title}
                        title={component.title}
                        href={component.href}
                      >
                        {component.description}
                      </ListItem>
                    ))}
                  </ul>
                </NavigationMenuContent>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <Link href="/blog" legacyBehavior passHref>
                  <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                    Blog
                  </NavigationMenuLink>
                </Link>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <Link href="/contact" legacyBehavior passHref>
                  <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                    Contact
                  </NavigationMenuLink>
                </Link>
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>
        </div>

        <Button className="rounded-full max-sm:hidden" asChild size={"lg"}>
          <Link href={"/auth/login"}>
            Start Project <ArrowRightIcon className="ml-2 font-bold" />
          </Link>
        </Button>

        <div className="sm:hidden">
          <Button
            onClick={() => setOpenMobileMenu(!openMobileMenu)}
            variant={"outline"}
            size={"icon"}
          >
            {openMobileMenu ? <Cross1Icon /> : <HamburgerMenuIcon />}
          </Button>
        </div>

        {openMobileMenu && (
          <div
            className="absolute left-0 top-full mt-3 flex w-full flex-col gap-2 rounded-b-lg border-y bg-white px-6 py-8 sm:hidden"
            onClick={() => setOpenMobileMenu(false)}
          >
            <Button variant={"link"}>
              <Link href="/blog">Blog</Link>
            </Button>
            <Button variant={"link"}>
              <Link href="/contact">Contact</Link>
            </Button>
            <Button className="mt-2 w-full rounded-full" size={"lg"}>
              <Link
                href={"/auth/login"}
                className="flex w-full items-center justify-center"
              >
                Start Project <ArrowRightIcon className="ml-2 font-bold" />
              </Link>
            </Button>
          </div>
        )}
      </div>
    </header>
  );
}

const ListItem = React.forwardRef<
  React.ElementRef<"a">,
  React.ComponentPropsWithoutRef<"a">
>(({ className, title, children, ...props }, ref) => {
  return (
    <li>
      <NavigationMenuLink asChild>
        <a
          ref={ref}
          className={cn(
            "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
            className,
          )}
          {...props}
        >
          <div className="text-sm font-medium leading-none">{title}</div>
          <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
            {children}
          </p>
        </a>
      </NavigationMenuLink>
    </li>
  );
});
ListItem.displayName = "ListItem";
