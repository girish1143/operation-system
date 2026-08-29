import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Company OS • 100-Agent Autonomous Enterprise Operating System',
  description: 'Hierarchical multi-agent organization with structured dialectics, multi-tier organizational memory, policy governance, and organizational learning.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="bg-slate-50 text-slate-900 antialiased min-h-screen selection:bg-indigo-500 selection:text-white">
        {children}
      </body>
    </html>
  );
}
