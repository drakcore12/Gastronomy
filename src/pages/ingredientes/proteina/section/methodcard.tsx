export default function MethodCard({
  title,
  body,
}: {
  title: string;
  body: string;
}) {
  return (
    <div className="rounded-2xl border border-amber-200 bg-white p-5 shadow-sm">
      <h3 className="text-base font-semibold text-amber-900">{title}</h3>
      <p className="mt-2 text-sm text-amber-900/80">{body}</p>
    </div>
  );
}
