export default function Footer() {
  return (
    <footer className="border-t border-[#d0d7de] dark:border-gray-800 mt-8">
      <div className="max-w-2xl mx-auto px-6 py-3 flex justify-between items-center text-xs font-mono text-[#8b949e] dark:text-gray-600">
        <span>
          <span className="text-[#0550ae] dark:text-emerald-400">main</span>{" "}
          <span className="text-[#0a7e7a] dark:text-teal-400">✓</span>
        </span>
        <span>&copy; {new Date().getFullYear()} 安歌</span>
        <span>
          UTF-8 <span className="text-[#8250df] dark:text-purple-400">Prettier</span>
        </span>
      </div>
    </footer>
  );
}
