import { Poppins } from "next/font/google";
import "./globals.css";
import { siteConfig } from "@/config/site";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "600", "700"], // Add the weights you need
});

export const metadata = {
  title: siteConfig.website.name,
  description: siteConfig.website.description,
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={poppins.className}>{children}</body>
    </html>
  );
}
