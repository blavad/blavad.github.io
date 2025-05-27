import { PropsWithChildren } from 'react';
import { motion, useAnimation } from 'framer-motion';
import { DynamicIcon } from 'lucide-react/dynamic';

import { Topics } from '~/types/topics';
import { cn } from '~/lib/utils';
import topics from '~/data/topics.json';

import './HomeButton.css';

function HomeButton({
    preset = 'tech',
    className,
    children,
    onHoverStart,
    onHoverEnd,
    onClick,
}: PropsWithChildren<{
    preset: Topics;
    className?: string;
    onHoverStart?: (theme: string) => void;
    onHoverEnd?: (theme: string) => void;
    onClick?: (theme: string) => void;
}>) {
    const controls = useAnimation();
    const colorClass = `btn-${topics[preset].color}`;

    const onHoverStartButton = () => {
        controls.start({ scale: 1 });
        if (onHoverStart) {
            onHoverStart(preset);
        }
    };

    const onHoverEndButton = () => {
        controls.start({ scale: 0 });
        if (onHoverEnd) {
            onHoverEnd(preset);
        }
    };

    const onClickButton = () => {
        if (onClick) {
            onClick(preset);
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
                <DynamicIcon name={(topics[preset].icon || 'bot') as any} size={36} />
            </div>
            <motion.div className="label-container" animate={controls}>
                <h3 className="label-text">{children}</h3>
            </motion.div>
        </motion.div>
    );
}

export default HomeButton;
