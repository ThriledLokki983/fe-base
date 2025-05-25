import { useState, useEffect, useMemo, useCallback } from 'react';
import { useLocation, matchPath, type RouteObject } from 'react-router-dom';
import { debounce } from '@grrr/utils';

import { PATH_NOT_FOUND } from '@config/paths';
import { CSS_BREAKPOINTS } from '@config/constants';
import ROUTES_ALL from '@config/routes';
import TOAST_DEFAULTS from '@components/common/Toast/Toast.defaults';

import { scrollToTop } from '@utils/utils';
import useAppStateReducer from '@hooks/reducers/useAppStateReducer';
import type { CustomRouteObject } from '@config/interfaces';
import type {
  AppState,
  InitialState,
  ToastInterface,
  ErrorToastOptions,
  MessageToastOptions,
} from '@hooks/interfaces';

const STATE_DEFAULTS: InitialState = {
  route: {},
  title: '',
  isLoading: false,
  isFetching: false,
  matchingBreakpoints: [],
};

function isCustomRouteObject(route: unknown): route is CustomRouteObject {
  return (
    typeof route === 'object' &&
    route !== null &&
    'path' in route &&
    'title' in route &&
    typeof (route as { title?: unknown }).title === 'string'
  );
}

/**
 * Custom hook to manage application state
 */
function useAppState(): AppState {
  const location = useLocation();
  const [toast, setToast] = useState<ToastInterface>(TOAST_DEFAULTS);
  const [state, stateDispatch, stateActions] = useAppStateReducer(STATE_DEFAULTS);

  /**
   * Set document title.
   */
  useEffect(() => {
    document.title = state.title;
  }, [state.title]);

  /**
   * Update page title.
   */
  useEffect(() => {
    const title = typeof state?.route?.title === 'string' ? state.route.title : '';
    stateDispatch(stateActions.updatePageTitle(title));
  }, [state.route, stateActions, stateDispatch]);

  /**
   * Handle route changes.
   */
  useEffect(() => {
    // Match route, or fall back to 404 | 'Not Found'.
    let foundRoute: unknown = { path: PATH_NOT_FOUND, title: 'Not Found' };
    for (const route of ROUTES_ALL as RouteObject[]) {
      if (route.children) {
        const match = route.children.find(
          (child) =>
            (child.path && matchPath(location.pathname, child.path)) ||
            child.path === PATH_NOT_FOUND
        );
        if (match) {
          foundRoute = match;
          break;
        }
      }
    }
    // Only dispatch if it's a CustomRouteObject
    if (isCustomRouteObject(foundRoute)) {
      stateDispatch(stateActions.updateRoute(foundRoute));
    } else {
      stateDispatch(
        stateActions.updateRoute({ path: PATH_NOT_FOUND, title: 'Not Found' } as CustomRouteObject)
      );
    }

    // Reset scroll position.
    scrollToTop();
  }, [location.pathname, stateActions, stateDispatch]);

  /**
   * Set matching breakpoints for responsive layout and listen for updates.
   */
  useEffect(() => {
    // Resize listeners.
    const listener = () => stateDispatch(stateActions.updateBreakPoints(CSS_BREAKPOINTS));
    const debouncedListener = debounce(listener, 150);

    // Initial trigger.
    listener();

    // Attach/Detach listener.
    window.addEventListener('resize', debouncedListener);
    return () => window.removeEventListener('resize', debouncedListener);
  }, [stateActions, stateDispatch]);

  /**
   * Toast helper.
   */
  const showToast = useCallback((options: ToastInterface) => {
    setToast({ ...TOAST_DEFAULTS, ...options, active: true });
  }, []);
  const hideToast = useCallback(() => {
    setToast((prevToast) => ({ ...prevToast, active: false }));
  }, []);
  const hasToast = toast.active;

  /**
   * Error toast helpers.
   */
  const showError = useCallback(
    (options: ErrorToastOptions) => {
      showToast({ ...options, type: 'error' });
    },
    [showToast]
  );
  const hideError = hideToast; // Alias for hideToast.
  const hasError = hasToast && toast.type === 'error'; // Verify we have an error.

  /**
   * Message toast helpers.
   */
  const showMessage = useCallback(
    (options: MessageToastOptions) => {
      showToast({ ...options, type: 'message', persistent: true });
    },
    [showToast]
  );
  const hideMessage = hideToast; // Alias for hideToast.
  const hasMessage = hasToast && toast.type === 'message'; // Verify we have a message.

  /*
   * Memoize the context, and only update when certain properties change.
   */
  return useMemo(
    () => ({
      state,
      stateDispatch,
      stateActions,
      toast,
      showToast,
      hideToast,
      hasToast,
      showError,
      hideError,
      hasError,
      showMessage,
      hideMessage,
      hasMessage,
    }),
    [
      state,
      stateDispatch,
      stateActions,
      toast,
      showToast,
      hideToast,
      hasToast,
      showError,
      hideError,
      hasMessage,
      showMessage,
      hideMessage,
    ]
  );
}

export default useAppState;
