import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

export function sleep(ms: number) {
    return new Promise((resolve) => setTimeout(resolve, ms));
}

export function scrollToSection(sectionID: string) {
    const el = document.getElementById(sectionID);
    if (el) {
        el.scrollIntoView({ behavior: 'smooth' });
    }
}

export function isExternalLink(path: string): boolean {
    return path.startsWith('http://') || path.startsWith('https://');
}
