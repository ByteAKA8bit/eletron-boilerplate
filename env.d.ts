/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly M_EXPRESS_PORT: string
  // more env variables...
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
