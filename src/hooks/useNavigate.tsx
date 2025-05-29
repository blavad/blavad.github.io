import { useLoading } from '~/stores/useLoading';
import { useNavigate as useNavigateReact } from 'react-router-dom';
import topics from '~/data/topics.json';

function sleep(ms: number) {
    return new Promise((resolve) => setTimeout(resolve, ms));
}

function useNavigate() {
    const navigate = useNavigateReact();
    const openLoading = useLoading((state) => state.openLoading);
    const setLoading = useLoading((state) => state.setLoading);
    const initialLoading = useLoading((state) => state.initialLoading);

    return (path: string) => {
        const location = window.location;
        console.log('Navigating to:', path, 'Current location:', location.pathname);
        window.scrollTo({
            top: 0,
            behavior: 'smooth',
        });
        if (initialLoading || path !== location.pathname) {
            const topicID = path.slice(1, path.length);
            const color = topics[topicID]?.color || 'green';

            openLoading(color, 'Chargement en cours...')
                .then(() => {
                    navigate(path);
                    sleep(500)
                        .then(() => {
                            setLoading(false);
                        })
                        .catch((error) => {
                            console.error('Error during sleep:', error);
                            setLoading(false);
                        });
                })
                .catch(() => {
                    console.error('Failed to open loading page');
                });
        }
    };
}

export default useNavigate;
