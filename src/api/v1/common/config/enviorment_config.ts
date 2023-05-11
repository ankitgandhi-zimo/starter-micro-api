import * as dotenv from "dotenv";
dotenv.config();
var { parsed } = dotenv.config();

interface IEnvironmentConfig {
  JWT_AUDIENCE: string;
  JWT_TOKEN_SECRET: string;
  JWT_TOKEN_ISSUER: string;
  PORT: string;
  JWT_TOKEN_EXPIRY_TIME: string;
  JWT_REFRESH_TOKEN_EXPIRY_TIME: string;
  DB_URL: string;
  DB_URL_LIVE: string;
  CLOUD_NAME: string;
  CLOUD_API_KEY: string;
  CLOUD_API_SECRET: string;
  SEND_GRID_API_KEY: string;

  AWS_ACCESS_KEY_ID: string;
  AWS_SECRET_ACCESS_KEY: string;
  BUCKET_NAME: string;
  REGION: string;
  CRYPTO_PASSWORD: string;
  CRYPTO_ALGORITHM: any;

  SMTP_service: string;
  SMTP_username: string;
  SMTP_password: string;
  SMTP_host: string;
  SMTP_mailUserName: string;
  SMTP_verificationMail: string;
  SMTP_ClientEmail: string;

  sendGrid_API_KEY: string;

  CLAIM_TOKEN_URL: string;

  CLAIM_TOKEN_client_id: string;
  CLAIM_TOKEN_client_secret: string;
  CLAIM_TOKEN_grant_type: string;

  CLAIM_SUBMISSION_URL: string;
  CLAIM_STATUS_DETAILS_URL: string;

  STRIPE_PRIVATE_KEY: string;
  STRIPE_PUBLIC_KEY: string;
}
var EnvironmentConfig: IEnvironmentConfig = <
  IEnvironmentConfig
>(parsed as any);

export default EnvironmentConfig;
