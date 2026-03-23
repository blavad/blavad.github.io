import { lazy, Suspense } from 'react';
import { Navigate, RouterProvider, createBrowserRouter } from 'react-router-dom';

const Home = lazy(() => import('./pages/home'));
const Teaching = lazy(() => import('./pages/Teaching'));
const Tech = lazy(() => import('./pages/Tech'));

import LoadingPage from './components/LoadingPage';

import PageWrapper from './components/PageWrapper';
import FadeWrapper from './components/FadeWrapper';

import './App.css';

const router = createBrowserRouter([
    {
        path: '/',
        element: <PageWrapper />,
        children: [
            {
                path: '/',
                element: (
                    <Suspense>
                        <FadeWrapper>
                            <Home />
                        </FadeWrapper>
                    </Suspense>
                ),
            },
            {
                path: '/tech',
                element: (
                    <Suspense>
                        <FadeWrapper>
                            <Tech />
                        </FadeWrapper>
                    </Suspense>
                ),
            },
            {
                path: '/teaching',
                element: (
                    <Suspense>
                        <FadeWrapper>
                            <Teaching />
                        </FadeWrapper>
                    </Suspense>
                ),
            },
        ],
    },

    {
        path: '*',
        element: <Navigate to="/" />,
    },
]);

function App() {
    return (
        <>
            <LoadingPage />
            <RouterProvider router={router} />
        </>
    );
}

export default App;
