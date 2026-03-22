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

type Translatable = Record<string, unknown> & {
    translations?: Record<string, Record<string, string | undefined>>;
};

export function getLocalizedField(item: Translatable, field: string, language: string): string {
    return item.translations?.[language]?.[field] ?? (item[field] as string) ?? '';
}
