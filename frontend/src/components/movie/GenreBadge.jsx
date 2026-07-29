export default function GenreBadge({ name }) {
  return (
    <span className="rounded-full border border-purple-500/30 bg-purple-500/10 px-4 py-2 text-sm font-medium text-purple-300">
      {name}
    </span>
  );
}