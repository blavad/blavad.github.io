import { useEffect, useLayoutEffect, useRef, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { X } from 'lucide-react';
import { useTranslation } from 'react-i18next';

import { cn, isExternalLink } from '~/lib/utils';
import topics from '~/data/topics.json';
import useNavigate from '~/hooks/useNavigate';
import { useMenu } from '~/stores/useMenu';

import styles from './HomeContent.module.css';

const SCENE_MARGIN = 16; // Marge minimale entre la carte et les bords de la scène
const GAP_ABOVE = 56; // Distance entre le point d'ancrage et la carte placée au-dessus (bouton soulevé au survol)
const GAP_BELOW = 50; // Distance entre le point d'ancrage et la carte placée en dessous (sous l'étiquette du bouton)
const CORNER_INSET = 40; // Distance entre le point d'ancrage et le bord de la carte qui s'étend d'un côté

/**
 * Côtés vers lesquels la carte s'ouvre depuis son point d'ancrage (par défaut : au-dessus s'il y a la place,
 * centrée horizontalement). `y: 'center'` centre la carte sur le point (ancrage fixe, hors bouton).
 */
export type CardDirection = { y?: 'above' | 'below' | 'center'; x?: 'left' | 'right' };

type Placement = { left: number; top: number; originY: string };

/**
 * Carte d'un sujet qui apparaît à côté du bouton qui l'ouvre, fermée par un clic à l'extérieur ou Échap.
 * Le parent doit être positionné : le point d'ancrage (centre du bouton) est donné par `className`.
 * La carte se place au-dessus du bouton s'il y a la place, sinon en dessous, centrée sur lui
 * (ou vers les côtés imposés par `direction`), et reste dans la scène.
 */
export function HomeContent({
    topicID,
    open,
    onClose,
    direction,
    className,
}: {
    topicID: string;
    open: boolean;
    onClose: () => void;
    direction?: CardDirection;
    className?: string;
}) {
    const { t } = useTranslation();
    const currentTopic = (topics as any)[topicID] || topics.default;
    // Description en un seul bloc ; vide pour les sujets qui n'en ont pas
    const description = t(`topics.${topicID}.description`);
    // Lien optionnel après la description : `link` dans topics.json, `linkLabel` dans les traductions
    const link: string | undefined = currentTopic.link;
    const navigate = useNavigate();
    const closeMenu = useMenu((state) => state.close);

    const anchorRef = useRef<HTMLDivElement>(null);
    const cardRef = useRef<HTMLDivElement>(null);
    const [placement, setPlacement] = useState<Placement>({ left: 0, top: 0, originY: '100%' });

    useEffect(() => {
        if (!open) return;
        const handlePointerDown = (e: PointerEvent) => {
            const target = e.target as Element;
            // Les boutons gèrent eux-mêmes le changement de sujet (ou la fermeture en recliquant)
            if (cardRef.current?.contains(target) || target.closest('.home-btn')) return;
            onClose();
        };
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === 'Escape') onClose();
        };
        document.addEventListener('pointerdown', handlePointerDown);
        window.addEventListener('keydown', handleKeyDown);
        return () => {
            document.removeEventListener('pointerdown', handlePointerDown);
            window.removeEventListener('keydown', handleKeyDown);
        };
    }, [open, onClose]);

    // Recalcule la position quand la scène (passage en plein écran) ou la carte (description) changent de taille
    useLayoutEffect(() => {
        const anchor = anchorRef.current;
        const card = cardRef.current;
        const scene = anchor?.closest('[data-scene]');
        if (!open || !anchor || !card || !scene) return;

        const place = () => {
            const a = anchor.getBoundingClientRect();
            const s = scene.getBoundingClientRect();
            // Dimensions hors transformations (l'animation d'apparition joue sur l'échelle)
            const width = card.offsetWidth;
            const height = card.offsetHeight;

            const spaceAbove = a.top - s.top - SCENE_MARGIN - GAP_ABOVE;
            const spaceBelow = s.bottom - a.top - SCENE_MARGIN - GAP_BELOW;
            const y =
                direction?.y ??
                (spaceAbove >= height || spaceAbove >= spaceBelow ? 'above' : 'below');
            // Centrée sur le bouton, ou ouverte d'un côté avec le bouton près de son coin
            const left =
                direction?.x === 'right'
                    ? -CORNER_INSET
                    : direction?.x === 'left'
                      ? CORNER_INSET - width
                      : -width / 2;

            const clamp = (value: number, min: number, max: number) =>
                Math.max(min, Math.min(value, max));
            setPlacement({
                // L'animation d'apparition part du point d'ancrage
                originY: { above: '100%', below: '0%', center: '50%' }[y],
                left: clamp(
                    left,
                    s.left + SCENE_MARGIN - a.left,
                    s.right - SCENE_MARGIN - width - a.left
                ),
                top: clamp(
                    { above: -GAP_ABOVE - height, below: GAP_BELOW, center: -height / 2 }[y],
                    s.top + SCENE_MARGIN - a.top,
                    s.bottom - SCENE_MARGIN - height - a.top
                ),
            });
        };

        place();
        const observer = new ResizeObserver(place);
        observer.observe(scene);
        observer.observe(card);
        return () => observer.disconnect();
    }, [open, direction?.x, direction?.y]);

    return (
        <div
            ref={anchorRef}
            // Au-dessus des boutons de l'île (`.home-btn` est en z-index 1000)
            className={cn('absolute z-1001 h-0 w-0', className)}
        >
            <AnimatePresence>
                {open && (
                    <motion.div
                        ref={cardRef}
                        className="absolute w-[min(22rem,calc(100cqw-2rem))] rounded-3xl p-1 shadow-xl"
                        style={{
                            left: placement.left,
                            top: placement.top,
                            transformOrigin: `${-placement.left}px ${placement.originY}`,
                            background: `var(--color-gradient-${currentTopic.color})`,
                        }}
                        initial={{ opacity: 0, scale: 0.6 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.6 }}
                        transition={{ duration: 0.25, ease: 'easeOut' }}
                    >
                        <button
                            className="absolute top-3 right-3 z-10 flex h-8 w-8 cursor-pointer items-center justify-center rounded-full bg-surface shadow-md"
                            onClick={onClose}
                            aria-label={t('hero.closeCard')}
                        >
                            <X size={18} />
                        </button>
                        <div className="h-full w-full rounded-3xl bg-surface/95 px-7 py-4 text-left">
                            <h2 className={styles.title}>{t(`topics.${topicID}.title`)}</h2>
                            <p
                                className={cn(styles.subtitle, 'bg-clip-text')}
                                style={{
                                    backgroundImage: `var(--color-gradient-${currentTopic.color})`,
                                    // En style plutôt qu'en classe : la couleur de `.subtitle` l'emporterait
                                    // et se dessinerait par-dessus le dégradé
                                    color: 'transparent',
                                }}
                            >
                                {t(`topics.${topicID}.subtitle`)}
                            </p>
                            {description && (
                                <motion.p
                                    className={styles.description}
                                    initial={{ opacity: 0, y: 4 }}
                                    animate={{ opacity: 1, y: 0 }}
                                >
                                    {description}
                                </motion.p>
                            )}
                            {link && (
                                <a
                                    className={styles.link}
                                    href={link}
                                    // Lien externe : nouvel onglet ; lien interne : navigation du site (avec écran de chargement)
                                    {...(isExternalLink(link)
                                        ? { target: '_blank', rel: 'noopener noreferrer' }
                                        : {
                                              onClick: (e) => {
                                                  e.preventDefault();
                                                  // Le plein écran du Hero ouvre le menu en mode « hero » : on le referme,
                                                  // sinon la page suivante garde la navbar masquée et la croix du menu
                                                  closeMenu();
                                                  navigate(link);
                                              },
                                          })}
                                    style={{
                                        backgroundImage: `var(--color-gradient-${currentTopic.color})`,
                                    }}
                                >
                                    {t(`topics.${topicID}.linkLabel`)} →
                                </a>
                            )}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}
