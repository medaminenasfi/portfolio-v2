export interface AppConfig {
    env: string;
    name: string;
    port: number;
}
export interface DatabaseConfig {
    host: string;
    port: number;
    username: string;
    password: string;
    name: string;
    logging: boolean;
}
export interface AppConfiguration {
    app: AppConfig;
    database: DatabaseConfig;
}
declare const _default: () => AppConfiguration;
export default _default;
