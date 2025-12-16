export interface AuthiqUser {
    id: string;
    provider: string;
    name: string;
    email: string;
    image: string;
    exp?: number;
}
