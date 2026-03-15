import {
  Space_Grotesk,
  Inter,
  Fira_Code,
  Playfair_Display,
} from "next/font/google";
import "./globals.css";

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-space-grotesk",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const firaCode = Fira_Code({
  subsets: ["latin"],
  variable: "--font-fira-code",
  display: "swap",
});

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
  display: "swap",
  weight: ["400", "500", "600", "700", "800", "900"],
  style: ["normal", "italic"],
});

export const metadata = {
  title: "Aditya Patil | Software Engineer & AI Enthusiast",
  description:
    "Portfolio of Aditya Patil — Software Engineer, Full Stack Developer, and AI/ML Enthusiast.",
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      className={`${spaceGrotesk.variable} ${inter.variable} ${firaCode.variable} ${playfair.variable}`}
    >
      <body className="font-inter antialiased">{children}</body>
    </html>
  );
}
