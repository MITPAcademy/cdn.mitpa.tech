import { Fredoka } from "next/font/google";
import { Montserrat } from "next/font/google";

export const fredoka = Fredoka({
    subsets: ["latin"],
    weight: "400",
    variable: "--font-fredoka",
    display: "swap",
});

export const montserrat = Montserrat({
    subsets: ["latin"],
    weight: ["400", "700"],
    variable: "--font-montserrat",
    display: "swap",
});
