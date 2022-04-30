declare global {
  namespace NodeJS {
    interface ProcessEnv {
      PUSHER_APP_ID: string;
      PUSHER_SECRET: string;
    }
  }
}

export {};
