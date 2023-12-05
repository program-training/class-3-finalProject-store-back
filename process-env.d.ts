declare global {
  namespace NodeJS {
    interface ProcessEnv {
      PORT: string;
      MONGO_CONNECTION_URI: string;
      BASE_URL_OSM: string;
      BASE_URL_ERP: string;
      BASE_URL_BANNERS: string;
      SECRET: string;
      GRAPHQL_PATH: string;
      // add more environment variables and their types here
    }
  }
}
export {};
