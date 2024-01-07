export type Message = {
    id: string;
    text: string;
    createdAt: Date;
    author: {
        uid: string;
        name: string;
        avatar: string;
    }
}

export type Chat = {
    id: string;
    name: string;
    createdAt: Date;
}