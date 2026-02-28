import type { Metadata, Viewport } from 'next';

export const metadata: Metadata = {
  title: 'Login - Portfolio Admin',
  description: 'Admin login for portfolio management',
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  userScalable: true,
};

export default function LoginLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="min-h-screen flex items-center justify-center bg-background">
      {children}
    </div>
  );
}