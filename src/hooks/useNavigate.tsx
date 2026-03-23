import { useRouter } from 'next/navigation';
import { useLoading } from '~/stores/useLoading';
import { INITIAL_LOADING_DURATION, LOADING_DURATION } from '~/config/global';
import topics from '~/data/topics.json';
import { sleep } from '~/lib/utils';

function useNavigate() {
    const router = useRouter();
    const openLoading = useLoading((state) => state.openLoading);
    const setLoading = useLoading((state) => state.setLoading);
    const initialLoading = useLoading((state) => state.initialLoading);

    return (path: string) => {
        const pathname = window.location.pathname;
        window.scrollTo({
            top: 0,
            behavior: 'smooth',
        });
        if (initialLoading || path !== pathname) {
            const topicID = path.slice(1) || 'default';
            const color = (topics as any)[topicID]?.color || 'green';

            openLoading(color, `Chargement de ${path}`)
                .then(() => {
                    if (initialLoading) {
                        sleep(INITIAL_LOADING_DURATION)
                            .then(() => {
                                setLoading(false);
                            })
                            .catch((error) => {
                                console.error('Error during sleep:', error);
                                setLoading(false);
                            });
                    } else {
                        sleep(LOADING_DURATION)
                            .then(() => {
                                router.push(path);
                            })
                            .catch(() => {
                                router.push(path);
                            });
                    }
                })
                .catch(() => {
                    console.error('Failed to open loading page');
                });
        }
    };
}

export default useNavigate;
