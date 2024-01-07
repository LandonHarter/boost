"use client";

import Loading from "@/components/loading/loading";
import { Button, Card, CardBody, CardHeader, Checkbox } from "@nextui-org/react";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { toast } from "sonner";

export default function SearchCauses() {
    const [results, setResults] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [queries, setQueries] = useState<string[]>(["homeless", "poverty", "natural disaster"]);

    async function search() {
        const req = await fetch("https://partners.every.org/v0.2/search/'" + queries.join(",") + "'?apiKey=" + process.env.NEXT_PUBLIC_EVERY_API_KEY + "&take=19");
        const data = await req.json();
        if (req.status !== 200) {
            toast.error("Error searching for causes, please try again later.");
            return;
        }

        setLoading(false);
        setResults(data.nonprofits);
    }

    useEffect(() => {
        search()
    }, []);

    return (
        <>
            {loading ?
                <div className="w-screen flex flex-col items-center justify-center">
                    <Loading />
                </div> :
                <div className="w-[75vw] px-8 grid grid-cols-4 gap-4 mb-8">
                    <div className="w-[300px] h-[247.19px] flex flex-col justify-between">
                        <div className="flex flex-col">
                            <Checkbox isSelected={queries.includes("poverty")} onValueChange={(value: boolean) => {
                                if (value) {
                                    setQueries([...queries, "poverty"]);
                                } else {
                                    setQueries(queries.filter((query) => query !== "poverty"));
                                }
                            }}>Poverty</Checkbox>
                            <Checkbox isSelected={queries.includes("homeless")} onValueChange={(value: boolean) => {
                                if (value) {
                                    setQueries([...queries, "homeless"]);
                                } else {
                                    setQueries(queries.filter((query) => query !== "homeless"));
                                }
                            }}>Homeless</Checkbox>
                            <Checkbox isSelected={queries.includes("natural disaster")} onValueChange={(value: boolean) => {
                                if (value) {
                                    setQueries([...queries, "natural disaster"]);
                                } else {
                                    setQueries(queries.filter((query) => query !== "natural disaster"));
                                }
                            }}>Natural Disasters</Checkbox>
                        </div>
                        <Button className="mt-8" onPress={async () => {
                            setLoading(true);
                            navigator.geolocation.getCurrentPosition(async (position) => {
                                await search();
                            }, (error) => {
                                toast.error("Failed to get your location. Please allow location access to use this feature.");
                                console.log(error);
                                setLoading(false);
                            });
                        }}>Search</Button>
                    </div>
                    {results.map((result, i) => {
                        return (
                            <Link key={i} href={result.websiteUrl || result.profileUrl} target="_blank">
                                <Card className="py-4 w-[300px]">
                                    <CardHeader className="pb-0 pt-2 px-4 flex-col items-start">
                                        <small className="max-w-[276px] text-default-500 overflow-hidden whitespace-nowrap text-ellipsis">{result.location || "No Location"}</small>
                                        <h4 className="max-w-[276px] font-bold text-large overflow-hidden whitespace-nowrap text-ellipsis">{result.name}</h4>
                                    </CardHeader>
                                    <CardBody className="overflow-visible py-2">
                                        <Image
                                            alt={result.displayName?.text || ""}
                                            className="rounded-xl w-full h-36 object-cover"
                                            src={result.coverImageUrl || "/images/missing.webp"}
                                            width={400}
                                            height={400}
                                        />
                                    </CardBody>
                                </Card>
                            </Link>
                        );
                    })}
                </div>
            }
        </>
    );
}