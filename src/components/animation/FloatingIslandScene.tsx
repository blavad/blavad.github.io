import { motion, MotionValue, useMotionValue, useTransform } from 'framer-motion';
import { createContext, PropsWithChildren, ReactNode, useContext, useEffect } from 'react';
import { cn } from '~/lib/utils';

const BG_WIDTH = 95; // Largeur de la scène (vw)
const BG_HEIGHT = 82; // Hauteur de la scène (dvh)

type SceneContextValue = {
    mouseX: MotionValue<number>;
    mouseY: MotionValue<number>;
    night: boolean;
};

const SceneContext = createContext<SceneContextValue | null>(null);

/**
 * Scène de ciel en parallaxe : un fond (cover) et des calques détourés (`SceneLayer`) passés en `children`.
 * La scène est un conteneur de taille : les calques peuvent se dimensionner en unités cqw/cqh.
 */
export function FloatingIslandScene({
    skySrc,
    skyWebpSrc,
    night = false,
    fullscreen = false,
    header,
    overlay,
    className,
    children,
}: PropsWithChildren<{
    skySrc: string;
    skyWebpSrc?: string;
    night?: boolean;
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
            // `perspective` fait de la scène le bloc de référence des éléments `fixed` (ex. HomeContent)
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
                    night && 'brightness-[0.35] hue-rotate-40 saturate-[1.4]'
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
            </motion.div>

            {header}

            <SceneContext.Provider value={{ mouseX, mouseY, night }}>
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
    className?: string;
    imgClassName?: string;
}>) {
    const scene = useContext(SceneContext);
    if (!scene) throw new Error('SceneLayer doit être utilisé dans FloatingIslandScene');

    const x = useTransform(scene.mouseX, (v) => v * depth);
    const y = useTransform(scene.mouseY, (v) => v * depth);
    const axis = float?.axis ?? 'y';

    return (
        <motion.div
            // Le centrage passe par la propriété CSS `translate` (Tailwind v4), indépendante du `transform` de framer-motion
            className={cn('absolute -translate-x-1/2 -translate-y-1/2', className)}
            style={{ left: `${left}%`, top: `${top}%`, width, x, y }}
        >
            <motion.div
                className="relative"
                animate={float && { [axis]: [0, -float.amplitude, 0] }}
                transition={
                    float && {
                        duration: float.duration,
                        delay: float.delay ?? 0,
                        ease: 'easeInOut',
                        repeat: Infinity,
                    }
                }
            >
                <img
                    className={cn(
                        'block h-auto w-full transition-[filter] duration-1000 select-none',
                        scene.night && 'brightness-75 saturate-[0.8]',
                        imgClassName
                    )}
                    src={src}
                    alt=""
                    draggable={false}
                    fetchPriority={priority ? 'high' : 'auto'}
                />
                {children}
            </motion.div>
        </motion.div>
    );
}
