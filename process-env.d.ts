declare global {
  namespace NodeJS {
    interface ProcessEnv {
      PORT: string;
      MONGO_CONNECTION_URI: string;
      BASE_URL_OSM: string;
      BASE_URL_ERP: string;
      SECRET: string;
      // add more environment variables and their types here
    }
  }
}
export {};