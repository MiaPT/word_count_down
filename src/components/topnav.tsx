import Link from "next/link";

export function TopNav() {
  return (
    <nav className="flex w-full items-center border-b p-4 text-xl font-semibold">
      <Link href={"/"} className="mr-5">
        Home
      </Link>
    </nav>
  );
}
