import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { cssVariables } from './styles/theme';
import App from './App';

// Inject global CSS
const styleEl = document.createElement('style');
styleEl.textContent = cssVariables;
document.head.appendChild(styleEl);

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
