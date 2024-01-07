"use server";

import { collection, doc, setDoc } from "firebase/firestore";
import { firestore } from "../firebase";

export async function createCommunity(name: string, description: string) {
    const communityDoc = doc(collection(firestore, "communities"));
    const communityId = communityDoc.id;
    await setDoc(communityDoc, {
        name,
        description,
        createdAt: new Date()
    });
    return communityId;
}

export async function joinCommunity(communityId: string, userId: string) {
    const communityMembers = collection(firestore, `communities/${communityId}/members`);
    const memberDoc = doc(communityMembers, userId);
    await setDoc(memberDoc, {
        joinedAt: new Date()
    });
}