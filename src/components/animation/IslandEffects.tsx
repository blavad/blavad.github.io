import { motion } from 'framer-motion';
import { PropsWithChildren } from 'react';

import { cn } from '~/lib/utils';
import { loop, phaseTransition, useLayer } from './FloatingIslandScene';

/** Zone d'un effet, en % de l'image de l'île (comme les boutons) */
type Area = { left: number; top: number; width: number; height: number };

const areaStyle = ({ left, top, width, height }: Area) => ({
    left: `${left}%`,
    top: `${top}%`,
    width: `${width}%`,
    height: `${height}%`,
});

// Reflets de la cascade : bandes claires anguleuses, décalées pour éviter un défilement trop régulier
const WATER_STREAKS = [
    { left: 8, width: 14, length: 22, duration: 1.6, delay: 0 },
    { left: 30, width: 10, length: 30, duration: 1.3, delay: 0.5 },
    { left: 52, width: 16, length: 18, duration: 1.8, delay: 0.2 },
    { left: 72, width: 12, length: 26, duration: 1.4, delay: 0.9 },
    { left: 18, width: 8, length: 16, duration: 1.5, delay: 1.1 },
    { left: 62, width: 9, length: 20, duration: 1.2, delay: 0.7 },
];

/** Reflet low-poly : triangle étiré, pointe vers le bas */
const STREAK_SHAPE = 'polygon(0% 0%, 100% 0%, 60% 100%)';

/** Cascade animée : des reflets descendent le long de l'eau et s'estompent dans le vide */
export function Waterfall(area: Area) {
    const { active, filter } = useLayer();
    return (
        <div
            className="pointer-events-none absolute overflow-hidden"
            style={{
                ...areaStyle(area),
                // L'eau se dissout en bas, comme sur l'image
                maskImage: 'linear-gradient(to bottom, black 70%, transparent)',
            }}
        >
            {WATER_STREAKS.map((streak, i) => (
                <motion.span
                    key={i}
                    className={cn('absolute top-0 bg-white/60', filter)}
                    style={{
                        left: `${streak.left}%`,
                        width: `${streak.width}%`,
                        height: `${streak.length}%`,
                        clipPath: STREAK_SHAPE,
                    }}
                    initial={{ y: '-100%' }}
                    // Translation en % du reflet (pas `top`, qui recalculerait la mise en page à chaque image) :
                    // de juste au-dessus de la cascade à juste en dessous
                    {...loop(
                        active,
                        { y: ['-100%', `${10000 / streak.length}%`] },
                        { duration: streak.duration, delay: streak.delay, ease: 'easeIn' }
                    )}
                />
            ))}
        </div>
    );
}

const SMOKE_PUFFS = 4;
const SMOKE_DURATION = 5;

/** Bouffée low-poly : hexagone irrégulier */
const PUFF_SHAPE = 'polygon(25% 0%, 80% 8%, 100% 50%, 75% 100%, 20% 92%, 0% 45%)';

/**
 * Cheminée low-poly posée sur un toit, avec des bouffées de fumée qui montent, grossissent et dérivent vers la droite.
 * `area` est la zone de la cheminée elle-même.
 */
