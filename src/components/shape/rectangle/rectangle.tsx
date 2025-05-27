import { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';

// import * as motion from 'motion/react-client';

const transition = { duration: 4, yoyo: Infinity, ease: 'easeInOut' };

/**
 * ==============   Styles   ================
 */

const box: React.CSSProperties = {
    width: 50,
    height: 50,
    backgroundColor: '#8df0cc',
    borderRadius: 10,
    position: 'absolute',
    top: 0,
    left: 0,
    offsetPath: `path("M 239 17 C 142 17 48.5 103 48.5 213.5 C 48.5 324 126 408 244 408 C 362 408 412 319 412 213.5 C 412 108 334 68.5 244 68.5 C 154 68.5 102.68 135.079 99 213.5 C 95.32 291.921 157 350 231 345.5 C 305 341 357.5 290 357.5 219.5 C 357.5 149 314 121 244 121 C 174 121 151.5 167 151.5 213.5 C 151.5 260 176 286.5 224.5 286.5 C 273 286.5 296.5 253 296.5 218.5 C 296.5 184 270 177 244 177 C 218 177 197 198 197 218.5 C 197 239 206 250.5 225.5 250.5 C 245 250.5 253 242 253 218.5")`,
};

export function BouncingRectangle() {
    return (
        <div style={{ position: 'relative' }}>
            <svg xmlns="http://www.w3.org/2000/svg" width="451" height="437">
                <motion.path
                    d="M 239 17 C 142 17 48.5 103 48.5 213.5 C 48.5 324 126 408 244 408 C 362 408 412 319 412 213.5 C 412 108 334 68.5 244 68.5 C 154 68.5 102.68 135.079 99 213.5 C 95.32 291.921 157 350 231 345.5 C 305 341 357.5 290 357.5 219.5 C 357.5 149 314 121 244 121 C 174 121 151.5 167 151.5 213.5 C 151.5 260 176 286.5 224.5 286.5 C 273 286.5 296.5 253 296.5 218.5 C 296.5 184 270 177 244 177 C 218 177 197 198 197 218.5 C 197 239 206 250.5 225.5 250.5 C 245 250.5 253 242 253 218.5"
                    fill="transparent"
                    strokeWidth="12"
                    stroke="var(--hue-6-transparent)"
                    strokeLinecap="round"
                    initial={{ pathLength: 0 }}
                    animate={{ pathLength: 1 }}
                    transition={transition}
                />
            </svg>
            <motion.div
                style={box}
                initial={{ offsetDistance: '0%', scale: 2.5 }}
                animate={{ offsetDistance: '100%', scale: 1 }}
                transition={transition}
            />
        </div>
    );
}

export function BouncingRectangle2() {
    const debut = useRef<number>();
    const tempsPrecedent = useRef<number>();
    const [position, setPosition] = useState({ x: 0, y: 0 });
    const [direction, setDirection] = useState({ dx: 0.1, dy: 0.05 });

    const containerRef = useRef(null);

    useEffect(() => {
        const animate = (timestamp: number) => {
            if (debut.current === undefined) {
                debut.current = timestamp;
            }
            if (tempsPrecedent.current === undefined) {
                tempsPrecedent.current = timestamp;
            }

            const ecoule = timestamp - tempsPrecedent.current;

            setPosition((prev) => {
                const container = containerRef.current;
                if (!container) return prev;

                const containerWidth = container.offsetWidth;
                const containerHeight = container.offsetHeight;

                const rectWidth = 100;
                const rectHeight = 50;

                const newX = prev.x + ecoule * direction.dx;
                const newY = prev.y + ecoule * direction.dy;
                let newDx = direction.dx;
                let newDy = direction.dy;

                console.log('newX', newX + rectWidth, ' == ', containerWidth);

                if (newX <= 0 || newX + rectWidth >= containerWidth) {
                    newDx = -newDx;
                }
                if (newY <= 0 || newY + rectHeight >= containerHeight) {
                    newDy = -newDy;
                }

                setDirection({ dx: newDx, dy: newDy });

                return { x: newX, y: newY };
            });

            tempsPrecedent.current = timestamp;
            requestAnimationFrame(animate);
        };

        requestAnimationFrame(animate);
    }, [direction]);

    return (
        <div
            ref={containerRef}
            style={{
                width: '400px',
                height: '300px',
                border: '2px solid #ccc',
                position: 'relative',
                overflow: 'hidden',
                backgroundColor: '#f9f9f9',
            }}
        >
            <motion.div
                animate={{ x: position.x, y: position.y }}
                transition={{ type: 'tween', ease: 'linear', duration: 0.05 }}
                style={{
                    width: '100px',
                    height: '50px',
                    backgroundColor: 'orange',
                    position: 'absolute',
                    borderRadius: '20px',
                }}
            />
        </div>
    );
}
