import { Big_Shoulders_Display, Great_Vibes, Roboto } from "next/font/google";



export const bigShoulderDisplay = Big_Shoulders_Display({
    weight: "400",
    subsets: ['latin'],
    variable: '--font-big-shoulders-display',
    display: 'swap',
    fallback: ['Helvetica', 'sans-serif'],
    preload: true,
    adjustFontFallback: true,
})


export const greatVibes = Great_Vibes({
    weight: "400",
    subsets: ['latin'],
    variable: '--font-great-vibes',
    display: 'swap',
    fallback: ['Helvetica', 'sans-serif'],
    preload: true,
    adjustFontFallback: true,
})

export const robotoFont = Roboto({
    weight: "400",
    subsets: ['latin'],
    variable: '--font-roboto',
    display: 'swap',
    fallback: ['Helvetica', 'sans-serif'],
    preload: true,
    adjustFontFallback: true,
})