export default function Loading() {
  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-white bg-opacity-75 backdrop-blur-sm"
      aria-label="Carregando"
      role="status"
    >
      <div
        className="h-16 w-16 animate-spin rounded-full border-4 border-solid border-blue-600 border-t-transparent"
      ></div>
    </div>
  );
}

