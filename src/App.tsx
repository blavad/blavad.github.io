import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import { Teaching } from './pages/teaching';
import { Home } from './pages/home';

import './App.css';

const router = createBrowserRouter([
    {
        path: '/',
        // element: <Layout />,
        children: [
            { path: '/', element: <Home /> },
            { path: '/teaching', element: <Teaching /> },
        ],
    },
]);

function App() {
    return <RouterProvider router={router} />;
}

export default App;
