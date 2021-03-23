export interface Config {
  port: string;
  apiUrl: string;
  webUrl: string;
  database: {
    url: string;
  };
  session: {
    secret: string;
  };
}
