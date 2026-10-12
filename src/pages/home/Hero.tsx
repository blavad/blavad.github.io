import { CSSProperties, Fragment, ReactNode, useCallback, useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';

import topics from '~/data/topics.json';
import { cn } from '~/lib/utils';
import { Topics } from '~/types/topics';
import skyImg from '~/assets/img/ciel_background.jpeg';
import skyImgWebp from '~/assets/img/ciel_background.webp';
import islandImg from '~/assets/img/village-low-poly-v2.webp';
import artIsletImg from '~/assets/img/ilot-art.webp';
// Îlots sans leurs oiseaux et notes : ces éléments sont animés séparément (sprites ci-dessous)
import musicIsletImg from '~/assets/img/ilot-music-v2-base.webp';
import forestIsletImg from '~/assets/img/ilot-forest-base.webp';
import bird1Img from '~/assets/img/bird-1.webp';
import bird2Img from '~/assets/img/bird-2.webp';
import bird3Img from '~/assets/img/bird-3.webp';
import bird4Img from '~/assets/img/bird-4.webp';
import note1Img from '~/assets/img/note-1.webp';
import note2Img from '~/assets/img/note-2.webp';
import note3Img from '~/assets/img/note-3.webp';
import note4Img from '~/assets/img/note-4.webp';
import psychoIsletImg from '~/assets/img/ilot-psycho.webp';
import treeIsletImg from '~/assets/img/ilot-arbre.webp';
import cloudLargeImg from '~/assets/img/nuage-1.webp';
import cloudMediumImg from '~/assets/img/nuage-2.webp';
import cloudSmallImg from '~/assets/img/nuage-3.webp';
import HomeButton from '~/components/ui/buttons/HomeButton';
import { Bird, ChimneySmoke, MusicNote, Waterfall } from '~/components/animation/IslandEffects';
import { MusicPlayer } from '~/components/MusicPlayer';
import {
    FloatingIslandScene,
    SceneLayer,
    SkyPhase,
} from '~/components/animation/FloatingIslandScene';
import useActionOnScroll from '~/hooks/useActionOnScroll';

import { CardDirection, HomeContent } from './HomeContent';
import { HeroTitle, SkyHint } from './HeroTitle';
import { useMenu } from '~/stores/useMenu';

// `card` : côtés vers lesquels s'ouvre la carte du sujet (sinon : au-dessus s'il y a la place, centrée)
type HeroButton = { variant: Topics; className: string; card?: CardDirection };

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
    // Point fixe (en % de l'image) où s'ouvrent, centrées, toutes les cartes de l'île ; sinon près de chaque bouton
    cardAnchor?: string;
    // Animations accrochées à l'image (positionnées en % de l'image)
    effects?: ReactNode;
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
        buttons: [
            { variant: 'psychology', className: 'top-[23%] left-[21%]', card: { y: 'below' } },
        ],
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
        effects: (
            // Même rendu en retrait que l'îlot
            <div className="absolute inset-0 opacity-90 saturate-[0.85]">
                <Bird src={bird1Img} left={6.39} top={8.71} width={10.74} />
                <Bird src={bird2Img} left={31.93} top={1.16} width={9.58} delay={1.8} />
                <Bird src={bird3Img} left={65.02} top={1.31} width={11.18} delay={3.1} />
                <Bird src={bird4Img} left={85.2} top={12.77} width={9.72} delay={0.9} />
            </div>
        ),
    },
    {
        src: musicIsletImg,
        left: 82,
        top: 80,
        width: ISLET_WIDTH,
        depth: 0.5,
        float: { amplitude: 8, duration: 6.5, delay: 0.5 },
        className: 'max-lg:hidden',
        buttons: [{ variant: 'music', className: 'top-[13%] left-[30%]' }],
        effects: (
            <>
                <MusicNote src={note1Img} left={56.62} top={10.49} width={6.84} />
                <MusicNote src={note2Img} left={63.9} top={17.58} width={6.55} delay={0.6} />
                <MusicNote src={note3Img} left={64.34} top={1.03} width={4.37} delay={1.2} />
                <MusicNote src={note4Img} left={67.69} top={7.09} width={6.11} delay={1.8} />
            </>
        ),
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
            { variant: 'games', className: 'top-[20%] left-[25%]' },
            { variant: 'teaching', className: 'top-[26%] left-[92%]' },
            { variant: 'sports', className: 'top-[63%] left-[86%]' },
            { variant: 'ecology', className: 'top-[70%] left-[33%]' },
            { variant: 'tech', className: 'top-[40%] left-[2%]' },
        ],
        // Au centre de l'île, sur l'arbre
        cardAnchor: 'top-[38%] left-[51%]',
        effects: (
            <>
                <Waterfall left={59} top={75} width={7.3} height={23} />
                {/* Sur le pan droit du toit de l'école */}
                <ChimneySmoke left={83.5} top={20.7} width={2} height={3.5} />
            </>
        ),
    },
];

