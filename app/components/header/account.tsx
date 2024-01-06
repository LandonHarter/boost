"use client";

import { auth } from "@/backend/firebase";
import useAuth from "@/hooks/useAuth";
import { Button } from "@nextui-org/react";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import Link from "next/link";

export default function HeaderAccount() {
    const { user, signedIn, loading } = useAuth();

    function signedInUI() {
        if (!signedIn) return;
        return (
            <Link href="/dashboard">
                <Button color="primary">Dashboard</Button>
            </Link>
        )
    }

    function signedOutUI() {
        return (
            <Button color="primary" onPress={async () => {
                await signInWithPopup(auth, new GoogleAuthProvider());
            }}>Sign In</Button>
        )
    }

    return signedIn ? signedInUI() : signedOutUI();
}