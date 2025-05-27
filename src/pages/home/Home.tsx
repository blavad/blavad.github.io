import { useState } from 'react';
import { motion, useAnimation } from 'motion/react';

import topics from '~/data/topics.json';
import img from '~/assets/img/camion-3d.jpg';
import HomeButton from '~/components/ui/buttons/HomeButton';
import { SmoothParallaxImage } from '~/components/animation/SmoothParallaxImage';
import { HomeContent } from './HomeContent';
import RotatingIconButton from '~/components/ui/buttons/RotatingIconButton';
import useActionOnScroll from '~/hooks/useActionOnScroll';

const LINE_HEIGHT = 18;
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
            height: fscreen ? 100 + newTopic.description.length * LINE_HEIGHT : 'auto',
            transition: { height: { duration: newTopic.description.length * LINE_APPEAR_TIME } },
            padding: fscreen ? '4px' : '3px',
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
        if (!fullscreen) {
            setFullscreen(true);
            openTopicScreen(topicID, true);
            window.scrollTo({
                top: 0,
                behavior: 'smooth', // ou "auto" pour instantané
            });
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

    useActionOnScroll(() => {
        setFullscreen((prev) => {
            if (prev) {
                closeTopicScreen(false);
            }
            return false;
        });
    });

    return (
        <>
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
                        {topics['games'].title}
                    </HomeButton>
                    <HomeButton
                        preset="tech"
                        className="absolute bottom-40 left-16"
                        onHoverStart={openTopic}
                        onHoverEnd={closeTopic}
                        onClick={clickTopic}
                    >
                        {topics['tech'].title}
                    </HomeButton>
                    <HomeButton
                        preset="teaching"
                        className="absolute top-26 right-87"
                        onHoverStart={openTopic}
                        onHoverEnd={closeTopic}
                        onClick={clickTopic}
                    >
                        {topics['teaching'].title}
                    </HomeButton>
                    <HomeButton
                        preset="sports"
                        className="absolute right-40 bottom-20"
                        onHoverStart={openTopic}
                        onHoverEnd={closeTopic}
                        onClick={clickTopic}
                    >
                        {topics['sports'].title}
                    </HomeButton>
                    <HomeButton
                        preset="ecology"
                        className="absolute bottom-0 left-130"
                        onHoverStart={openTopic}
                        onHoverEnd={closeTopic}
                        onClick={clickTopic}
                    >
                        {topics['ecology'].title}
                    </HomeButton>
                </SmoothParallaxImage>
            </motion.div>
            <p>
                <strong>Note:</strong> This is a work in progress. The topics are not yet fully
                implemented, and the animations are still being refined.
                <br />
                Feel free to explore and provide feedback!
            </p>
        </>
    );
}
