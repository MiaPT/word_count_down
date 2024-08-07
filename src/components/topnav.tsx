import Link from "next/link";

export function TopNav() {
  return (
    <nav className="flex w-full items-center border-b p-4 text-xl font-semibold">
      <Link href={"/"} className="mr-5">
        <span className="bg-gradient-to-r from-[#70d6ff] via-[#ff70a6] to-[#ff9770] bg-clip-text text-4xl text-transparent">
          Home
        </span>
      </Link>
      <Link href={"/archive"} className="mr-5">
        <span className="bg-gradient-to-r from-[#ff9770] via-[#ff70a6] to-[#70d6ff] bg-clip-text text-2xl text-transparent">
          Archive
        </span>
      </Link>
    </nav>
  );
}
