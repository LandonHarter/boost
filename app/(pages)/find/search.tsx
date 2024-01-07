"use client";

import Loading from "@/components/loading/loading";
import { PlaceData } from "@googlemaps/google-maps-services-js";
import { Button, Card, CardBody, CardHeader, Checkbox, Slider, SliderValue } from "@nextui-org/react";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { toast } from "sonner";

type GoogleMapsPlace = PlaceData & {
    displayName: {
        text: string;
    },
    shortFormattedAddress: string;
    googleMapsUri: string;
    photos: {
        widthPx: number;
        heightPx: number;
        name: string;
        authorAttributions: any[];
    }[];
};

export default function SearchHelp() {
    const [results, setResults] = useState<Partial<GoogleMapsPlace>[]>([]);
    const [loading, setLoading] = useState(true);
    const [distance, setDistance] = useState(15);
    const [queries, setQueries] = useState<string[]>(["food bank", "homeless shelter", "soup kitchen"]);

    async function search(location: GeolocationPosition) {
        if (!location) {
            toast.error("Failed to get your location. Please allow location access to use this feature.");
            return;
        }


        setLoading(true);
        const req = await fetch(`https://places.googleapis.com/v1/places:searchText`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "X-Goog-Api-Key": process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY!,
                "X-Goog-FieldMask": "*"
            },
            body: JSON.stringify({
                maxResultCount: 20,
                locationBias: {
                    circle: {
                        center: {
                            latitude: location.coords.latitude,
                            longitude: location.coords.longitude
                        },
                        radius: distance * 1000
                    }
                },
                textQuery: queries.join(", "),
            })
        });
        const res = await req.json();
        if (req.status !== 200) {
            toast.error(res.error.message);
            console.log(res.error.message);
            return;
        }

        setLoading(false);
        setResults(res.places);
    }

    useEffect(() => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(async (position) => {
                await search(position);
            }, (error) => {
                toast.error("Failed to get your location. Please allow location access to use this feature.");
                setLoading(false);
                console.log(error);
            }, {
                enableHighAccuracy: true,
                timeout: 5000,
                maximumAge: 0
            });
        }
    }, []);

    return (
        <>
            <div className="w-[80vw] flex">

            </div>
            {loading ?
                <div className="w-screen flex flex-col items-center justify-center">
                    <Loading />
                </div> :
                <div className="w-[80vw] px-8 flex justify-center flex-wrap gap-4 mb-8">
                    <div className="w-[300px] h-[247.19px] flex flex-col">
                        <Slider label="Distance (km)" step={0.5} maxValue={50} minValue={1} value={distance} onChange={(value: number | number[]) => {
                            setDistance(value as number);
                        }} className="w-[300px] mb-8 font-semibold" />
                        <Checkbox isSelected={queries.includes("food bank")} onValueChange={(value: boolean) => {
                            if (value) {
                                setQueries([...queries, "food bank"]);
                            } else {
                                setQueries(queries.filter((query) => query !== "food bank"));
                            }
                        }}>Food Bank</Checkbox>
                        <Checkbox isSelected={queries.includes("homeless shelter")} onValueChange={(value: boolean) => {
                            if (value) {
                                setQueries([...queries, "homeless shelter"]);
                            } else {
                                setQueries(queries.filter((query) => query !== "homeless shelter"));
                            }
                        }}>Homeless Shelter</Checkbox>
                        <Checkbox isSelected={queries.includes("soup kitchen")} onValueChange={(value: boolean) => {
                            if (value) {
                                setQueries([...queries, "soup kitchen"]);
                            } else {
                                setQueries(queries.filter((query) => query !== "soup kitchen"));
                            }
                        }}>Soup Kitchen</Checkbox>
                        <Button className="mt-8" onPress={async () => {
                            setLoading(true);
                            navigator.geolocation.getCurrentPosition(async (position) => {
                                await search(position);
                            }, (error) => {
                                toast.error("Failed to get your location. Please allow location access to use this feature.");
                                console.log(error);
                                setLoading(false);
                            });
                        }}>Search</Button>
                    </div>
                    {results.map((result, i) => {
                        return (
                            <Link key={i} href={result.googleMapsUri || '/'} target="_blank">
                                <Card className="py-4 w-[300px]">
                                    <CardHeader className="pb-0 pt-2 px-4 flex-col items-start">
                                        <small className="max-w-[276px] text-default-500 overflow-hidden whitespace-nowrap text-ellipsis">{result.shortFormattedAddress}</small>
                                        <h4 className="max-w-[276px] font-bold text-large overflow-hidden whitespace-nowrap text-ellipsis">{result.displayName?.text}</h4>
                                    </CardHeader>
                                    <CardBody className="overflow-visible py-2">
                                        <Image
                                            alt={result.displayName?.text || ""}
                                            className="rounded-xl w-full h-36 object-cover"
                                            src={result.photos?.length ? "https://places.googleapis.com/v1/" + result.photos[0].name + "/media?key=" + process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY + "&maxWidthPx=400" : "/images/missing.webp"}
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