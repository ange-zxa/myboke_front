import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Footer from "@/components/Footer";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "安歌 - 个人博客",
  description: "分享技术文章与生活感悟",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="zh-CN"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-[#f6f8fa] dark:bg-[#0d1117] text-[#1f2328] dark:text-[#e6edf3] relative overflow-x-hidden">

        {/* 暗色模式：背景代码符号 */}
        <div className="fixed inset-0 pointer-events-none select-none overflow-hidden z-0 hidden dark:block" aria-hidden="true">
          <span className="absolute top-[12%] left-[4%] text-[6rem] font-mono text-gray-600/8">{'{'}</span>
          <span className="absolute top-[25%] left-[6%] text-[4rem] font-mono text-gray-600/6">{'<>'}</span>
          <span className="absolute top-[50%] left-[3%] text-[5rem] font-mono text-gray-600/7">{'//'}</span>
          <span className="absolute top-[72%] left-[7%] text-[3.5rem] font-mono text-gray-600/6">{'const'}</span>
          <span className="absolute top-[88%] left-[5%] text-[7rem] font-mono text-gray-600/5">{'@'}</span>
          <span className="absolute top-[15%] right-[5%] text-[7rem] font-mono text-gray-600/5">{'}'}</span>
          <span className="absolute top-[32%] right-[3%] text-[4.5rem] font-mono text-gray-600/7">{'=>'}</span>
          <span className="absolute top-[55%] right-[6%] text-[5.5rem] font-mono text-gray-600/6">{'</>'}</span>
          <span className="absolute top-[70%] right-[4%] text-[3rem] font-mono text-gray-600/8">{'/*'}</span>
          <span className="absolute top-[85%] right-[7%] text-[6rem] font-mono text-gray-600/6">{';'}</span>
        </div>

        {/* 亮色模式：行号侧栏 */}
        <div className="fixed left-0 top-0 bottom-0 w-[50px] pointer-events-none select-none z-0 hidden dark:hidden xl:flex flex-col items-end pr-[10px] pt-[8rem] font-mono text-xs text-[#c8cdd4] leading-[2.1]" aria-hidden="true">
          {Array.from({ length: 30 }, (_, i) => (
            <span key={i}>{i + 1}</span>
          ))}
        </div>

        <main className="flex-1 relative z-10">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
