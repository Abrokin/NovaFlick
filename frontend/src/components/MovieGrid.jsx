export default function MovieGrid({ children }) {
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-6 p-8">
      {children}
    </div>
  );
}