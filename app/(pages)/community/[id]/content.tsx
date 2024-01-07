"use client";

import { firestore } from "@/backend/firebase";
import Loading from "@/components/loading/loading";
import useAuth from "@/hooks/useAuth";
import NotFound from "@/not-found";
import { collection, doc, getDoc } from "firebase/firestore";
import { useEffect, useState } from "react";

export default function CommunityContent({ id }: { id: string }) {
    const [verified, setVerified] = useState(false);
    const [loading, setLoading] = useState(true);
    const { user, signedIn, loading: userLoading } = useAuth();

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
        <main></main>
    );
}