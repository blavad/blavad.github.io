import { useEffect } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import useNavigate from '~/hooks/useNavigate';

export default function PageWrapper() {
    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        navigate(location.pathname);
    }, [location.pathname]);

    return (
        <AnimatePresence mode="wait">
            <Outlet />
        </AnimatePresence>
    );
}
