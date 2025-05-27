import { useState } from 'react';
import { motion, useAnimation } from 'motion/react';

import topics from '~/data/topics.json';
import img from '~/assets/img/camion-3d.jpg';
import HomeButton from '~/components/ui/buttons/HomeButton';
import { SmoothParallaxImage } from '~/components/animation/SmoothParallaxImage';
import { HomeContent } from './HomeContent';
import RotatingIconButton from '~/components/ui/buttons/RotatingIconButton';

const LINE_HEIGHT = 15;
const LINE_APPEAR_TIME = 0.1;

export function Home() {
    const controls = useAnimation();
    const [currentTopicID, setCurrentTopicID] = useState('default');
    const [fullscreen, setFullscreen] = useState(false);

    const openTopicScreen = (topicID: string, fscreen: boolean) => {
        const newTopic = (topics as any)[topicID] || topics.default;
        setCurrentTopicID(topicID);
        return controls.start({
            y: fscreen ? 100 : 0,
            height: fscreen ? 85 + newTopic.description.length * LINE_HEIGHT : 'auto',
            transition: { height: { duration: newTopic.description.length * LINE_APPEAR_TIME } },
        });
    };

    const closeTopicScreen = (fscreen: boolean) => {
        setCurrentTopicID('default');
        return controls.start({
            y: fscreen ? 100 : 0,
            height: 'auto',
            transition: { duration: 0.3 },
        });
    };

    const clickTopic = (topicID: string) => {
        if (fullscreen) {
            setFullscreen(false);
            closeTopicScreen(false);
        } else {
            setFullscreen(true);
            openTopicScreen(topicID, true);
        }
    };

    const openTopic = (topicID: string) => {
        openTopicScreen(topicID, fullscreen);
    };

    const closeTopic = () => {
        if (fullscreen) return;
        closeTopicScreen(fullscreen);
    };

    const onClickMenu = () => {
        if (fullscreen) {
            setFullscreen(false);
            closeTopicScreen(false);
        } else {
            console.log('Opening menu');
        }
    };

    return (
        <motion.div
            className="flex h-full flex-col items-center justify-end"
            initial={{
                padding: '2rem',
            }}
            animate={{
                padding: fullscreen ? '0' : '2rem',
            }}
            transition={{ duration: 0.4, ease: 'easeInOut' }}
        >
            <RotatingIconButton open={fullscreen} onClick={onClickMenu} />
            <SmoothParallaxImage
                src={img}
                fullscreen={fullscreen}
                header={
                    <HomeContent
                        topicID={currentTopicID}
                        fullscreen={fullscreen}
                        animate={controls}
                    />
                }
            >
                <HomeButton
                    preset="games"
                    className="absolute top-12 left-75"
                    onHoverStart={openTopic}
                    onHoverEnd={closeTopic}
                    onClick={clickTopic}
                >
                    Games
                </HomeButton>
                <HomeButton
                    preset="tech"
                    className="absolute bottom-40 left-16"
                    onHoverStart={openTopic}
                    onHoverEnd={closeTopic}
                    onClick={clickTopic}
                >
                    Technology
                </HomeButton>
                <HomeButton
                    preset="teaching"
                    className="absolute top-26 right-87"
                    onHoverStart={openTopic}
                    onHoverEnd={closeTopic}
                    onClick={clickTopic}
                >
                    Teaching
                </HomeButton>
                <HomeButton
                    preset="sports"
                    className="absolute right-40 bottom-20"
                    onHoverStart={openTopic}
                    onHoverEnd={closeTopic}
                    onClick={clickTopic}
                >
                    Sports
                </HomeButton>
                <HomeButton
                    preset="ecology"
                    className="absolute bottom-0 left-130"
                    onHoverStart={openTopic}
                    onHoverEnd={closeTopic}
                    onClick={clickTopic}
                >
                    Ecology
                </HomeButton>
            </SmoothParallaxImage>
        </motion.div>
    );
}
