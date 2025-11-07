export default function JobBoard({ children }) {
  return (
    <main className="bg-light-grayish-cyan-bg min-h-screen">
      <ul className="max-w-7xl mx-auto py-16 px-6 space-y-9 md:space-y-6">
        {children}
      </ul>
    </main>
  );
}
