import { useState } from 'react';
import { motion } from 'framer-motion';

import topics from '~/data/topics.json';
import img from '~/assets/img/camion-3d.jpg';
import HomeButton from '~/components/ui/buttons/HomeButton';
import { SmoothParallaxImage } from '~/components/animation/SmoothParallaxImage';
import useActionOnScroll from '~/hooks/useActionOnScroll';
import RotatingIconButton from '~/components/ui/buttons/RotatingIconButton';
import Navbar from '~/components/navbar/Navbar';

import { HomeContent } from './HomeContent';

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
        } else {
            openTopic(topicID);
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
                paddingBottom: '1rem',
            }}
            animate={{
                paddingBottom: fullscreen ? '0' : '1rem',
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
                    variant="games"
                    className="absolute bottom-[40%] left-[16%]"
                    onHoverStart={openTopic}
                    onHoverEnd={closeTopic}
                    onClick={clickTopic}
                >
                    {topics['games'].title}
                </HomeButton>
                <HomeButton
                    variant="tech"
                    className="absolute bottom-[20%] left-[3%]"
                    onHoverStart={openTopic}
                    onHoverEnd={closeTopic}
                    onClick={clickTopic}
                >
                    {topics['tech'].title}
                </HomeButton>
                <HomeButton
                    variant="teaching"
                    className="absolute right-[21%] bottom-[35%]"
                    onHoverStart={openTopic}
                    onHoverEnd={closeTopic}
                    onClick={clickTopic}
                >
                    {topics['teaching'].title}
                </HomeButton>
                <HomeButton
                    variant="sports"
                    className="absolute right-[10%] bottom-[15%]"
                    onHoverStart={openTopic}
                    onHoverEnd={closeTopic}
                    onClick={clickTopic}
                >
                    {topics['sports'].title}
                </HomeButton>
                <HomeButton
                    variant="ecology"
                    className="absolute bottom-[5%] left-[40%]"
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
