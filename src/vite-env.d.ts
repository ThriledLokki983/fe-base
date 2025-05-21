/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly MODE: string;
  readonly VITE_PORT: string;
  readonly VITE_API_URL: string;
  readonly VITE_NODE_ENV: string;
  // more env variables...
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
