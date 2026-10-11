import { CSSProperties, Fragment, useCallback, useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';

import topics from '~/data/topics.json';
import { cn } from '~/lib/utils';
import { Topics } from '~/types/topics';
import skyImg from '~/assets/img/ciel_background.jpeg';
import skyImgWebp from '~/assets/img/ciel_background.webp';
import islandImg from '~/assets/img/village-low-poly-v2.webp';
import artIsletImg from '~/assets/img/ilot-art.webp';
import musicIsletImg from '~/assets/img/ilot-music-v2.webp';
import forestIsletImg from '~/assets/img/ilot-forest.webp';
import psychoIsletImg from '~/assets/img/ilot-psycho.webp';
import treeIsletImg from '~/assets/img/ilot-arbre.webp';
import cloudLargeImg from '~/assets/img/nuage-1.webp';
import cloudMediumImg from '~/assets/img/nuage-2.webp';
import cloudSmallImg from '~/assets/img/nuage-3.webp';
import HomeButton from '~/components/ui/buttons/HomeButton';
import { MusicPlayer } from '~/components/MusicPlayer';
import {
    FloatingIslandScene,
    SceneLayer,
    SkyPhase,
} from '~/components/animation/FloatingIslandScene';
import useActionOnScroll from '~/hooks/useActionOnScroll';

import { HomeContent } from './HomeContent';
import { useMenu } from '~/stores/useMenu';

type HeroButton = { variant: Topics; className: string };

type Island = {
    src: string;
    left: number;
    top: number;
    width: string;
    depth: number;
    float: { amplitude: number; duration: number; delay?: number };
    className?: string;
    imgClassName?: string;
    priority?: boolean;
    // Position de chaque bouton sur son lieu, en % de l'image de l'île
    buttons: HeroButton[];
};

// Taille des îlots satellites, relative à la scène
const ISLET_WIDTH = 'min(17cqw, 30cqh)';

// Îlots satellites (masqués sous lg : pas assez de place sur les côtés), puis l'île principale au premier plan
const ISLANDS: Island[] = [
    {
        src: psychoIsletImg,
        left: 13,
        top: 42,
        width: ISLET_WIDTH,
        depth: 0.4,
        float: { amplitude: 8, duration: 7, delay: 1 },
        className: 'max-lg:hidden',
        buttons: [{ variant: 'psychology', className: 'top-[28%] left-[46%]' }],
    },
    {
        src: forestIsletImg,
        left: 87,
        top: 40,
        // Un peu en retrait : entre les îlots satellites et les îlots lointains
        width: 'min(13cqw, 23cqh)',
        depth: 0.3,
        float: { amplitude: 6, duration: 8, delay: 2.5 },
        className: 'max-lg:hidden',
        imgClassName: 'opacity-90 saturate-[0.85]',
        buttons: [],
    },
    {
        src: musicIsletImg,
        left: 82,
        top: 80,
        width: ISLET_WIDTH,
        depth: 0.5,
        float: { amplitude: 8, duration: 6.5, delay: 0.5 },
        className: 'max-lg:hidden',
        buttons: [{ variant: 'music', className: 'top-[16%] left-[49%]' }],
    },
    {
        src: islandImg,
        left: 50,
        top: 60,
        width: 'min(88cqw, 66cqh)',
        depth: 0.6,
        float: { amplitude: 10, duration: 6 },
        imgClassName: 'drop-shadow-2xl',
        priority: true,
        buttons: [
            { variant: 'games', className: 'top-[14%] left-[36%]' },
            { variant: 'teaching', className: 'top-[18%] left-[79%]' },
            { variant: 'sports', className: 'top-[51%] left-[77%]' },
            { variant: 'ecology', className: 'top-[56%] left-[37%]' },
            { variant: 'tech', className: 'top-[29%] left-[14%]' },
        ],
    },
];

// Intervalle (en s) entre le déclenchement de la pulsation de deux boutons successifs
const PULSE_INTERVAL = 0.03;

// Ordre de pulsation : tous les boutons de toutes les îles
const BUTTON_ORDER = ISLANDS.flatMap((island) => island.buttons.map((button) => button.variant));

// Heures locales (début inclus, fin exclue) pendant lesquelles il fait jour
const DAY_START_HOUR = 7;
const DAY_END_HOUR = 20;
// Durée (en h) de l'aube au début du jour et du crépuscule à la fin
const TWILIGHT_HOURS = 3;

const getSkyPhase = (): SkyPhase => {
    const hour = new Date().getHours();
    if (hour < DAY_START_HOUR || hour >= DAY_END_HOUR) return 'night';
    if (hour < DAY_START_HOUR + TWILIGHT_HOURS) return 'dawn';
    if (hour >= DAY_END_HOUR - TWILIGHT_HOURS) return 'dusk';
    return 'day';
};

function Hero() {
    const [currentTopicID, setCurrentTopicID] = useState('default');
    const [fullscreen, setFullscreen] = useState(false);
    const [skyPhase, setSkyPhase] = useState(getSkyPhase);
    const [musicOpen, setMusicOpen] = useState(false);
    const closeMusic = useCallback(() => setMusicOpen(false), []);
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
        if (topicID === 'music') {
            setMusicOpen((prev) => !prev);
        }
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

    // Fait évoluer le ciel si la page reste ouverte au passage de l'heure
    useEffect(() => {
        const interval = setInterval(() => setSkyPhase(getSkyPhase()), 60_000);
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
            <FloatingIslandScene
                skySrc={skyImg}
                skyWebpSrc={skyImgWebp}
                phase={skyPhase}
                fullscreen={fullscreen}
                header={<HomeContent topicID={currentTopicID} fullscreen={fullscreen} />}
                overlay={
                    <p className="absolute bottom-[2%] left-[50%] w-full -translate-x-1/2 text-base">
                        {t('hero.scrollHint')}
                    </p>
                }
            >
                {/* Nuages lointains : dérivent lentement derrière les îles */}
                <SceneLayer
                    src={cloudSmallImg}
                    left={27}
                    top={20}
                    width="min(9cqw, 16cqh)"
                    depth={0.1}
                    float={{ amplitude: 20, duration: 20, axis: 'x' }}
                    className="max-sm:hidden"
                />
                <SceneLayer
                    src={cloudMediumImg}
                    left={76}
                    top={13}
                    width="min(15cqw, 26cqh)"
                    depth={0.2}
                    float={{ amplitude: 25, duration: 24, delay: 3, axis: 'x' }}
                    className="max-sm:hidden"
                />

                {/* Îlots lointains (décor) : petits, brumeux et presque immobiles pour donner de la profondeur */}
                <SceneLayer
                    src={treeIsletImg}
                    left={66}
                    top={30}
                    width="min(7cqw, 13cqh)"
                    depth={0.15}
                    float={{ amplitude: 5, duration: 9, delay: 4 }}
                    className="max-lg:hidden"
                    imgClassName="opacity-75 saturate-[0.7] blur-[0.5px]"
                />

                <SceneLayer
                    src={artIsletImg}
                    left={25}
                    top={74}
                    width="min(7cqw, 13cqh)"
                    depth={0.15}
                    float={{ amplitude: 5, duration: 10, delay: 2 }}
                    className="max-lg:hidden"
                    imgClassName="opacity-75 saturate-[0.7] blur-[0.5px]"
                />

                {ISLANDS.map(({ buttons, ...island }) => (
                    <SceneLayer
                        key={island.src}
                        {...island}
                        // Passe l'île au premier plan pour que le lecteur ouvert ne soit pas masqué
                        className={cn(
                            island.className,
                            musicOpen && buttons.some((b) => b.variant === 'music') && 'z-20'
                        )}
                    >
                        {buttons.map(({ variant, className }) => (
                            <Fragment key={variant}>
                                {variant === 'music' && (
                                    <MusicPlayer
                                        open={musicOpen}
                                        onClose={closeMusic}
                                        // Au-dessus du rond du bouton, avec une petite marge
                                        className={cn(className, '-mt-8')}
                                    />
                                )}
                                <HomeButton
                                    variant={variant}
                                    className={cn(
                                        // Centre le rond du bouton (50px) sur le point visé
                                        'absolute -translate-x-1/2 -translate-y-6.25',
                                        className
                                    )}
                                    style={
                                        {
                                            // Déclenche la pulsation de chaque bouton l'un après l'autre
                                            '--pulse-delay': `${BUTTON_ORDER.indexOf(variant) * PULSE_INTERVAL}s`,
                                        } as CSSProperties
                                    }
                                    onHoverStart={openTopic}
                                    onHoverEnd={closeTopic}
                                    onClick={clickTopic}
                                >
                                    {t(`topics.${topics[variant].id}.title`)}
                                </HomeButton>
                            </Fragment>
                        ))}
                    </SceneLayer>
                ))}

                {/* Nuage de premier plan : déborde du coin bas gauche, légèrement flou */}
                <SceneLayer
                    src={cloudLargeImg}
                    left={6}
                    top={90}
                    width="min(30cqw, 45cqh)"
                    depth={1.2}
                    float={{ amplitude: 15, duration: 16, axis: 'x' }}
                    imgClassName="blur-[1px]"
                />
            </FloatingIslandScene>
        </motion.div>
    );
}

export default Hero;
