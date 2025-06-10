import { createRoot } from 'react-dom/client';
import { App } from '@/app';

if ('serviceWorker' in navigator) {navigator.serviceWorker.register('/service-worker.js')}

createRoot(document.getElementById('root')!).render(<App />);

