import Link from "next/link";

interface Props {
  name: string;
  count?: number;
}

export default function TagBadge({ name, count }: Props) {
  return (
    <Link
      href={`/tags/${encodeURIComponent(name)}`}
      className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-600 hover:bg-gray-200 transition-colors"
    >
      {name}
      {count !== undefined && (
        <span className="text-gray-400">({count})</span>
      )}
    </Link>
  );
}
