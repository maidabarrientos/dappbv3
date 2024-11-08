"use client";

import { useState } from "react";
import { Auth } from "@supabase/auth-ui-react";
import { ThemeSupa } from "@supabase/auth-ui-shared";
import { supabase } from "@/lib/supabase";
import { Card } from "@/components/ui/card";

export function AuthForm() {
  const [view, setView] = useState("sign_in");

  return (
    <Card className="w-full max-w-md p-6">
      <Auth
        supabaseClient={supabase}
        view={view}
        appearance={{
          theme: ThemeSupa,
          variables: {
            default: {
              colors: {
                brand: "hsl(var(--primary))",
                brandAccent: "hsl(var(--primary))",
              },
            },
          },
        }}
        providers={["github", "google"]}
        onViewChange={(newView) => setView(newView)}
      />
    </Card>
  );
}