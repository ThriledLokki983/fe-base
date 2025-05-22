import { useReducer, useMemo } from 'react';
import type { Reducer } from 'react';

import { SITE_TITLE } from '@config/constants';

import type { CustomRouteObject } from '@hooks/interfaces/index';
import type { CssBreakPointsInterface } from '@config/interfaces/index';
import { getMatchingBreakpoints } from '@utils/utils';
import type {
  Actions,
  InitialState as AppState,
  AppStateAction,
  ActionCreators,
  AppStateReducer,
  ActionTypes,
} from 'hooks/interfaces';

/**
 * This is a custom useReducer hook leveraging React useReducer hook but in turn has
 * custom created actions that will take care of manipulating our state without making
 * a messing up with the state.
 * @param initState - Initial state of the app.
 * @returns [state, dispatch, appActions] |
 * @description | state - Current state of the app.
 * @description | dispatch - Dispatch function to update the state.
 * @description | appActions - Custom actions to make changes to the state.
 */
const useAppStateReducer = (initState: AppState): AppStateReducer => {
  const [state, dispatch] = useReducer(
    appStateReducerFunction as Reducer<AppState, AppStateAction>,
    initState
  );

  // Generic action creators
  const actionCreators: ActionCreators = useMemo(
    () => ({
      UPDATE_ROUTE: (...args: unknown[]) => {
        const [route] = args as [CustomRouteObject];
        return { type: 'UPDATE_ROUTE', payload: { route } };
      },
      UPDATE_PAGE_TITLE: (...args: unknown[]) => {
        const [title] = args as [string];
        return {
          type: 'UPDATE_PAGE_TITLE',
          payload: { title: title ? `${title} | ${SITE_TITLE}` : SITE_TITLE },
        };
      },
      UPDATE_BREAKPOINTS: (...args: unknown[]) => {
        const [cssBreakPoints] = args as CssBreakPointsInterface;
        const numericBreakpoints = Array.from(cssBreakPoints).map(Number);
        return {
          type: 'UPDATE_BREAKPOINTS',
          payload: { matchingBreakpoints: getMatchingBreakpoints(numericBreakpoints) },
        };
      },
      UPDATE_STATE_LOADING: (...args: unknown[]) => {
        const [isLoading] = args as [boolean];
        return { type: 'UPDATE_STATE_LOADING', payload: { isLoading } };
      },
      UPDATE_STATE_FETCHING: (...args: unknown[]) => {
        const [isFetching] = args as [boolean];
        return { type: 'UPDATE_STATE_FETCHING', payload: { isFetching } };
      },
    }),
    []
  );

  // Type-safe wrappers for Actions
  const actions: Actions = useMemo(
    () => ({
      updateRoute: (route) => actionCreators['UPDATE_ROUTE'](route),
      updatePageTitle: (title) => actionCreators['UPDATE_PAGE_TITLE'](title),
      updateBreakPoints: (cssBreakPoints) => actionCreators['UPDATE_BREAKPOINTS'](cssBreakPoints),
      updateStateLoading: (isLoading) => actionCreators['UPDATE_STATE_LOADING'](isLoading),
      updateStateFetching: (isFetching) => actionCreators['UPDATE_STATE_FETCHING'](isFetching),
    }),
    [actionCreators]
  );

  return [state, dispatch, actions];
};

/**
 * This is a custom reducer object that will update the state based on the action type.
 * @param state - Current state of the app.
 * @param action - Action to be performed on the state.
 * @returns Updated state.
 */
const appStateReducer: Record<ActionTypes, AppStateActionHandler> = {
  UPDATE_ROUTE: (state: AppState, action: AppStateAction): AppState => {
    const payload = action.payload as { route: CustomRouteObject };
    return payload && payload.route ? { ...state, route: payload.route } : state;
  },
  UPDATE_PAGE_TITLE: (state: AppState, action: AppStateAction): AppState => {
    const payload = action.payload as { title: string };
    return payload && typeof payload.title === 'string'
      ? { ...state, title: payload.title }
      : state;
  },
  UPDATE_BREAKPOINTS: (state: AppState, action: AppStateAction): AppState => {
    const payload = action.payload as { matchingBreakpoints: string[] };
    return payload && Array.isArray(payload.matchingBreakpoints)
      ? { ...state, matchingBreakpoints: payload.matchingBreakpoints }
      : state;
  },
  UPDATE_STATE_LOADING: (state: AppState, action: AppStateAction): AppState => {
    const payload = action.payload as { isLoading: boolean };
    return payload && typeof payload.isLoading === 'boolean'
      ? { ...state, isLoading: payload.isLoading }
      : state;
  },
  UPDATE_STATE_FETCHING: (state: AppState, action: AppStateAction): AppState => {
    const payload = action.payload as { isFetching: boolean };
    return payload && typeof payload.isFetching === 'boolean'
      ? { ...state, isFetching: payload.isFetching }
      : state;
  },
};

/**
 * This is a custom reducer function that will take care of updating the state based
 * on the action type using the reducer object above.
 * @param state
 * @param action
 * @returns Updated state.
 */
const appStateReducerFunction: Reducer<AppState, AppStateAction> = (state, action) =>
  appStateReducer[action['type'] as ActionTypes](state, action);

interface AppStateActionHandler {
  (state: AppState, action: AppStateAction): AppState;
}

export default useAppStateReducer;
