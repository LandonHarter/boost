"use client";

import Loading from "@/components/loading/loading";
import useAuth from "@/hooks/useAuth";
import { Card, CardHeader } from "@nextui-org/react";
import Link from "next/link";
import { redirect } from "next/navigation";
import { useEffect, useState } from "react";

export default function CommunitiesPage() {
    const { user, signedIn, loading: userLoading } = useAuth();
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (userLoading) return;
        if (!signedIn) redirect("/");
        setLoading(false);
    }, [user]);

    if (loading || !user) {
        return (
            <main className="w-screen flex flex-col items-center justify-center" style={{
                height: "calc(100vh - 300px)"
            }}>
                <Loading />
            </main>
        );
    }
    return (
        <main className="w-screen flex flex-col mt-8 px-8">
            <h1 className="text-4xl font-semibold mb-4">Your Communities</h1>
            {user.communities.length === 0 ?
                <p className="text-xl text-gray-500">You are not in any communities</p> :
                <div className="flex">
                    {user.communities.map((community, i) => (
                        <Link key={i} href={"/community/" + community.id}>
                            <Card className="py-2 w-[300px]">
                                <CardHeader className="pb-0 pt-2 px-4 flex-col items-start mb-4">
                                    <h4 className="max-w-[276px] font-bold text-large overflow-hidden whitespace-nowrap text-ellipsis">{community.name}</h4>
                                    <small className="max-w-[256px] text-default-500 line-clamp-3">{"No community data"}</small>
                                </CardHeader>
                            </Card>
                        </Link>
                    ))}
                </div>
            }
        </main>
    );
}