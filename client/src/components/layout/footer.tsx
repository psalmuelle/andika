import { LinkedInLogoIcon } from "@radix-ui/react-icons";
import { Button } from "../ui/button";
import Link from "next/link";
import Image from "next/image";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="mt-8 px-[5%] py-4 text-center">
      <div className="flex flex-wrap items-center justify-center gap-2 lg:justify-between">
        <div className="">
          <Button asChild variant={"link"}>
            <Link href="/privacy-policy">Privacy Policy</Link>
          </Button>

          <Button asChild variant={"link"}>
            <Link href="/terms-of-service">Terms of Service</Link>
          </Button>
        </div>

        {/* Social Media Links */}
        <div className="flex justify-center gap-4">
          <Button variant={"ghost"} asChild>
            <a
              href="https://www.linkedin.com/company/andika-docs/"
              target="_blank"
              rel="noreferrer"
              className="flex items-center"
            >
              <LinkedInLogoIcon className="mr-1 h-8" />
              LinkedIn
            </a>
          </Button>

          <Button variant={"ghost"} asChild>
            <a
              href="https://www.facebook.com/andikadocs.tech"
              target="_blank"
              rel="noreferrer"
              className="flex items-center"
            >
              <Image
                src={"/facebook.svg"}
                width={16}
                height={16}
                className="mr-1"
                alt={"Facebook"}
              />
              Facebook
            </a>
          </Button>

          <Button variant={"ghost"} asChild>
            <a
              href="https://x.com/andika_docs"
              target="_blank"
              rel="noreferrer"
              className="flex items-center"
            >
              <Image
                src={"/x.svg"}
                width={16}
                height={16}
                alt={"X.com"}
                className="mr-1"
              />
              .com
            </a>
          </Button>
        </div>
      </div>
      {/* Main Text */}
      <p className="text-right text-xs leading-7">© {currentYear} Andika</p>
    </footer>
  );
}
