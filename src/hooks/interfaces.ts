import type { Dispatch } from 'react';
import type { CssBreakPointsInterface } from '@config/interfaces/constants.interface';
import type { CustomRouteObject } from '@config/interfaces/routes.interface';

export type { CssBreakPointsInterface };

interface InitialState {
  route: CustomRouteObject | Record<string, unknown>;
  title: string;
  isLoading: boolean;
  isFetching: boolean;
  matchingBreakpoints: string[];
}

type ErrorToastOptions = Omit<ToastInterface, 'type'>;
type MessageToastOptions = Omit<ToastInterface, 'type' | 'persistent'>;

interface AppStateAction {
  type: string;
  payload?: unknown;
}

interface ToastInterface {
  options?: object | null;
  active: boolean;
  type?: 'success' | 'error' | 'warning' | 'info' | 'message' | string;
  title?: string;
  message?: string;
  persistent?: boolean;
  reload?: boolean;
  button?: {
    label: string;
    url: string;
  };
}

interface AppState {
  state: InitialState;
  stateDispatch: Dispatch<AppStateAction>;
  stateActions: Actions;

  toast: ToastInterface;
  hideToast: () => void;
  showToast: (toast: ToastInterface) => void;
  hasToast: boolean;

  showError: (toast: ToastInterface) => void;
  hideError: () => void;
  hasError: boolean;

  showMessage: (toast: ToastInterface) => void;
  hideMessage: () => void;
  hasMessage: boolean;
}

type AppStateReducer = [state: InitialState, dispatch: Dispatch<AppStateAction>, actions: Actions];

type ActionTypes =
  | 'UPDATE_ROUTE'
  | 'UPDATE_PAGE_TITLE'
  | 'UPDATE_BREAKPOINTS'
  | 'UPDATE_STATE_LOADING'
  | 'UPDATE_STATE_FETCHING';

type Actions = {
  updateRoute: (route: CustomRouteObject) => AppStateAction;
  updatePageTitle: (title: string) => AppStateAction;
  updateBreakPoints: (cssBreakPoints: CssBreakPointsInterface) => AppStateAction;
  updateStateLoading: (isLoading: boolean) => AppStateAction;
  updateStateFetching: (isFetching: boolean) => AppStateAction;
};

type ActionCreator<T extends ActionTypes> = (...args: unknown[]) => { type: T; payload: unknown };

type ActionCreators = {
  [K in ActionTypes]: ActionCreator<K>;
};

export type {
  ActionCreators,
  Actions,
  ActionTypes,
  AppState,
  AppStateAction,
  AppStateReducer,
  ErrorToastOptions,
  InitialState,
  MessageToastOptions,
  ToastInterface,
};
