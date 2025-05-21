import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './styles/base.scss';
import './styles/components/common.module.scss';
import App from './App.tsx';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
