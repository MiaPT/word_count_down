import Link from "next/link";
import {
  SignIn,
  SignUp,
  SignedIn,
  SignedOut,
  UserButton,
  SignInButton,
  SignUpButton,
} from "@clerk/nextjs";
import { QuestionMarkCircleIcon } from "./ui/SVGIcons";
import { HoverCard, HoverCardContent, HoverCardTrigger } from "./ui/hover-card";

export function TopNav() {
  return (
    <nav className="flex w-full items-center border-b p-4 text-xl font-semibold">
      <Link href={"/"} className="mr-5">
        <span className="bg-gradient-primary bg-clip-text text-4xl text-transparent">
          Home
        </span>
      </Link>
      <Link href={"/archive"} className="mr-5">
        <span className="bg-gradient-secondary bg-clip-text text-2xl text-transparent">
          Archive
        </span>
      </Link>
      <div className="ml-auto">
        <SignedIn>
          <UserButton />
        </SignedIn>
        <SignedOut>
          <div className="flex flex-row items-center">
            <span className="bg-gradient-blue-to-pink from-[#70d6ff] to-[#ff70a6] bg-clip-text text-transparent">
              <SignInButton />
            </span>
            <span className="mx-2">or</span>
            <span className="bg-gradient-pink-to-orange bg-clip-text text-transparent">
              <SignUpButton />
            </span>
            <span className="ml-2 hover:cursor-pointer">
              <HoverCard>
                <HoverCardTrigger>
                  <QuestionMarkCircleIcon />
                </HoverCardTrigger>
                <HoverCardContent className="text-sm">
                  <p>
                    You can use this website without logging in! But by logging
                    in, your data will be saved and accessible on any device or
                    browser.
                  </p>
                </HoverCardContent>
              </HoverCard>
            </span>
          </div>
        </SignedOut>
      </div>
    </nav>
  );
}
