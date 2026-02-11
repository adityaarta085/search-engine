import Link from "next/link";
import { SearchBox } from "@/components/SearchBox";

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-6 text-center">
      <h1 className="text-6xl font-bold text-accent mb-4">404</h1>
      <h2 className="text-2xl font-semibold mb-6">Page Not Found</h2>
      <p className="text-muted-foreground mb-8">
        The page you are looking for doesn&apos;t exist or has been moved.
      </p>
      <SearchBox className="max-w-md mx-auto" />
      <Link href="/" className="mt-8 text-accent hover:underline">
        Back to Home
      </Link>
    </div>
  );
}
