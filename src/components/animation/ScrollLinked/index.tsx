'use client';

import { PropsWithChildren } from 'react';
import { motion, useSpring, useScroll } from 'motion/react';

export type ScrollLinkedProps = {
    /**
     * The color of the scroll indicator.
     */
    color?: string;

    /**
     * The height of the scroll indicator.
     */
    height?: number;
};

export default function ScrollLinked({
    children,
    height = 5,
    color = '#ff0088',
}: PropsWithChildren<ScrollLinkedProps>) {
    const { scrollYProgress } = useScroll();

    return (
        <>
            <motion.div
                id="scroll-indicator"
                style={{
                    scaleX: scrollYProgress,
                    position: 'fixed',
                    top: 0,
                    left: 0,
                    right: 0,
                    height,
                    originX: 0,
                    backgroundColor: color,
                }}
            />
            {children}
        </>
    );
}

export function ScrollLinkedWithSpring({
    children,
    height = 5,
    color = '#ff0088',
}: PropsWithChildren<ScrollLinkedProps>) {
    const { scrollYProgress } = useScroll();
    const scaleX = useSpring(scrollYProgress, {
        stiffness: 100,
        damping: 30,
        restDelta: 0.001,
    });

    return (
        <>
            <motion.div
                id="scroll-indicator"
                style={{
                    scaleX,
                    position: 'fixed',
                    top: 0,
                    left: 0,
                    right: 0,
                    height,
                    originX: 0,
                    backgroundColor: color,
                }}
            />
            {children}
        </>
    );
}
