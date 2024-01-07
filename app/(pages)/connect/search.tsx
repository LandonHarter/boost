"use client";

import { joinCommunity } from "@/backend/actions/community";
import { firestore } from "@/backend/firebase";
import Loading from "@/components/loading/loading";
import useAuth from "@/hooks/useAuth";
import SearchSVG from "@/svg/search";
import { Community } from "@/types/Community";
import { Button, Card, CardBody, CardHeader, Checkbox, Input } from "@nextui-org/react";
import { collection, doc, getDoc, getDocs, query, where } from "firebase/firestore";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "sonner";

export default function SearchCommunities() {
    const { user, signedIn } = useAuth();
    const [results, setResults] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [searchQuery, setSearchQuery] = useState("");
    const router = useRouter();

    async function search() {
        const communitiesQuery = query(collection(firestore, "communities"));
        const communitiesSnapshot = await getDocs(communitiesQuery);

        const communities: Community[] = [];
        communitiesSnapshot.forEach((doc) => {
            const data = doc.data();
            if (!data.name.toLowerCase().includes(searchQuery.toLowerCase())) {
                return;
            }

            communities.push({
                id: doc.id,
                ...data
            } as Community);
        });

        setLoading(false);
        setResults(communities);
    }

    useEffect(() => {
        search();
    }, []);

    return (
        <>
            {loading ?
                <div className="w-screen flex flex-col items-center justify-center">
                    <Loading />
                </div> :
                <div className="w-[75vw] flex flex-col items-center">
                    <div className="w-full px-8 flex items-center mb-4">
                        <Input
                            label="Search"
                            variant="faded"
                            placeholder="Search for a community"
                            value={searchQuery}
                            onValueChange={setSearchQuery}
                            className="w-full mr-2"
                        />
                        <Button isIconOnly color="primary" className="w-[54px] h-[54px] p-3" onPress={() => {
                            setLoading(true);
                            search();
                        }}>
                            <SearchSVG className="h-full" pathClassName="stroke-white" />
                        </Button>
                    </div>
                    <div className="w-full px-8 grid grid-cols-4 gap-4 mb-8">
                        {results.map((result, i) => {
                            return (
                                <Card key={i} className="py-2 w-[300px]">
                                    <CardHeader className="pb-0 pt-2 px-4 flex-col items-start mb-4">
                                        <h4 className="max-w-[276px] font-bold text-large overflow-hidden whitespace-nowrap text-ellipsis">{result.name}</h4>
                                        <small className="max-w-[256px] text-default-500 line-clamp-3">{result.description}</small>
                                    </CardHeader>
                                    <CardBody className="overflow-visible py-2">
                                        <Button color="primary" className="w-fit" onPress={async () => {
                                            if (!signedIn || !user) {
                                                toast.error("You must be signed in to join a community");
                                                return;
                                            }

                                            setLoading(true);

                                            const userRef = doc(collection(firestore, "communities/" + result.id + "/members"), user.uid);
                                            const userSnapshot = await getDoc(userRef);
                                            if (userSnapshot.exists()) {
                                                toast.error("You are already in this community");
                                                setLoading(false);
                                                return;
                                            }

                                            await joinCommunity(result.id, user.uid);
                                            toast.success("Joined community");
                                            router.push("/community/" + result.id);
                                        }}>Join</Button>
                                    </CardBody>
                                </Card>
                            );
                        })}
                    </div>
                    {results.length == 0 &&
                        <div className="w-full mt-[25px] px-8 flex flex-col items-center justify-center">
                            <h1 className="text-gray-500 text-3xl font-semibold">No communities found</h1>
                        </div>
                    }
                </div>
            }
        </>
    );
}