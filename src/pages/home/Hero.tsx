import { useState } from 'react';

import topics from '~/data/topics.json';
import img from '~/assets/img/camion-3d.jpg';
import HomeButton from '~/components/ui/buttons/HomeButton';
import { SmoothParallaxImage } from '~/components/animation/SmoothParallaxImage';
import { HomeContent } from './HomeContent';
import useActionOnScroll from '~/hooks/useActionOnScroll';
import { motion } from 'framer-motion';
import RotatingIconButton from '~/components/ui/buttons/RotatingIconButton';
import Navbar from '~/components/navbar/Navbar';

function Hero() {
    const [currentTopicID, setCurrentTopicID] = useState('default');
    const [fullscreen, setFullscreen] = useState(false);

    const openTopic = (topicID: string) => {
        setCurrentTopicID(topicID);
    };

    const closeTopic = () => {
        if (fullscreen) return;
        setCurrentTopicID('default');
    };

    const clickTopic = (topicID: string) => {
        if (!fullscreen) {
            setFullscreen(true);
            openTopic(topicID);
            window.scrollTo({
                top: 0,
                behavior: 'smooth',
            });
        }
    };

    useActionOnScroll(() => {
        setFullscreen((prev) => {
            if (prev) {
                closeTopic();
            }
            return false;
        });
    });

    const onClickMenu = () => {
        if (fullscreen) {
            setFullscreen(false);
            closeTopic();
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
            <Navbar>
                <RotatingIconButton open={fullscreen} onClick={onClickMenu} />
            </Navbar>
            <SmoothParallaxImage
                src={img}
                fullscreen={fullscreen}
                header={<HomeContent topicID={currentTopicID} fullscreen={fullscreen} />}
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
    );
}

export default Hero;
