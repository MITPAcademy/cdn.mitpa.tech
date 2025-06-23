import "./globals.css";
import { fredoka, montserrat } from "./lib/fonts";

export const metadata = {
    title: "MITPA CDN - Working",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
    return (
        <html lang="en" className={`${fredoka.variable} ${montserrat.variable}`}>
        <body>{children}</body>
        </html>
    );
}
