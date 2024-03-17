export interface IJwtPayload {
    login: string;
    id: number;
}

export interface ITokens {
    access_token: string;
    refresh_token: string;
    access_expire: number;
    refresh_expire: number;
}
