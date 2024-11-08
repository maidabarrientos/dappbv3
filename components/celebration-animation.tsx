"use client";

import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Coins } from 'lucide-react';
import confetti from 'canvas-confetti';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

interface CelebrationAnimationProps {
  show: boolean;
  onComplete: () => void;
}

export function CelebrationAnimation({ show, onComplete }: CelebrationAnimationProps) {
  const [tokens, setTokens] = useState<{ id: number; x: number; delay: number }[]>([]);
  const [showDialog, setShowDialog] = useState(false);

  useEffect(() => {
    if (show) {
      // Create falling tokens
      const newTokens = Array.from({ length: 20 }, (_, i) => ({
        id: i,
        x: Math.random() * 100,
        delay: Math.random() * 0.5,
      }));
      setTokens(newTokens);
      setShowDialog(true);

      // Trigger confetti
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 }
      });

      // Cleanup
      const timer = setTimeout(() => {
        setShowDialog(false);
        setTimeout(() => {
          onComplete();
          setTokens([]);
        }, 300);
      }, 3000);

      return () => clearTimeout(timer);
    }
  }, [show, onComplete]);

  if (!show) return null;

  return (
    <>
      <div className="fixed inset-0 pointer-events-none z-40">
        <div className="relative w-full h-full overflow-hidden">
          {tokens.map((token) => (
            <motion.div
              key={token.id}
              initial={{ y: -50, x: `${token.x}vw`, opacity: 0 }}
              animate={{ y: '100vh', opacity: 1 }}
              transition={{
                duration: 2,
                delay: token.delay,
                ease: 'linear'
              }}
              className="absolute"
            >
              <Coins className="w-6 h-6 text-yellow-500" />
            </motion.div>
          ))}
        </div>
      </div>

      <Dialog open={showDialog} onOpenChange={() => {}}>
        <DialogContent className="bg-white/90 dark:bg-gray-800/90">
          <DialogHeader>
            <DialogTitle className="text-center">
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring", duration: 0.5 }}
              >
                🎉 Congratulations! 🎉
              </motion.div>
            </DialogTitle>
          </DialogHeader>
          <motion.p
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-center text-lg text-muted-foreground"
          >
            Your deployment was successful!
          </motion.p>
        </DialogContent>
      </Dialog>
    </>
  );
}