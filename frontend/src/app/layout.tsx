import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import { getCategories } from "@/lib/strapi";
import "./globals.css";

export const metadata: Metadata = {
  title: "Online Magazine",
  description: "Your go-to source for articles, news, and stories",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  let categories: import("@/types/strapi").Category[] = [];
  try {
    const res = await getCategories();
    categories = res.data ?? [];
  } catch {
    // Strapi may not be running during build; gracefully degrade
  }

  return (
    <html lang="en">
      <body>
        <Navbar categories={categories} />
        <main>{children}</main>
        <footer className="site-footer">
          <p>© {new Date().getFullYear()} Online Magazine. Powered by Strapi &amp; Next.js</p>
        </footer>
      </body>
    </html>
  );
}
