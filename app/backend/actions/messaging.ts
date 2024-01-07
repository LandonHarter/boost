"use server";

import { User } from "@/types/User";
import { collection, doc, setDoc } from "firebase/firestore";
import { firestore } from "../firebase";

export async function sendMessage(message: string, chatId: string, communityId: string, author: User) {
    const messageDoc = doc(collection(firestore, "communities/" + communityId + "/chats/" + chatId + "/messages"));
    await setDoc(messageDoc, {
        text: message,
        createdAt: new Date(),
        author: {
            uid: author.uid,
            name: author.name,
            avatar: author.picture
        }
    });
}