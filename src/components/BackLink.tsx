"use client";

import { useRouter } from "next/navigation";
import Link from "next/link";

interface Props {
  category: string;
}

export default function BackLink({ category }: Props) {
  const router = useRouter();

  function handleClick(e: React.MouseEvent) {
    e.preventDefault();
    if (window.history.length > 1) {
      router.back();
    } else {
      router.push(`/category/${encodeURIComponent(category)}`);
    }
  }

  return (
    <Link
      href={`/category/${encodeURIComponent(category)}`}
      onClick={handleClick}
      className="text-xs text-gray-400 hover:text-gray-600 transition-colors mb-6 inline-block"
    >
      &larr; 返回
    </Link>
  );
}
