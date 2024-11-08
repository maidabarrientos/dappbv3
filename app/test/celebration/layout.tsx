export const metadata = {
  robots: 'noindex, nofollow'
};

export default function CelebrationTestLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-background">
      {children}
    </div>
  );
}