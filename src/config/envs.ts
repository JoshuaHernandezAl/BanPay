import 'dotenv/config';
import * as joi from 'joi';

interface EnvVars {
  PORT: number;
  DB_PASSWORD: string;
  DB_NAME: string;
  DB_HOST: string;
  DB_PORT: number;
  DB_USERNAME: string;
  GHIBLI_URL: string;
}

const envVarsSchema = joi.object<EnvVars>({
  PORT: joi.number().required(),
  DB_PASSWORD: joi.string().required(),
  DB_NAME: joi.string().required(),
  DB_HOST: joi.string().required(),
  DB_PORT: joi.number().required(),
  DB_USERNAME: joi.string().required(),
  GHIBLI_URL: joi.string().required(),
}).unknown(true)

const { error, value } = envVarsSchema.validate(process.env);

if (error) {
  throw new Error(`Config validation error: ${error.message}`);
}

const envVars: EnvVars = value;


export const envs = {
  port: envVars.PORT,
  dbPassword:envVars.DB_PASSWORD,
  dbName:envVars.DB_NAME,
  dbHost:envVars.DB_HOST,
  dbPort:envVars.DB_PORT,
  dbUsername:envVars.DB_USERNAME,
  ghibliUrl:envVars.GHIBLI_URL,
}