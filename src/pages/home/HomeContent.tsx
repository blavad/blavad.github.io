import { motion } from 'framer-motion';

import { cn } from '~/lib/utils';
import topics from '~/data/topics.json';

import styles from './HomeContent.module.css';

const LINE_HEIGHT = 18;
const LINE_APPEAR_TIME = 0.1;

export function HomeContent({ topicID, fullscreen }: { topicID: string; fullscreen: boolean }) {
    const currentTopic = (topics as any)[topicID] || topics.default;

    return (
        <motion.div
            className={cn(
                'align-end xs:w-sm fixed top-8 left-[50%] z-10 w-xs -translate-x-[50%] rounded-3xl p-[3px] shadow-xl'
            )}
            style={{
                background: `var(--color-gradient-${currentTopic.color})`,
            }}
            animate={{
                y: fullscreen ? 50 : 0,
                height: fullscreen ? 100 + currentTopic.description.length * LINE_HEIGHT : 'auto',
                transition: {
                    height: { duration: currentTopic.description.length * LINE_APPEAR_TIME },
                },
                padding: fullscreen ? '4px' : '3px',
            }}
        >
            <motion.div
                className={cn(
                    'h-full w-full max-w-sm rounded-3xl bg-white/95 px-7 text-left',
                    fullscreen ? 'py-4' : 'py-2'
                )}
            >
                <h2 className={styles.title}>{topics.default.title}</h2>
                <motion.p
                    className={styles.subtitle}
                    animate={{
                        background: `var(--color-gradient-${currentTopic.color})`,
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
