import Link from "next/link";

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
    </nav>
  );
}
