import { useEffect, useState } from 'react';

function useActionOnScroll(onScrollDown?: () => void, onScrollUp?: () => void) {
    const [lastScrollY, setLastScrollY] = useState(0);

    useEffect(() => {
        const handleScroll = () => {
            const currentScrollY = window.scrollY;
            if (currentScrollY > lastScrollY) {
                console.log('Scrolling down');
                if (onScrollDown) onScrollDown();
            } else {
                console.log('Scrolling up');
                if (onScrollUp) onScrollUp();
            }
            setLastScrollY(currentScrollY);
        };

        window.addEventListener('scroll', handleScroll);

        return () => window.removeEventListener('scroll', handleScroll);
    }, [lastScrollY]);
}

export default useActionOnScroll;
