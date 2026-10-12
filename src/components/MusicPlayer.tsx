import { useEffect } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { X } from 'lucide-react';
import { useTranslation } from 'react-i18next';

import { cn } from '~/lib/utils';
import { SPOTIFY_PLAYLIST_ID } from '~/config/global';

// Couleurs extrêmes du dégradé des facettes (celui du thème "music" : jaune → rouge)
const FACET_FROM = [0xd7, 0xc3, 0x2a];
const FACET_TO = [0xff, 0x56, 0x7b];
const FACET_COLS = 4;
const FACET_ROWS = 6;

/** Fond low-poly : une grille de triangles dont la teinte suit le dégradé, avec une légère variation par facette */
const LOW_POLY_BACKGROUND = (() => {
    // Pseudo-aléatoire déterministe : le motif reste identique d'un rendu à l'autre
    let seed = 7;
    const random = () => {
        seed = (seed * 16807) % 2147483647;
        return seed / 2147483647;
    };

    const color = (t: number) => {
        const shade = 0.88 + random() * 0.24;
        const [r, g, b] = FACET_FROM.map((from, i) =>
            Math.min(255, Math.round((from + (FACET_TO[i] - from) * t) * shade))
        );
        return `rgb(${r},${g},${b})`;
    };

    const polygons: string[] = [];
    for (let row = 0; row < FACET_ROWS; row++) {
        for (let col = 0; col < FACET_COLS; col++) {
            const [x0, y0, x1, y1] = [col, row, col + 1, row + 1];
            // Position le long de la diagonale (bas gauche → haut droit), comme le dégradé à -40deg
            const t = (col / FACET_COLS + (FACET_ROWS - row) / FACET_ROWS) / 2;
            // Alterne le sens de la diagonale pour casser la régularité de la grille
            const [a, b] =
                (row + col) % 2 === 0
                    ? [`${x0},${y0} ${x1},${y0} ${x0},${y1}`, `${x1},${y0} ${x1},${y1} ${x0},${y1}`]
                    : [
                          `${x0},${y0} ${x1},${y0} ${x1},${y1}`,
                          `${x0},${y0} ${x1},${y1} ${x0},${y1}`,
                      ];
            polygons.push(`<polygon points="${a}" fill="${color(t)}"/>`);
            polygons.push(`<polygon points="${b}" fill="${color(t + 0.05)}"/>`);
        }
    }

    const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${FACET_COLS} ${FACET_ROWS}" preserveAspectRatio="none" shape-rendering="crispEdges">${polygons.join('')}</svg>`;
    return `url("data:image/svg+xml,${encodeURIComponent(svg)}") center / 100% 100%`;
})();

/**
 * Lecteur Spotify qui se déploie vers le haut depuis le point d'ancrage (le bouton qui l'ouvre).
 * Le parent doit être positionné : le lecteur est centré horizontalement sur `className`.
 */
export function MusicPlayer({
    open,
    onClose,
    className,
}: {
    open: boolean;
    onClose: () => void;
    className?: string;
}) {
    const { t } = useTranslation();

    useEffect(() => {
        if (!open) return;
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === 'Escape') onClose();
        };
        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [open, onClose]);

    return (
        <AnimatePresence>
            {open && (
                <motion.div
                    className={cn(
                        // Ancré en bas au centre : l'animation part du bouton et monte
                        'absolute z-20 w-75 origin-bottom -translate-x-1/2 -translate-y-full',
                        className
                    )}
                    initial={{ opacity: 0, scaleY: 0, scaleX: 0.6 }}
                    animate={{ opacity: 1, scaleY: 1, scaleX: 1 }}
                    exit={{ opacity: 0, scaleY: 0, scaleX: 0.6 }}
                    transition={{ duration: 0.35, ease: 'easeOut' }}
                >
                    {/* Cadre à facettes, bordé de blanc comme les boutons de l'île */}
                    <div
                        className="relative rounded-3xl border-3 border-white p-2.5 shadow-xl"
                        style={{ background: LOW_POLY_BACKGROUND }}
                    >
                        <button
                            className="absolute -top-3 -right-3 z-10 flex h-8 w-8 cursor-pointer items-center justify-center rounded-full bg-surface shadow-md"
                            onClick={onClose}
                            aria-label={t('topics.music.closePlayer')}
                        >
                            <X size={18} />
                        </button>
                        <iframe
                            className="block h-[min(380px,55cqh)] w-full rounded-xl"
                            src={`https://open.spotify.com/embed/playlist/${SPOTIFY_PLAYLIST_ID}?utm_source=generator&theme=0`}
                            title="Spotify"
                            allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
                            loading="lazy"
                        />
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}
