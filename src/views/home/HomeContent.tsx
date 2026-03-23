import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';

import { cn } from '~/lib/utils';
import topics from '~/data/topics.json';

import styles from './HomeContent.module.css';

const LINE_HEIGHT = 16;
const LINE_APPEAR_TIME = 0.1;

export function HomeContent({ topicID, fullscreen }: { topicID: string; fullscreen: boolean }) {
    const { t } = useTranslation();
    const currentTopic = (topics as any)[topicID] || topics.default;
    const description = t(`topics.${topicID}.description`, { returnObjects: true }) as string[];
    const descriptionArray = Array.isArray(description) ? description : [];

    return (
        <motion.div
            className={cn(
                'align-end xs:w-sm fixed top-8 left-[50%] z-10 w-[90%] -translate-x-[50%] rounded-3xl p-[3px] shadow-xl'
            )}
            style={{
                background: `var(--color-gradient-${currentTopic.color})`,
            }}
            animate={{
                y: fullscreen ? 50 : 0,
                height: fullscreen ? 100 + descriptionArray.length * LINE_HEIGHT : 'auto',
                transition: {
                    height: { duration: descriptionArray.length * LINE_APPEAR_TIME },
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
                <h1 className={styles.title}>David ALBERT</h1>
                <motion.p
                    className={styles.subtitle}
                    animate={{
                        background: `var(--color-gradient-${currentTopic.color})`,
                        backgroundClip: 'text',
                        color: 'transparent',
                        transition: {
                            duration: 0,
                        },
                    }}
                >
                    {t(`topics.${topicID}.subtitle`)}
                </motion.p>
                {fullscreen &&
                    descriptionArray.map((desc: string) => (
                        <motion.p key={desc} className={styles.description}>
                            {desc}
                        </motion.p>
                    ))}
            </motion.div>
        </motion.div>
    );
}
