import Link from "next/link";

export default function Header() {
  return (
    <header className="max-w-2xl mx-auto px-6 py-8 flex items-center justify-between">
      <Link href="/" className="text-base font-semibold text-gray-900 dark:text-gray-100 hover:text-gray-600 dark:hover:text-gray-300 transition-colors">
        安歌
      </Link>
      <nav className="flex items-center gap-6 text-sm text-gray-500 dark:text-gray-400">
        <Link href="/" className="hover:text-gray-900 dark:text-gray-100 dark:hover:text-gray-200 transition-colors">
          文章
        </Link>
      </nav>
    </header>
  );
}
