"use client";

import { auth, firestore } from "@/backend/firebase";
import { User } from "@/types/User";
import { collection, doc, getDoc } from "firebase/firestore";
import { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";

export default function useAuth() {
    const [dbUser, setDbUser] = useState<User | null>(null);
    const [userLoading, setUserLoading] = useState(true);
    const [signedIn, setSignedIn] = useState(false);

    useEffect(() => {
        auth.onAuthStateChanged(async (user) => {
            await auth.authStateReady();
            console.log(auth.currentUser);
            if (user) {
                const uid = user.uid;
                const userDoc = doc(collection(firestore, "users"), uid);
                const userSnap = await getDoc(userDoc);
                const userData = {
                    uid,
                    ...userSnap.data()
                } as User;

                setDbUser(userData);
                setUserLoading(false);
                setSignedIn(true);
            } else {
                setDbUser(null);
                setUserLoading(false);
                setSignedIn(false);
            }
        });
    }, []);

    return {
        user: dbUser,
        signedIn,
        loading: userLoading
    };
}