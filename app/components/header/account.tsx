"use client";

import { signIn } from "@/backend/auth";
import useAuth from "@/hooks/useAuth";
import { Avatar, Button, Skeleton } from "@nextui-org/react";
import Link from "next/link";

export default function HeaderAccount() {
    const { user, signedIn, loading } = useAuth();

    function signedInUI() {
        if (!user) return;
        return (
            <Avatar src={user.picture} showFallback className="cursor-pointer" />
        );
    }

    function signedOutUI() {
        return (
            <Button color="primary" onPress={async () => {
                await signIn();
            }}>Sign In</Button>
        )
    }

    function loadingUI() {
        return (
            <Skeleton className="rounded-full">
                <Avatar />
            </Skeleton>
        );
    }

    return loading ? loadingUI() : (signedIn ? signedInUI() : signedOutUI());
}