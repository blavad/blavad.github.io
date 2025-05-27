import { motion } from 'framer-motion';

import { cn } from '~/lib/utils';
import topics from '~/data/topics.json';

import styles from './HomeContent.module.css';
import { useEffect } from 'react';

const LINE_HEIGHT = 18;
const LINE_APPEAR_TIME = 0.1;

export function HomeContent({
    topicID,
    fullscreen,
    animate,
}: {
    topicID: string;
    fullscreen: boolean;
    animate: any;
}) {
    const currentTopic = (topics as any)[topicID] || topics.default;

    useEffect(() => {}, [topicID]);

    return (
        <motion.div
            className={cn(
                'align-end fixed top-3 left-[50%] z-10 w-sm max-w-sm -translate-x-50 rounded-3xl p-[3px] shadow-xl'
            )}
            style={{
                background: `var(--gradient-${currentTopic.color})`,
            }}
            animate={animate}
        >
            <motion.div
                className={cn(
                    'h-full w-full max-w-sm rounded-3xl bg-white/95 pr-6 pl-10 text-left',
                    fullscreen ? 'py-4' : 'py-2'
                )}
            >
                <h2 className={styles.title}>{topics.default.title}</h2>
                <motion.p
                    className={styles.subtitle}
                    animate={{
                        background: `var(--gradient-${currentTopic.color})`,
                        backgroundClip: 'text',
                        WebkitBackgroundClip: 'text',
                        color: 'transparent',
                        transition: {
                            duration: 0,
                        },
                    }}
                >
                    {currentTopic?.subtitle}
                </motion.p>
                {fullscreen &&
                    currentTopic?.description.map((desc: string, idx: number) => (
                        <motion.p
                            key={desc}
                            className={styles.description}
                            initial={{
                                opacity: 0,
                                y: LINE_HEIGHT * (idx - 1),
                            }}
                            animate={{
                                opacity: 1,
                                y: LINE_HEIGHT * idx,
                                transition: {
                                    duration: LINE_APPEAR_TIME * idx,
                                    delay: 0.2 + LINE_APPEAR_TIME * idx,
                                },
                            }}
                        >
                            {desc}
                        </motion.p>
                    ))}
            </motion.div>
        </motion.div>
    );
}
