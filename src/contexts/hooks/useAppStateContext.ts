import { useContext } from 'react';
import { AppStateContext } from '../AppStateContext.context';

export const useAppStateContext = () => {
  const context = useContext(AppStateContext);
  if (context === undefined) {
    throw new Error('useAppStateContext must be used within an AppStateContextProvider');
  }
  return context;
};
