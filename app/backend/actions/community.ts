"use server";

import { addDoc, arrayUnion, collection, doc, setDoc, updateDoc } from "firebase/firestore";
import { firestore } from "../firebase";
import { Community } from "@/types/Community";

export async function createCommunity(name: string, description: string) {
    const communityDoc = doc(collection(firestore, "communities"));
    const communityId = communityDoc.id;
    await setDoc(communityDoc, {
        name,
        description,
        createdAt: new Date()
    });

    const chatRef = collection(firestore, `communities/${communityId}/chats`);
    await addDoc(chatRef, {
        name: "general",
        createdAt: new Date()
    });

    return communityId;
}

export async function joinCommunity(community: Partial<Community>, userId: string) {
    const communityMembers = collection(firestore, `communities/${community.id}/members`);
    const memberDoc = doc(communityMembers, userId);
    await setDoc(memberDoc, {
        joinedAt: new Date()
    });

    await updateDoc(doc(collection(firestore, "users"), userId), {
        communities: arrayUnion({
            id: community.id,
            name: community.name
        })
    });
}