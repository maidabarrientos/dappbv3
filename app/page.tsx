import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[calc(100vh-4rem)] p-4">
      <div className="max-w-3xl text-center space-y-6">
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold">
          Build DApps Without Code
        </h1>
        <p className="text-xl text-muted-foreground">
          Create token sales, airdrops, exchanges, and authentication systems with our no-code builder.
        </p>
        <div className="flex flex-wrap justify-center gap-4">
          <Button asChild size="lg">
            <Link href="/dapps/token-sale">
              Launch Token Sale
            </Link>
          </Button>
          <Button asChild size="lg" variant="outline">
            <Link href="/dashboard">
              View Dashboard
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
}