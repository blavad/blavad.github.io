import { useLoading } from '~/stores/useLoading';
import { useNavigate as useNavigateReact } from 'react-router-dom';

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
        if (initialLoading || path !== location.pathname) {
            openLoading()
                .then(() => {
                    navigate(path);
                    sleep(1000)
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
