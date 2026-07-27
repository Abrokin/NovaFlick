export default function MovieGrid({ children }) {
  return (
    <div className="grid grid-cols-2 gap-8 md:grid-cols-3 lg:grid-cols-4 2xl:grid-cols-5">
      {children}
    </div>
  );
}