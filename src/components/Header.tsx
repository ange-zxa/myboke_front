import Link from "next/link";

export default function Header() {
  return (
    <header className="max-w-2xl mx-auto px-6 py-8 flex items-center justify-between">
      <Link href="/" className="text-base font-semibold text-gray-900 hover:text-gray-600 transition-colors">
        ange-zxa
      </Link>
      <nav className="flex items-center gap-6 text-sm text-gray-500">
        <Link href="/" className="hover:text-gray-900 transition-colors">
          文章
        </Link>
      </nav>
    </header>
  );
}
