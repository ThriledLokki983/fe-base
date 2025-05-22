import type { Dispatch } from 'react';
import type { CustomRouteObject, CssBreakPointsInterface } from '@config/interfaces';

interface InitialState {
  route: CustomRouteObject;
  title: string;
  isLoading: boolean;
  isFetching: boolean;
  matchingBreakpoints: string[];
}

interface ToastInterface {
  options?: Record<string, unknown> | null;
  active: boolean;
  type?: 'success' | 'error' | 'warning' | 'info' | 'message';
  title?: string;
  message?: string;
  persistent?: boolean;
  reload?: boolean;
  button?: {
    label: string;
    url: string;
  };
}

type ErrorToastOptions = Omit<ToastInterface, 'type'>;
type MessageToastOptions = Omit<ToastInterface, 'type' | 'persistent'>;

type ActionPayloadMap = {
  UPDATE_ROUTE: { route: CustomRouteObject };
  UPDATE_PAGE_TITLE: { title: string };
  UPDATE_BREAKPOINTS: { matchingBreakpoints: string[] };
  UPDATE_STATE_LOADING: { isLoading: boolean };
  UPDATE_STATE_FETCHING: { isFetching: boolean };
};

type ActionTypes = keyof ActionPayloadMap;

interface AppStateAction {
  type: ActionTypes;
  payload: ActionPayloadMap[ActionTypes];
}

type Actions = {
  updateRoute: (route: CustomRouteObject) => AppStateAction;
  updatePageTitle: (title: string) => AppStateAction;
  updateBreakPoints: (cssBreakPoints: CssBreakPointsInterface) => AppStateAction;
  updateStateLoading: (isLoading: boolean) => AppStateAction;
  updateStateFetching: (isFetching: boolean) => AppStateAction;
};

interface AppState {
  state: InitialState;
  stateDispatch: Dispatch<AppStateAction>;
  stateActions: Actions;

  toast: ToastInterface;
  hideToast: () => void;
  showToast: (toast: ToastInterface) => void;
  hasToast: boolean;

  showError: (toast: ErrorToastOptions) => void;
  hideError: () => void;
  hasError: boolean;

  showMessage: (toast: MessageToastOptions) => void;
  hideMessage: () => void;
  hasMessage: boolean;
}

type AppStateReducer = [state: InitialState, dispatch: Dispatch<AppStateAction>, actions: Actions];

type ActionCreator<T extends ActionTypes> = (...args: unknown[]) => {
  type: T;
  payload: ActionPayloadMap[T];
};

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