// Intervalle (en s) entre le déclenchement de la pulsation de deux boutons successifs
const PULSE_INTERVAL = 0.03;

// Ordre de pulsation : tous les boutons de toutes les îles
const BUTTON_ORDER = ISLANDS.flatMap((island) => island.buttons.map((button) => button.variant));

// Heures locales (début inclus, fin exclue) pendant lesquelles il fait jour
const DAY_START_HOUR = 7;
const DAY_END_HOUR = 21;
// Durée (en h) de l'aube au début du jour et du crépuscule à la fin
const TWILIGHT_HOURS = 4;

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

    const closeTopic = useCallback(() => setCurrentTopicID('default'), []);

    // Vrai si l'une de ces îles porte la carte ou le lecteur ouvert
    const hasOpenPanel = (buttons: HeroButton[]) =>
        buttons.some(
            ({ variant }) => variant === currentTopicID || (variant === 'music' && musicOpen)
        );

    const clickTopic = (topicID: string) => {
        if (topicID === 'music') {
            // La musique n'a pas de carte : le bouton ouvre seulement le lecteur (et ferme la carte ouverte)
            setMusicOpen((prev) => !prev);
            closeTopic();
        } else {
            // Recliquer sur le bouton du sujet ouvert referme sa carte
            setCurrentTopicID((prev) => (prev === topicID ? 'default' : topicID));
        }
        if (!isOpen) {
            open('hero');
            setFullscreen(true);
            window.scrollTo({
                top: 0,
                behavior: 'smooth',
            });
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
                header={
                    <HeroTitle
                        hintVisible={currentTopicID === 'default' && !musicOpen}
                        fullscreen={fullscreen}
                    />
                }
                overlay={
                    <SkyHint
                        className="absolute bottom-[2%] left-1/2 w-full -translate-x-1/2 px-4"
                        delay={1.2}
                    >
                        {t('hero.scrollHint')}
                    </SkyHint>
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

                {ISLANDS.map(({ buttons, cardAnchor, effects, ...island }) => (
                    <SceneLayer
                        key={island.src}
                        {...island}
                        effects={effects}
                        // Immobilise l'île dont la carte ou le lecteur est ouvert : un texte qui flotte tremble (arrondi au pixel)
                        still={hasOpenPanel(buttons)}
                        // Passe l'île au premier plan pour que le lecteur ou la carte ouverts ne soient pas masqués
                        className={cn(island.className, hasOpenPanel(buttons) && 'z-20')}
                    >
                        {buttons.map(({ variant, className, card }) => (
                            <Fragment key={variant}>
                                {variant === 'music' ? (
                                    <MusicPlayer
                                        open={musicOpen}
                                        onClose={closeMusic}
                                        // Au-dessus du rond du bouton, avec une petite marge
                                        className={cn(className, '-mt-8')}
                                    />
                                ) : (
                                    <HomeContent
                                        topicID={variant}
                                        open={currentTopicID === variant}
                                        onClose={closeTopic}
                                        direction={cardAnchor ? { y: 'center' } : card}
                                        className={cardAnchor ?? className}
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
