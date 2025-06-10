import { useLoading } from '~/stores/useLoading';
import { useNavigate as useNavigateReact } from 'react-router-dom';
import { INITIAL_LOADING_DURATION, LOADING_DURATION } from '~/config/global';
import topics from '~/data/topics.json';
import { sleep } from '~/lib/utils';

function useNavigate() {
    const navigate = useNavigateReact();
    const openLoading = useLoading((state) => state.openLoading);
    const setLoading = useLoading((state) => state.setLoading);
    const initialLoading = useLoading((state) => state.initialLoading);

    console.log('useNavigate initialized');
    console.log('initialLoading:', initialLoading);

    return (path: string) => {
        const location = window.location;
        window.scrollTo({
            top: 0,
            behavior: 'smooth',
        });
        if (initialLoading || path !== location.pathname) {
            const topicID = path.slice(1, path.length);
            const color = (topics as any)[topicID]?.color || 'green';

            openLoading(color, `Chargement de ${path}`)
                .then(() => {
                    navigate(path);
                    sleep(initialLoading ? INITIAL_LOADING_DURATION : LOADING_DURATION)
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
