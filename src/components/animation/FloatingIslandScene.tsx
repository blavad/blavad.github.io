import {
    motion,
    MotionValue,
    Transition,
    useInView,
    useMotionValue,
    useTransform,
} from 'framer-motion';
import { createContext, PropsWithChildren, ReactNode, useContext, useEffect, useRef } from 'react';
import { cn } from '~/lib/utils';

const BG_WIDTH = 95; // Largeur de la scène (vw)
const BG_HEIGHT = 82; // Hauteur de la scène (dvh)

export type SkyPhase = 'dawn' | 'day' | 'dusk' | 'night';

type SceneContextValue = {
    mouseX: MotionValue<number>;
    mouseY: MotionValue<number>;
    phase: SkyPhase;
};

const SceneContext = createContext<SceneContextValue | null>(null);

type LayerContextValue = {
    // Faux quand le calque est hors écran ou masqué (ex. sur mobile)
    active: boolean;
    // Classes de lumière du moment de la journée, à appliquer aux éléments animés du calque
    filter: string;
    phase: SkyPhase;
};

const LayerContext = createContext<LayerContextValue>({ active: true, filter: '', phase: 'day' });

/** État du calque courant, pour les effets passés dans `effects` */
export const useLayer = () => useContext(LayerContext);

type Keyframes = Record<string, (string | number)[]>;

/**
 * Props d'une animation en boucle, suspendue quand `active` est faux : l'élément revient alors en douceur
 * à sa pose de départ (première image clé) et ne consomme plus rien.
 */
export function loop(active: boolean, keyframes: Keyframes, transition: Transition) {
    if (active) return { animate: keyframes, transition: { ...transition, repeat: Infinity } };
    const rest = Object.fromEntries(
        Object.entries(keyframes).map(([key, values]) => [key, values[0]])
    );
    return { animate: rest, transition: { duration: 0.6, ease: 'easeOut' } as Transition };
}

const PHASE_TRANSITION = { duration: 2, ease: 'easeInOut' } as const;

/** Dégradé posé sur l'image du ciel pour chaque moment de la journée */
const SKY_TINTS: Record<SkyPhase, { gradient: string; opacity: number }> = {
    // Jour : léger bleu soutenu, plus marqué en haut (derrière le titre) et en bas, pour faire ressortir le texte blanc
    day: {
        gradient: 'linear-gradient(to bottom, #1f4f94, #3f80cc 35%, #6fa6de 70%, #4f87c8)',
        opacity: 0.15,
    },
    // Aube : bleu doux en haut, rose puis pêche à l'horizon
    dawn: {
        gradient: 'linear-gradient(to bottom, #7d97c9, #e6a7b0 65%, #f7c99a)',
        opacity: 0.55,
    },
    // Crépuscule : bleu soutenu en haut, corail puis orange à l'horizon
    dusk: {
        gradient: 'linear-gradient(to bottom, #34477f, #b8678a 55%, #f39a5b)',
        opacity: 0.7,
    },
    // Nuit : bleu nuit en haut, bleu ardoise à l'horizon
    night: {
        gradient: 'linear-gradient(to bottom, #0b1633, #1e2d55 55%, #33456e)',
        opacity: 0.95,
    },
};

const STAR_COUNT = 45;

/** Étoiles réparties dans le haut du ciel (pseudo-aléatoire déterministe : identiques à chaque rendu) */
const STARS = (() => {
    let seed = 11;
    const random = () => {
        seed = (seed * 16807) % 2147483647;
        return seed / 2147483647;
    };
    return Array.from({ length: STAR_COUNT }, () => ({
        left: random() * 100,
        // Plus denses en haut, rares vers l'horizon
        top: random() ** 1.6 * 70,
        size: 3 + random() * 6,
        duration: 2 + random() * 4,
        delay: random() * 4,
    }));
})();

/** Étoile low-poly : losange à 4 branches */
const STAR_SHAPE =
    'polygon(50% 0%, 62% 38%, 100% 50%, 62% 62%, 50% 100%, 38% 62%, 0% 50%, 38% 38%)';

/**
 * Scène de ciel en parallaxe : un fond (cover) et des calques détourés (`SceneLayer`) passés en `children`.
 * La scène est un conteneur de taille : les calques peuvent se dimensionner en unités cqw/cqh.
 */
