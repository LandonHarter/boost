export type User = {
    uid: string;
    name: string;
    email: string;
    picture: string;
    accountType: 'user' | 'mentor';
};