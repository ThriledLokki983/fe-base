import type { ReactElement } from 'react';

interface AppProps {
  routes: ReactElement | null;
}

/**
 * Main App component that renders routes based on props
 */
export function App({ routes }: AppProps) {
  return routes;
}