export function FloatingIslandScene({
    skySrc,
    skyWebpSrc,
    phase = 'day',
    fullscreen = false,
    header,
    overlay,
    className,
    children,
}: PropsWithChildren<{
    skySrc: string;
    skyWebpSrc?: string;
    phase?: SkyPhase;
    fullscreen: boolean;
    header?: ReactNode;
    overlay?: ReactNode;
    className?: string;
}>) {
    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);

    // Le ciel (le plus lointain) bouge légèrement à l'opposé des calques
    const skyX = useTransform(mouseX, (v) => v * -0.3);
    const skyY = useTransform(mouseY, (v) => v * -0.3);
    const night = phase === 'night';

    const sceneRef = useRef<HTMLDivElement>(null);
    const inView = useInView(sceneRef);
    const active = inView;

    useEffect(() => {
        const handleMouseMove = (e: MouseEvent) => {
            mouseX.set((e.clientX / window.innerWidth - 0.5) * 30);
            mouseY.set((e.clientY / window.innerHeight - 0.5) * 30);
        };

        window.addEventListener('mousemove', handleMouseMove);
        return () => window.removeEventListener('mousemove', handleMouseMove);
    }, []);

    return (
        <motion.div
            ref={sceneRef}
            // Repère des cartes de sujet (HomeContent), qui restent dans les limites de la scène
            data-scene
            // `perspective` fait de la scène le bloc de référence des éléments `fixed` et isole ses z-index
            className={cn('relative overflow-hidden rounded-3xl perspective-[1000px]', className)}
            // Permet de dimensionner les calques en unités cqw/cqh (relatives à la scène)
            style={{ containerType: 'size' }}
            initial={{
                width: `${BG_WIDTH}vw`,
                height: `${BG_HEIGHT}dvh`,
                borderRadius: '1.5rem',
            }}
            animate={{
                width: fullscreen ? '100vw' : `${BG_WIDTH}vw`,
                height: fullscreen ? '100dvh' : `${BG_HEIGHT}dvh`,
                borderRadius: fullscreen ? '0' : '1.5rem',
            }}
            transition={{ duration: 0.4, ease: 'easeInOut' }}
        >
            {/* Ciel : légèrement agrandi pour que le parallaxe ne découvre jamais les bords */}
            <motion.div
                className={cn(
                    'absolute -inset-[4%] transition-[filter] duration-1000',
                    // Bleu un peu plus soutenu que l'image d'origine (sous les teintes d'aube et de crépuscule)
                    !night && 'brightness-[0.94] saturate-[1.2]'
                )}
                style={{ x: skyX, y: skyY }}
            >
                <picture>
                    {skyWebpSrc && <source srcSet={skyWebpSrc} type="image/webp" />}
                    <img
                        className="h-full w-full object-cover"
                        src={skySrc}
                        alt=""
                        fetchPriority="high"
                    />
                </picture>

                {/* Teintes d'aube, de crépuscule et de nuit, en fondu les unes sur les autres */}
                {(Object.keys(SKY_TINTS) as (keyof typeof SKY_TINTS)[]).map((tint) => (
                    <motion.div
                        key={tint}
                        className="absolute inset-0"
                        style={{ background: SKY_TINTS[tint].gradient }}
                        initial={false}
                        animate={{ opacity: phase === tint ? SKY_TINTS[tint].opacity : 0 }}
                        transition={PHASE_TRANSITION}
                    />
                ))}

                {/* Étoiles de nuit */}
                <motion.div
                    className="absolute inset-0"
                    initial={false}
                    animate={{ opacity: night ? 1 : 0 }}
                    transition={PHASE_TRANSITION}
                >
                    {night &&
                        STARS.map((star, i) => (
                            <span
                                key={i}
                                className="absolute bg-white opacity-90"
                                style={{
                                    left: `${star.left}%`,
                                    top: `${star.top}%`,
                                    width: star.size,
                                    height: star.size,
                                    clipPath: STAR_SHAPE,
                                    // Scintillement doux, en CSS : calculé par le navigateur sans JavaScript
                                    animation: `star-twinkle ${star.duration}s ease-in-out ${star.delay}s infinite`,
                                    animationPlayState: active ? 'running' : 'paused',
                                }}
                            />
                        ))}
                </motion.div>
            </motion.div>

            {header}

            <SceneContext.Provider value={{ mouseX, mouseY, phase }}>
                {children}
            </SceneContext.Provider>

            {overlay}
        </motion.div>
    );
}

