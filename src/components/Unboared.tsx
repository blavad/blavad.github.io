import { useEffect, useRef, useState } from 'react';

// Distance à l'écran à partir de laquelle la vidéo commence à se charger
const LOAD_MARGIN = '300px';

/** Vidéo d'Unboared (4 Mo), chargée seulement à l'approche de l'écran pour ne pas ralentir le Hero */
function UnboaredVideo() {
    const videoRef = useRef<HTMLVideoElement>(null);
    const [nearScreen, setNearScreen] = useState(false);

    useEffect(() => {
        const video = videoRef.current;
        if (!video) return;
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (!entry.isIntersecting) return;
                setNearScreen(true);
                observer.disconnect();
            },
            { rootMargin: LOAD_MARGIN }
        );
        observer.observe(video);
        return () => observer.disconnect();
    }, []);

    return (
        <video
            ref={videoRef}
            src={nearScreen ? '/videos/animation-unboared.mp4' : undefined}
            autoPlay
            muted
            loop
            playsInline
            preload="none"
            // Réserve la place de la vidéo avant son chargement (pas de saut de mise en page)
            className="aspect-[1476/1080] h-auto w-full"
        />
    );
}

export default UnboaredVideo;
