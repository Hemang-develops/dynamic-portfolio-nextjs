// apps/web/app/layout.tsx
import Navbar from "@/components/Navbar";
import "./globals.css";

export const metadata = {
  title: "Hemang Patel – Portfolio",
  // description: "Creative developer portfolio showcasing work and experience.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="bg-black text-white font-sans antialiased">
        <div className="relative flex flex-col min-h-screen">
          {/* Navbar */}
          <Navbar />

          {/* Page Content */}
          <main className="flex-1">{children}</main>

          {/* Footer */}
          <footer className="py-6 text-center text-sm border-t border-white/10">
            © {new Date().getFullYear()} Hemang Patel. All rights reserved.
          </footer>
        </div>
      </body>
    </html>
  );
}
