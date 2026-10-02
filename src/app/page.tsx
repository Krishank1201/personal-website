import { Hero } from "@/components/Hero";

export default function HomePage() {
  return (
    <div className="relative min-h-[calc(100vh-var(--nav-height))]">
      <Hero />
    </div>
  );
}
