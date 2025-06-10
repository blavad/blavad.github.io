import { Navigate, RouterProvider, createBrowserRouter } from 'react-router-dom';

import Home from './pages/home';
import Teaching from './pages/Teaching';
import Tech from './pages/Tech';
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
                    <FadeWrapper>
                        <Home />
                    </FadeWrapper>
                ),
            },
            {
                path: '/tech',
                element: (
                    <FadeWrapper>
                        <Tech />
                    </FadeWrapper>
                ),
            },
            {
                path: '/teaching',
                element: (
                    <FadeWrapper>
                        <Teaching />
                    </FadeWrapper>
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
