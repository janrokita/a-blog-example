import Link from "next/link";

export function Header() {
  return (
    <header className="flex flex-col gap-4 pt-8">
      <Link className="text-5xl font-bold font-serif hover:underline" href="/">
        A Blog
      </Link>
      <p>This is an example blog for Graham.</p>
    </header>
  );
}
