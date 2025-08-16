// import "./globals.css";
// import Link from "next/link";

// export const metadata = {
//   title: "Hemang Patel | Portfolio",
//   description: "My personal portfolio showcasing projects and experience",
// };

// export default function RootLayout({ children }: { children: React.ReactNode }) {
//   return (
//     <html lang="en">
//       <body className="min-h-screen flex flex-col bg-zinc-950 text-gray-200">
//         {/* Navbar */}
//         <header>
//           <nav className="container mx-auto flex justify-between items-center py-4 px-6">
//             <h1 className="text-xl font-bold">HP</h1>
//             <div className="space-x-6">
//               <Link href="/">Home</Link>
//               <Link href="/about">About</Link>
//               <Link href="/experience">Experience</Link>
//               <Link href="/projects">Projects</Link>
//               <Link href="/contact">Contact</Link>
//             </div>
//           </nav>
//         </header>

//         {/* Page Content */}
//         <main className="flex-1 container mx-auto px-6 py-8">{children}</main>

//         {/* Footer */}
//         <footer className="bg-gray-100 text-center py-4 text-sm text-gray-600">
//           © {new Date().getFullYear()} Hemang Patel. All rights reserved.
//         </footer>
//       </body>
//     </html>
//   );
// }
import "./globals.css";

export const metadata = {
  title: "Hemang Patel | Portfolio",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="bg-black text-white min-h-screen">
        {children}
      </body>
    </html>
  );
}
