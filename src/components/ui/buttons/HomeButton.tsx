import { PropsWithChildren } from 'react';
import { motion, useAnimation } from 'framer-motion';
import { DynamicIcon } from 'lucide-react/dynamic';

import { Topics } from '~/types/topics';
import { cn } from '~/lib/utils';
import topics from '~/data/topics.json';

import './HomeButton.css';

function HomeButton({
    variant = 'tech',
    className,
    children,
    onHoverStart,
    onHoverEnd,
    onClick,
}: PropsWithChildren<{
    variant: Topics;
    className?: string;
    onHoverStart?: (theme: string) => void;
    onHoverEnd?: (theme: string) => void;
    onClick?: (theme: string) => void;
}>) {
    const controls = useAnimation();
    const colorClass = `btn-${topics[variant].color}`;

    const onHoverStartButton = () => {
        controls.start({ scale: 1 });
        if (onHoverStart) {
            onHoverStart(variant);
        }
    };

    const onHoverEndButton = () => {
        controls.start({ scale: 0 });
        if (onHoverEnd) {
            onHoverEnd(variant);
        }
    };

    const onClickButton = () => {
        if (onClick) {
            onClick(variant);
        }
    };

    return (
        <motion.div
            className={cn(`home-btn ${colorClass}`, className)}
            onHoverStart={onHoverStartButton}
            onHoverEnd={onHoverEndButton}
            onClick={onClickButton}
        >
            <div className="circle">
                <DynamicIcon name={(topics[variant].icon || 'bot') as any} size={36} />
            </div>
            <motion.div className="label-container" animate={controls}>
                <h3 className="label-text">{children}</h3>
            </motion.div>
        </motion.div>
    );
}

export default HomeButton;
