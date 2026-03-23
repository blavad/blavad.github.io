'use client';

import { PropsWithChildren, useEffect } from 'react';
import { AnimatePresence } from 'framer-motion';
import useNavigate from '~/hooks/useNavigate';

import Navbar from './navbar/Navbar';
import MenuPage from './MenuPage';
import LoadingPage from './LoadingPage';

export default function PageWrapper({ children }: PropsWithChildren) {
    const navigate = useNavigate();

    useEffect(() => {
        navigate(window.location.pathname);
    }, []);

    return (
        <AnimatePresence mode="wait">
            <LoadingPage />
            <MenuPage />
            <Navbar />
            {children}
        </AnimatePresence>
    );
}
