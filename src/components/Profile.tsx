"use client";

export default function Profile() {
  return (
    <div className="mb-8 p-5 bg-white dark:bg-transparent border border-[#d0d7de] dark:border-gray-800 rounded-lg">
      <div className="flex items-center gap-4 mb-3">
        <div className="relative w-12 h-12 rounded-full border-2 overflow-hidden border-[#8250df] bg-[#f3e8ff] flex-shrink-0 flex items-center justify-center text-[#8250df] dark:text-emerald-400 text-lg font-semibold dark:ring-2 dark:ring-emerald-500/30 dark:ring-offset-2 dark:ring-offset-[#0d1117] dark:border-emerald-500/40">
          <img
            src="/images/avatar.jpg"
            alt="头像"
            className="absolute inset-0 w-full h-full rounded-full object-cover"
            onError={(e) => {
              (e.target as HTMLImageElement).style.display = "none";
            }}
          />
          A
        </div>
        <div>
          <h1 className="text-base font-semibold text-[#1f2328] dark:text-gray-100">
            安歌
          </h1>
          <p className="text-xs text-[#656d76] dark:text-gray-400 mt-0.5">
            全栈开发者，热爱技术与分享。
          </p>
        </div>
      </div>

      <div className="flex items-center gap-4 text-xs text-[#656d76] dark:text-gray-400 ml-16">
        <a
          href="https://github.com/ange-zxa"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1 hover:text-[#0550ae] dark:hover:text-gray-300 transition-colors"
        >
          <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
          </svg>
          github.com/ange-zxa
        </a>
        <span className="inline-flex items-center gap-1">
          <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <rect x="2" y="4" width="20" height="16" rx="2" />
            <path d="M22 4L12 13 2 4" />
          </svg>
          2356377085@qq.com
        </span>
      </div>
    </div>
  );
}
