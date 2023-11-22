declare global {
  namespace NodeJS {
    interface ProcessEnv {
      [key: string]: string | undefined;
      PORT: string;
      MONGO_CONNECTION_URI: string;
      BASE_URL_OSM: string;
      // add more environment variables and their types here
    }
  }
}
