export type User = {
    uid: string;
    name: string;
    email: string;
    picture: string;
    communities: {
        id: string;
        name: string;
    }[];
};