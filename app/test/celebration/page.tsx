"use client";

import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { CelebrationAnimation } from "@/components/celebration-animation";

export default function CelebrationTestPage() {
  const [showCelebration, setShowCelebration] = useState(false);

  const triggerCelebration = () => {
    setShowCelebration(true);
  };

  return (
    <div className="container py-10">
      <CelebrationAnimation 
        show={showCelebration} 
        onComplete={() => setShowCelebration(false)} 
      />

      <div className="max-w-2xl mx-auto space-y-6">
        <Card className="p-6">
          <h1 className="text-2xl font-bold mb-4">
            Celebration Animation Test
          </h1>
          
          <div className="space-y-4">
            <p className="text-muted-foreground">
              Click the button below to trigger the celebration animation.
            </p>

            <Button 
              size="lg" 
              onClick={triggerCelebration}
              disabled={showCelebration}
            >
              {showCelebration ? "Celebrating..." : "Trigger Celebration"}
            </Button>
          </div>
        </Card>

        <Card className="p-6">
          <h2 className="text-xl font-semibold mb-4">Animation Details</h2>
          <ul className="list-disc list-inside space-y-2 text-muted-foreground">
            <li>Falling token coins animation</li>
            <li>Confetti explosion effect</li>
            <li>Congratulations message with scale effect</li>
            <li>3 seconds duration</li>
            <li>Automatic cleanup</li>
            <li>Non-blocking UI (pointer-events disabled)</li>
          </ul>
        </Card>
      </div>
    </div>
  );
}