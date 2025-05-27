import { motion } from 'framer-motion';

import { cn } from '~/lib/utils';
import topics from '~/data/topics.json';

import styles from './HomeContent.module.css';

const LINE_HEIGHT = 15;
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
            <div className="h-full w-full max-w-sm rounded-3xl bg-white p-2 pr-6 pl-10 text-left">
                <h2 className={styles.title}>{topics.default.title}</h2>
                <p
                    className={styles.subtitle}
                    style={
                        currentTopic.id !== 'default'
                            ? {
                                  background: `var(--gradient-${currentTopic.color})`,
                                  backgroundClip: 'text',
                                  WebkitBackgroundClip: 'text',
                                  color: 'transparent',
                              }
                            : {}
                    }
                >
                    {currentTopic?.subtitle}
                </p>
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
                                    delay: LINE_APPEAR_TIME * idx,
                                },
                            }}
                        >
                            {desc}
                        </motion.p>
                    ))}
            </div>
        </motion.div>
    );
}
