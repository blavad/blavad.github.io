import { PropsWithChildren } from 'react';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';

import { cn } from '~/lib/utils';

// Ombre douce : garde le texte blanc lisible sur le ciel clair du jour comme sur celui de la nuit
const SKY_TEXT_SHADOW = '0 2px 12px rgb(20 40 80 / 0.35), 0 1px 2px rgb(20 40 80 / 0.25)';

/**
 * Titre du Hero, posé dans le ciel : le nom, un trait aux couleurs des sujets de l'île,
 * puis l'invitation à explorer, qui s'efface quand un sujet est ouvert.
 */
export function HeroTitle({
    hintVisible,
    fullscreen,
}: {
    hintVisible: boolean;
    fullscreen: boolean;
}) {
    const { t } = useTranslation();

    return (
        <div
            // Les cartes de sujet centrées (HomeContent) restent en dessous
            data-scene-header
            className={cn(
                'pointer-events-none absolute top-[4%] left-1/2 flex w-full -translate-x-1/2 flex-col items-center px-4 text-white transition-[top] duration-400 ease-in-out',
                // En plein écran, la barre de navigation (logo, croix) recouvre le haut de la scène :
                // sur mobile, faute de place sur les côtés, le titre passe en dessous
                fullscreen && 'max-sm:top-22'
            )}
        >
            <motion.h1
                className="text-3xl leading-none font-bold tracking-tight sm:text-4xl"
                style={{ textShadow: SKY_TEXT_SHADOW }}
                initial={{ opacity: 0, y: -12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, ease: 'easeOut' }}
            >
                David Albert
            </motion.h1>

            {/* Trait aux couleurs des sujets, qui se déploie depuis le centre */}
            <motion.div
                className="mt-3 h-1 w-24 rounded-full shadow-sm sm:w-32"
                style={{ background: 'var(--color-gradient-mixed)' }}
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ duration: 0.7, delay: 0.4, ease: 'easeOut' }}
            />

            <SkyHint className="mt-3" visible={hintVisible} delay={0.9}>
                {t('topics.default.subtitle')}
            </SkyHint>
        </div>
    );
}

/**
 * Indication discrète écrite dans le ciel (invitation à explorer, à faire défiler…) :
 * petites capitales blanches qui « respirent » lentement pour attirer l'œil sans insister.
 */
export function SkyHint({
    visible = true,
    delay = 0,
    className,
    children,
}: PropsWithChildren<{ visible?: boolean; delay?: number; className?: string }>) {
    return (
        <motion.p
            className={cn(
                'pointer-events-none text-xs tracking-[0.25em] text-white uppercase sm:text-sm',
                className
            )}
            style={{ textShadow: SKY_TEXT_SHADOW }}
            initial={{ opacity: 0 }}
            animate={visible ? { opacity: [0.95, 0.6, 0.95] } : { opacity: 0 }}
            transition={
                visible
                    ? { duration: 3, delay, repeat: Infinity, ease: 'easeInOut' }
                    : { duration: 0.3 }
            }
        >
            {children}
        </motion.p>
    );
}
