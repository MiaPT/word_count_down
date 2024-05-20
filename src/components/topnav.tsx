import Link from "next/link";

export function TopNav() {
  return (
    <nav className="flex w-full items-center border-b p-4 text-xl font-semibold">
      <Link href={"/"} className="mr-5">
        <span className="text-4xl bg-gradient-to-r from-[#70d6ff] via-[#ff70a6] to-[#ff9770] text-transparent bg-clip-text">
          Home
        </span>
      </Link>
    </nav>
  );
}
