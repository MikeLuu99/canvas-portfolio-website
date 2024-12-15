import "./globals.css";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Mike Luu",
  description: "Mike Luu's developer portfolio",
  keywords: ["Mike Luu, Developer, Portfolio, Software, Canvas"],
  openGraph: {
    images:
      "https://media.licdn.com/dms/image/v2/D562DAQE0LLIvkPzZLQ/profile-treasury-image-shrink_800_800/profile-treasury-image-shrink_800_800/0/1734208501757?e=1734836400&v=beta&t=WJ6obtBlYYIt7HW9wF112Ik9hpUMCf1XHIxKUY4Phtc",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link
          href="https://fonts.googleapis.com/css2?family=IBM+Plex+Mono&family=Playfair+Display+Mono&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className={inter.className}>{children}</body>
    </html>
  );
}