/**
 * Calque détouré de la scène, centré sur (`left`, `top`) en % de la scène.
 * - `depth` : intensité du parallaxe (0 = immobile, 1 = premier plan)
 * - `float` : oscillation continue (amplitude en px, durée et délai en s, axe)
 * - `still` : suspend l'oscillation (ex. pour garder lisible un texte accroché au calque)
 * - `effects` : animations dessinées sur l'image ; elles lisent `useLayer()` pour s'éclairer comme elle
 *   et se suspendre quand le calque n'est pas visible
 * Les `children` sont positionnés en % de l'image : ils restent accrochés à ses éléments.
 */
export function SceneLayer({
    src,
    left,
    top,
    width,
    depth,
    float,
    priority = false,
    still = false,
    effects,
    className,
    imgClassName,
    children,
}: PropsWithChildren<{
    src: string;
    left: number;
    top: number;
    width: string;
    depth: number;
    float?: { amplitude: number; duration: number; delay?: number; axis?: 'x' | 'y' };
    priority?: boolean;
    still?: boolean;
    effects?: ReactNode;
    className?: string;
    imgClassName?: string;
}>) {
    const scene = useContext(SceneContext);
    if (!scene) throw new Error('SceneLayer doit être utilisé dans FloatingIslandScene');

    const x = useTransform(scene.mouseX, (v) => v * depth);
    const y = useTransform(scene.mouseY, (v) => v * depth);
    const axis = float?.axis ?? 'y';

    // Un calque masqué (display: none) n'est jamais visible : ses animations restent suspendues
    const layerRef = useRef<HTMLDivElement>(null);
    const inView = useInView(layerRef);
    const active = inView;

    // Lumière selon le moment de la journée, partagée par l'image et ses effets
    const phaseFilter = cn(
        'transition-[filter] duration-1000',
        // Nuit : plus sombres, avec une teinte légèrement refroidie
        scene.phase === 'night' && 'brightness-[0.7] hue-rotate-[10deg] saturate-[0.75]',
        // Aube et crépuscule : lumière rasante, légèrement dorée
        (scene.phase === 'dawn' || scene.phase === 'dusk') &&
            'brightness-[0.95] saturate-[1.1] sepia-[0.2]'
    );

    return (
        <motion.div
            ref={layerRef}
            // Le centrage passe par la propriété CSS `translate` (Tailwind v4), indépendante du `transform` de framer-motion
            className={cn('absolute -translate-x-1/2 -translate-y-1/2', className)}
            style={{ left: `${left}%`, top: `${top}%`, width, x, y }}
        >
            <motion.div
                className="relative"
                {...(float &&
                    loop(
                        active && !still,
                        { [axis]: [0, -float.amplitude, 0] },
                        { duration: float.duration, delay: float.delay ?? 0, ease: 'easeInOut' }
                    ))}
            >
                <img
                    className={cn('block h-auto w-full select-none', phaseFilter, imgClassName)}
                    src={src}
                    alt=""
                    draggable={false}
                    fetchPriority={priority ? 'high' : 'auto'}
                    // Les calques masqués (ex. îlots sur mobile) ne sont alors jamais téléchargés
                    loading={priority ? 'eager' : 'lazy'}
                />
                {/* Animations accrochées à l'image, positionnées en % de celle-ci, sous les `children`.
                    Le filtre de lumière est appliqué par chaque effet sur ses éléments animés plutôt qu'ici :
                    filtrer le conteneur forcerait à le redessiner entièrement à chaque image. */}
                {effects && (
                    <LayerContext.Provider
                        value={{ active, filter: phaseFilter, phase: scene.phase }}
                    >
                        <div className="pointer-events-none absolute inset-0">{effects}</div>
                    </LayerContext.Provider>
                )}
                {children}
            </motion.div>
        </motion.div>
    );
}
