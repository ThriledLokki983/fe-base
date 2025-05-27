import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter as Router } from 'react-router-dom';

import App from './App';

// Styles
import './styles/base.scss';
import './styles/components/common.module.scss';

// Initialize smooth corners
import './utils/smooth-corners';

const container = document.getElementById('root');
const root = container && createRoot(container);

root?.render(
  <StrictMode>
    <Router>
      <App />
    </Router>
  </StrictMode>
);
