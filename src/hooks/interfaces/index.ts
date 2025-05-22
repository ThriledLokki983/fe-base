import type { RouteObject } from 'react-router-dom';

import type {
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
} from './appState.interface';

import type {
  ApiResult,
  ConnectInterface,
  ConnectOptions,
  ErrorResponse,
  FetchesActiveType,
} from './api.interface';

import type { ContextProps, UserInterface, UserDataInterface } from './user.interface';

type CustomRouteObject = RouteObject & {
  label?: string;
  isNav?: boolean;
  isEnd?: boolean;
  isIndex?: boolean;
  title: string;
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
  ApiResult,
  ConnectInterface,
  ConnectOptions,
  ErrorResponse,
  FetchesActiveType,
  ContextProps,
  UserInterface,
  UserDataInterface,
  CustomRouteObject,
};
