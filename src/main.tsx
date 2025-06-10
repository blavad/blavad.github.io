import ReactDOM from 'react-dom/client';
import App from './App';

import './font.css';
import './index.css';

// Lire la vraie URL depuis le "?" après la redirection
const realPath = window.location.search.slice(1);
if (realPath) window.history.replaceState({}, '', realPath);

ReactDOM.createRoot(document.getElementById('root')!).render(<App />);
