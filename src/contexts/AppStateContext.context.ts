import { createContext } from 'react';
import type { AppState } from '@hooks/interfaces';

// We initialize with an empty object and type assertion since the provider will set the actual value
export const AppStateContext = createContext<AppState>({} as AppState);
