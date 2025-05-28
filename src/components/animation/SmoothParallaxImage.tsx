import { motion, useMotionValue, useTransform } from 'framer-motion';
import { PropsWithChildren, useEffect } from 'react';
import { cn } from '~/lib/utils';

const BG_WIDTH = 95; // Largeur de l'image de fond
const BG_HEIGHT = 82; // Hauteur de l'image de fond

export function SmoothParallaxImage({
    src,
    className,
    header,
    children,
    fullscreen = false,
}: PropsWithChildren<{ src?: string; className?: string; header?: any; fullscreen: boolean }>) {
    const x = useMotionValue(0);
    const y = useMotionValue(0);

    // Ajout torsion 3D
    const xOffset = useTransform(x, [-20, 20], [-10, 10]);
    const yOffset = useTransform(y, [-100, 100], [-50, 50]);

    // dxezs
    useEffect(() => {
        const handleMouseMove = (e: MouseEvent) => {
            const xOffset = (e.clientX / window.innerWidth - 0.5) * 30;
            const yOffset = (e.clientY / window.innerHeight - 0.5) * 30;
            x.set(xOffset);
            y.set(yOffset);
        };

        window.addEventListener('mousemove', handleMouseMove);
        return () => window.removeEventListener('mousemove', handleMouseMove);
    }, []);

    return (
        <motion.div
            className={cn(
                'flex items-center justify-center overflow-hidden rounded-3xl perspective-[1000px]',
                className
            )}
            style={{
                backgroundImage: `url(${src})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
            }}
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
            <div className="absolute h-full w-full backdrop-blur-xs"></div>
            <motion.img
                className="absolute h-full w-full object-cover"
                src={src}
                alt="Smooth Parallax"
                style={{
                    x,
                    y,
                }}
            />
            {header}
            <motion.div
                className="absolute h-full w-full"
                style={{
                    x: xOffset,
                    y: yOffset,
                }}
            >
                {children}
            </motion.div>
        </motion.div>
    );
}
