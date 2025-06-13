/**
 * .env.local.*ファイルを読み込む関数
 */
import { config } from 'dotenv';

/**
 * NODE_ENVに応じて適切な.envファイルを読み込む
 */
export function loadDotenv() {
    const env = (() => {
        console.error('NODE_ENV:', process.env.NODE_ENV);
        switch (process.env.NODE_ENV) {
            case 'production':
                return '.env.prod';
            case 'staging':
                return '.env.stg';
            case 'development':
                return '.env.dev';
            default:
                return '.env.local';
        }
    })();
    const envFile = `.env.${env}`;
    config({ path: envFile });
    console.log(`Loaded environment variables from ${envFile}`);
}