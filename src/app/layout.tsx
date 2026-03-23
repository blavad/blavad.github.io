import type { Metadata } from 'next';
import type { ReactNode } from 'react';
import Providers from '../components/Providers';
import '../font.css';
import '../index.css';
import '../App.css';

export const metadata: Metadata = {
    title: 'David Albert',
    description: 'Portfolio de David Albert — Développeur & Enseignant',
};

export default function RootLayout({ children }: { children: ReactNode }) {
    return (
        <html lang="fr">
            <body>
                <Providers>{children}</Providers>
            </body>
        </html>
    );
}
