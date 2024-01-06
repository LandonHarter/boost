"use client";

import { auth } from "@/backend/firebase";
import { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";

export default function useAuth() {
    const [user, loading, error] = useAuthState(auth);
    const [signedIn, setSignedIn] = useState(false);

    useEffect(() => {
        if (user) {
            setSignedIn(true);
        } else {
            setSignedIn(false);
        }
    }, [loading])

    return {
        user,
        signedIn,
        loading
    };
}