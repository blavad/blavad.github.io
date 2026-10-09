import { CSSProperties, useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';

import topics from '~/data/topics.json';
import { cn } from '~/lib/utils';
import { Topics } from '~/types/topics';
import img from '~/assets/img/village-day.jpeg';
import imgWebp from '~/assets/img/village-day.webp';
import imgNight from '~/assets/img/village-night.jpeg';
import imgNightWebp from '~/assets/img/village-night.webp';
import HomeButton from '~/components/ui/buttons/HomeButton';
import { SmoothParallaxImage } from '~/components/animation/SmoothParallaxImage';
import useActionOnScroll from '~/hooks/useActionOnScroll';

import { HomeContent } from './HomeContent';
import { useMenu } from '~/stores/useMenu';

// Positions desktop (sm et +) placées sur l'image ; en mobile les boutons sont répartis sur un ovale
const HERO_BUTTONS: { variant: Topics; className: string }[] = [
    { variant: 'games', className: 'sm:top-[53%] sm:left-[34%]' },
    { variant: 'teaching', className: 'sm:right-[21%] sm:bottom-[35%]' },
    { variant: 'sports', className: 'sm:right-[10%] sm:bottom-[15%]' },
    { variant: 'ecology', className: 'sm:-bottom-[1%] sm:left-[40%]' },
    { variant: 'tech', className: 'sm:bottom-[40%] sm:left-[13%]' },
];

// Ovale mobile, en % du conteneur : centré sous l'en-tête et au-dessus du scroll hint
const ELLIPSE = { cx: 50, cy: 57, rx: 30, ry: 22 };

function mobileEllipsePosition(index: number, count: number) {
    const angle = -Math.PI / 2 + (index * 2 * Math.PI) / count;
    return {
        '--x': `${ELLIPSE.cx + ELLIPSE.rx * Math.cos(angle)}%`,
        '--y': `${ELLIPSE.cy + ELLIPSE.ry * Math.sin(angle)}%`,
    } as CSSProperties;
}

// Heures locales (début inclus, fin exclue) pendant lesquelles l'image de jour est affichée
const DAY_START_HOUR = 7;
const DAY_END_HOUR = 20;

const isDaytime = () => {
    const hour = new Date().getHours();
    return hour >= DAY_START_HOUR && hour < DAY_END_HOUR;
};

function Hero() {
    const [currentTopicID, setCurrentTopicID] = useState('default');
    const [fullscreen, setFullscreen] = useState(false);
    const [daytime, setDaytime] = useState(isDaytime);
    const { isOpen, open, variant, close } = useMenu();
    const { t } = useTranslation();

    const openTopic = (topicID: string) => {
        setCurrentTopicID(topicID);
    };

    const closeTopic = () => {
        if (fullscreen) return;
        setCurrentTopicID('default');
    };

    const clickTopic = (topicID: string) => {
        if (!isOpen) {
            open('hero');
            setFullscreen(true);
            openTopic(topicID);
            window.scrollTo({
                top: 0,
                behavior: 'smooth',
            });
        } else {
            openTopic(topicID);
        }
    };

    const closeFullscreen = () => {
        setFullscreen((prev) => {
            if (prev) {
                closeTopic();
            }
            return false;
        });
    };

    useActionOnScroll(closeFullscreen);

    // Bascule jour/nuit si la page reste ouverte au passage de l'heure
    useEffect(() => {
        const interval = setInterval(() => setDaytime(isDaytime()), 60_000);
        return () => clearInterval(interval);
    }, []);

    useEffect(() => {
        if (isOpen && variant === 'hero' && !fullscreen) {
            close();
            closeTopic();
        } else if (!isOpen && fullscreen) {
            closeFullscreen();
        }
    }, [isOpen, fullscreen]);

    return (
        <motion.div
            className="flex h-full flex-col items-center justify-end"
            initial={{
                paddingBottom: '1rem',
            }}
            animate={{
                paddingBottom: fullscreen ? '0' : '1rem',
            }}
            transition={{ duration: 0.4, ease: 'easeInOut' }}
        >
            <SmoothParallaxImage
                src={daytime ? img : imgNight}
                webpSrc={daytime ? imgWebp : imgNightWebp}
                fullscreen={fullscreen}
                header={<HomeContent topicID={currentTopicID} fullscreen={fullscreen} />}
            >
                {HERO_BUTTONS.map(({ variant, className }, index) => (
                    <HomeButton
                        key={variant}
                        variant={variant}
                        className={cn(
                            'absolute max-sm:top-(--y) max-sm:left-(--x) max-sm:-translate-x-1/2 max-sm:-translate-y-7.5',
                            className
                        )}
                        style={mobileEllipsePosition(index, HERO_BUTTONS.length)}
                        onHoverStart={openTopic}
                        onHoverEnd={closeTopic}
                        onClick={clickTopic}
                    >
                        {t(`topics.${topics[variant].id}.title`)}
                    </HomeButton>
                ))}
                <p className="absolute bottom-[2%] left-[50%] w-full -translate-x-1/2 text-base text-white">
                    {t('hero.scrollHint')}
                </p>
            </SmoothParallaxImage>
        </motion.div>
    );
}

export default Hero;
