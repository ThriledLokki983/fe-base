import type { ReactNode } from 'react';
import useAppState from '@hooks/useAppState';
import { AppStateContext } from './AppStateContext.context';

interface ContextProps {
  children: ReactNode;
}

/**
 * Provider component that wraps parts of the app that need access to app state
 */
export function AppStateContextProvider({ children }: ContextProps) {
  const appState = useAppState();

  // Ensure we have a valid state before rendering children
  if (!appState) {
    return <div>Initializing app state...</div>;
  }

  return <AppStateContext.Provider value={appState}>{children}</AppStateContext.Provider>;
}
