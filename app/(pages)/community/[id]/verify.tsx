"use client";

import { firestore } from "@/backend/firebase";
import Loading from "@/components/loading/loading";
import useAuth from "@/hooks/useAuth";
import NotFound from "@/not-found";
import { collection, doc, getDoc, getDocs, limit, orderBy, query } from "firebase/firestore";
import { useEffect, useState } from "react";
import CommunitySidebar from "./sidebar";
import CommunityChat from "./chat";

export default function CommunityVerification({ id }: { id: string }) {
    const [verified, setVerified] = useState(false);
    const [loading, setLoading] = useState(true);
    const { user, signedIn, loading: userLoading } = useAuth();

    const [chat, setChat] = useState<string>("");

    useEffect(() => {
        if (!userLoading && signedIn) {
            (async () => {
                const userDoc = await doc(collection(firestore, "communities/" + id + "/members"), user?.uid);
                const userSnapshot = await getDoc(userDoc);
                if (userSnapshot.exists()) {
                    setVerified(true);
                    setLoading(false);
                } else {
                    setVerified(false);
                    setLoading(false);
                }

                const chatDoc = await query(collection(firestore, "communities/" + id + "/chats"), limit(1), orderBy("createdAt", "desc"));
                const chatSnapshot = await getDocs(chatDoc);
                const primaryChat = chatSnapshot.docs[0];
                setChat(primaryChat.id);
            })();
        } else if (!user && !signedIn && !userLoading) {
            setVerified(false);
            setLoading(false);
        }
    }, [user]);

    if (loading) {
        return (
            <main className="w-screen flex flex-col items-center justify-center" style={{
                height: "calc(100vh - 300px)"
            }}>
                <Loading />
            </main>
        );
    }
    if (!verified) return <NotFound />;
    return (
        <main className="flex">
            <CommunitySidebar selected={chat} setSelected={setChat} community={id} />
            <CommunityChat communityId={id} chat={chat} />
        </main>
    );
}