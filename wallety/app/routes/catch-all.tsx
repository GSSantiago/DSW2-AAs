import type { Route } from "./+types/catch-all";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Not Found - Wallety" },
    { name: "description", content: "Page not found" },
  ];
}

export default function CatchAll() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="text-center">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">404</h1>
        <p className="text-gray-600 mb-8">Page not found</p>
        <a
          href="/"
          className="inline-block bg-primary text-white px-6 py-2 rounded-md hover:bg-primary-dark transition-colors"
        >
          Go Home
        </a>
      </div>
    </div>
  );
}
