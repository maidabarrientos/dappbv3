import { Metadata } from "next";
import { AuthForm } from "./components/auth-form";

export const metadata: Metadata = {
  title: "Authentication - DApp Builder",
  description: "Sign in to your DApp Builder account",
};

export default function AuthPage() {
  return (
    <div className="container flex items-center justify-center min-h-[calc(100vh-4rem)]">
      <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
        <div className="flex flex-col space-y-2 text-center">
          <h1 className="text-2xl font-semibold tracking-tight">
            Welcome to DApp Builder
          </h1>
          <p className="text-sm text-muted-foreground">
            Sign in to start building your decentralized applications
          </p>
        </div>
        <AuthForm />
      </div>
    </div>
  );
}