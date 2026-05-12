export default function Footer() {
  return (
    <footer className="border-t border-gray-200 bg-white mt-auto">
      <div className="max-w-4xl mx-auto px-4 h-14 flex items-center justify-center text-sm text-gray-400">
        &copy; {new Date().getFullYear()} My Blog. Powered by Next.js.
      </div>
    </footer>
  );
}
