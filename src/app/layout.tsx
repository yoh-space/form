import type { Metadata } from "next";
import "./globals.css";
import { ConvexClientProvider } from "./ConvexClientProvider";

export const metadata: Metadata = {
  title: "2nd Round React Native Mentorship Program",
  description: "Pre-enrollment for 2nd Round React Native Mobile App Development Mentorship",
  icons: {
    icon: "/yotechlogo.png",
    shortcut: "/yotechlogo.png",
    apple: "/yotechlogo.png",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="antialiased">
        <ConvexClientProvider>{children}</ConvexClientProvider>
      </body>
    </html>
  );
}
