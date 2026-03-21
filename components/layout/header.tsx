import Link from "next/link";
import { Button } from "@/components/ui/button";

export function Header() {
  return (
    <header className="sticky top-0 z-50 border-b border-border/40 bg-background/80 backdrop-blur-xl">
      <div className="container flex h-14 items-center justify-between">
        <Link href="/" className="flex items-center gap-2">
          <span className="text-xl">&#128302;</span>
          <span className="font-semibold text-lg bg-gradient-to-r from-purple-400 to-indigo-400 bg-clip-text text-transparent">
            TaThip
          </span>
        </Link>
        <nav className="flex items-center gap-4">
          <Link href="/chat">
            <Button variant="ghost" size="sm">
              Chat
            </Button>
          </Link>
          <Link href="/auth/login">
            <Button size="sm">Sign In</Button>
          </Link>
        </nav>
      </div>
    </header>
  );
}
