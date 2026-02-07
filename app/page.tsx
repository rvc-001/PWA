import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-6 bg-[var(--color-background)]">
      <h1 className="text-2xl font-bold text-primary mb-2">Forehand</h1>
      <p className="text-[var(--color-muted)] text-center mb-8">
        Your all-in-one tournament hub. Manage. Play. Compete.
      </p>
      <Link
        href="/auth/splash"
        className="min-h-[44px] px-6 py-3 rounded-[var(--radius-button)] bg-primary text-white font-medium"
      >
        Get Started
      </Link>
      <Link
        href="/home"
        className="mt-4 text-primary text-sm"
      >
        Go to Home →
      </Link>
    </div>
  );
}
