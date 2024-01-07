"use client";

import { createCommunity, joinCommunity } from "@/backend/actions/community";
import Loading from "@/components/loading/loading";
import useAuth from "@/hooks/useAuth";
import InfoSVG from "@/svg/info";
import { Button, Input, Textarea, Tooltip } from "@nextui-org/react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";

export default function CreateCommunity() {
    const router = useRouter();
    const { user, signedIn } = useAuth();
    const [loading, setLoading] = useState(false);

    if (loading) return (
        <main className="w-screen flex flex-col items-center justify-center" style={{
            height: "calc(100vh - 300px)"
        }}>
            <Loading />
        </main>
    );
    if (!signedIn) return;
    return (
        <main className="w-screen flex flex-col items-center justify-center" style={{
            height: "calc(100vh - 300px)"
        }}>
            <div className="flex items-center mb-8">
                <h1 className="text-4xl font-bold">Create Community</h1>
                <Tooltip content={
                    <div className="flex flex-col py-2 pr-4">
                        <h3 className="text-sm font-bold max-w-[200px]">What is a community?</h3>
                        <p className="max-w-[300px] text-xs">A community is a joinable group where people share common interests or goals</p>
                    </div>
                } className="w-fit h-fit">
                    <InfoSVG className="w-[20px] h-[20px] ml-4 translate-y-1" />
                </Tooltip>
            </div>
            <form className="flex flex-col items-center" action={async (data: FormData) => {
                const name = data.get("communityName") as string;
                const description = data.get("communityDescription") as string;

                if (!name || !description) {
                    toast.error("Please fill out all fields");
                    return;
                }

                setLoading(true);
                const communityId = await createCommunity(name, description);
                await joinCommunity(communityId, user?.uid!);
                router.push(`/community/${communityId}`);
            }}>
                <Input name="communityName" variant="faded" placeholder="Community Name" className="w-[500px] h-[50px] text-2xl mb-4" />
                <Textarea name="communityDescription" variant="faded" placeholder="Community Description" className="w-[500px] text-2xl mb-4" />
                <Button color="primary" className="w-full text-lg py-6 font-semibold" type="submit">Create</Button>
            </form>
        </main>
    );
}