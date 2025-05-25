import type { ReactElement } from 'react';
import { useRoutes } from 'react-router-dom';
import ROUTES_ALL from '@config/routes';
import { useAppStateContext } from '@contexts/index';
import withMainAppHocs from '@hocs/index';
import { App } from '@components/App';
import { Loader } from '@components/common/index';

/**
 * Core component that handles routing and global app state
 */
function CoreComponent(): ReactElement | null {
  const routes = useRoutes(ROUTES_ALL);
  const appState = useAppStateContext();

  if (appState.state.isLoading) {
    return <Loader aria-label="Application loading" message="Initializing application..." />;
  }

  return <App routes={routes} />;
}

/**
 * Main application with all HOCs applied
 */
const WrappedApp = withMainAppHocs(CoreComponent);
export default WrappedApp;
