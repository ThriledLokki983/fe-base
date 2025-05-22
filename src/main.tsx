import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter as Router } from 'react-router-dom';
import { AppStateContextProvider } from '@contexts/AppStateContext';

import App from './App';

// Styles
import './styles/base.scss';
import './styles/components/common.module.scss';

const container = document.getElementById('root');
const root = container && createRoot(container);

root?.render(
  <StrictMode>
    <Router>
      <AppStateContextProvider>
        <App />
      </AppStateContextProvider>
    </Router>
  </StrictMode>
);