export function ChimneySmoke(area: Area) {
    const { active, filter } = useLayer();
    return (
        <div className="pointer-events-none absolute" style={areaStyle(area)}>
            {/* Cheminée : face avant claire, côté et chapeau plus sombres */}
            <svg
                viewBox="0 0 10 16"
                preserveAspectRatio="none"
                className={cn('absolute inset-0 h-full w-full', filter)}
            >
                <polygon points="0,3 6,3 6,16 0,15" fill="#d9bfa0" />
                <polygon points="6,3 10,2 10,14 6,16" fill="#b4967a" />
                <polygon points="0,3 4,1.5 10,2 6,3" fill="#8e6f5c" />
            </svg>

            {/* Fumée : part du haut de la cheminée */}
            {Array.from({ length: SMOKE_PUFFS }, (_, i) => (
                <motion.span
                    key={i}
                    className={cn('absolute left-1/2 aspect-square w-[90%] bg-white/80', filter)}
                    style={{ clipPath: PUFF_SHAPE, top: '-20%' }}
                    initial={{ x: '-50%', y: 0, scale: 0.4, opacity: 0, rotate: 0 }}
                    {...loop(
                        active,
                        {
                            x: ['-50%', '-20%', '60%'],
                            y: ['0%', '-180%', '-420%'],
                            scale: [0.4, 1, 1.8],
                            opacity: [0, 0.85, 0],
                            rotate: [0, 40, 90],
                        },
                        {
                            duration: SMOKE_DURATION,
                            delay: (i * SMOKE_DURATION) / SMOKE_PUFFS,
                            ease: 'easeOut',
                        }
                    )}
                />
            ))}
        </div>
    );
}

/** Sprite détouré d'une île (oiseau, note…) : `left`, `top` et `width` en % de l'image de l'île */
type SpriteProps = {
    src: string;
    left: number;
    top: number;
    width: number;
    delay?: number;
    className?: string;
};

const spriteStyle = ({ left, top, width }: SpriteProps) => ({
    left: `${left}%`,
    top: `${top}%`,
    width: `${width}%`,
});

/** Disparaît en fondu la nuit (oiseaux et notes dorment) */
function DaytimeOnly({ children }: PropsWithChildren) {
    const { phase, instantPhase } = useLayer();
    return (
        <motion.div
            className="absolute inset-0"
            initial={false}
            animate={{ opacity: phase === 'night' ? 0 : 1 }}
            transition={phaseTransition(instantPhase)}
        >
            {children}
        </motion.div>
    );
}

/** Animation en cours seulement si le calque est visible et qu'il fait jour */
const useDaytimeActive = () => {
    const { active, phase } = useLayer();
    return active && phase !== 'night';
};

/** Oiseau : vol sur place en boucle (petit huit), avec un battement d'ailes suggéré par un écrasement vertical */
export function Bird(props: SpriteProps) {
    const { filter } = useLayer();
    const active = useDaytimeActive();
    const delay = props.delay ?? 0;
    return (
        <DaytimeOnly>
            <motion.div
                className="absolute"
                style={spriteStyle(props)}
                {...loop(
                    active,
                    {
                        x: ['0%', '25%', '0%', '-25%', '0%'],
                        y: ['0%', '-20%', '10%', '-15%', '0%'],
                    },
                    { duration: 7, delay, ease: 'easeInOut' }
                )}
            >
                {/* Battement d'ailes et balancement, à des rythmes différents : deux éléments imbriqués */}
                <motion.div
                    {...loop(
                        active,
                        { rotate: [-4, 4, -4] },
                        { duration: 3.5, delay, ease: 'easeInOut' }
                    )}
                >
                    <motion.img
                        className={cn('block h-auto w-full', filter, props.className)}
                        src={props.src}
                        alt=""
                        draggable={false}
                        {...loop(
                            active,
                            { scaleY: [1, 0.8, 1] },
                            { duration: 0.5, delay, ease: 'easeInOut' }
                        )}
                    />
                </motion.div>
            </motion.div>
        </DaytimeOnly>
    );
}

/** Note de musique : danse en rythme (montée, balancement et léger rebond) */
export function MusicNote(props: SpriteProps) {
    const { filter } = useLayer();
    const active = useDaytimeActive();
    return (
        <DaytimeOnly>
            <motion.img
                className={cn('absolute block h-auto', filter, props.className)}
                style={spriteStyle(props)}
                src={props.src}
                alt=""
                draggable={false}
                {...loop(
                    active,
                    { y: ['0%', '-30%', '0%'], rotate: [-10, 10, -10], scale: [1, 1.12, 1] },
                    { duration: 2.4, delay: props.delay ?? 0, ease: 'easeInOut' }
                )}
            />
        </DaytimeOnly>
    );
}
