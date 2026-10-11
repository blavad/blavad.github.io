import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';

import { cn, isExternalLink } from '~/lib/utils';
import topics from '~/data/topics.json';
import useNavigate from '~/hooks/useNavigate';
import { useMenu } from '~/stores/useMenu';

import styles from './HomeContent.module.css';

const LINE_HEIGHT = 16;
const LINE_APPEAR_TIME = 0.1;
const LINK_HEIGHT = 28; // Hauteur ajoutée à la carte quand le sujet a un lien
const MOBILE_QUERY = '(max-width: 32rem)'; // matches the `xs` breakpoint

export function HomeContent({ topicID, fullscreen }: { topicID: string; fullscreen: boolean }) {
    const { t } = useTranslation();
    const currentTopic = (topics as any)[topicID] || topics.default;
    const description = t(`topics.${topicID}.description`, { returnObjects: true }) as string[];
    const descriptionArray = Array.isArray(description) ? description : [];
    // Lien optionnel après la description : `link` dans topics.json, `linkLabel` dans les traductions
    const link: string | undefined = currentTopic.link;
    const navigate = useNavigate();
    const closeMenu = useMenu((state) => state.close);
    const [isMobile, setIsMobile] = useState(() => window.matchMedia(MOBILE_QUERY).matches);

    useEffect(() => {
        const mediaQuery = window.matchMedia(MOBILE_QUERY);
        const onChange = (e: MediaQueryListEvent) => setIsMobile(e.matches);
        mediaQuery.addEventListener('change', onChange);
        return () => mediaQuery.removeEventListener('change', onChange);
    }, []);

    return (
        <motion.div
            className={cn(
                'align-end xs:w-sm fixed top-8 left-[50%] z-10 w-[90%] -translate-x-[50%] rounded-3xl shadow-xl'
            )}
            style={{
                background: `var(--color-gradient-${currentTopic.color})`,
            }}
            animate={{
                y: fullscreen ? (isMobile ? 50 : 10) : 0,
                height: fullscreen
                    ? 100 + descriptionArray.length * LINE_HEIGHT + (link ? LINK_HEIGHT : 0)
                    : 'auto',
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
                {fullscreen && link && (
                    <a
                        className={styles.link}
                        href={link}
                        // Lien externe : nouvel onglet ; lien interne : navigation du site (avec écran de chargement)
                        {...(isExternalLink(link)
                            ? { target: '_blank', rel: 'noopener noreferrer' }
                            : {
                                  onClick: (e) => {
                                      e.preventDefault();
                                      // Le plein écran du Hero ouvre le menu en mode « hero » : on le referme,
                                      // sinon la page suivante garde la navbar masquée et la croix du menu
                                      closeMenu();
                                      navigate(link);
                                  },
                              })}
                        style={{ backgroundImage: `var(--color-gradient-${currentTopic.color})` }}
                    >
                        {t(`topics.${topicID}.linkLabel`)} →
                    </a>
                )}
            </motion.div>
        </motion.div>
    );
}
