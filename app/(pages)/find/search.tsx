"use client";

import Loading from "@/components/loading/loading";
import { PlaceData } from "@googlemaps/google-maps-services-js";
import { Button, Card, CardBody, CardHeader } from "@nextui-org/react";
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
                        radius: 15000
                    }
                },
                textQuery: "homeless"
            })
        });
        const res = await req.json();
        if (req.status !== 200) {
            toast.error(res.error.message);
            console.log(res.error.message);
            return;
        }

        setResults(res.places);
    }

    useEffect(() => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(async (position) => {
                await search(position);
                setLoading(false);
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

    if (loading) return (
        <div className="w-screen flex flex-col items-center justify-center">
            <Loading />
        </div>
    );
    return (
        <>
            <div className="w-full px-8 flex justify-center flex-wrap gap-4 mb-8">
                {results.map((result, i) => {
                    return (
                        <Link key={i} href={result.googleMapsUri || '/'} target="_blank">
                            <Card className="py-4 w-[300px]">
                                <CardHeader className="pb-0 pt-2 px-4 flex-col items-start">
                                    <small className="text-default-500 overflow-hidden whitespace-nowrap text-ellipsis">{result.shortFormattedAddress}</small>
                                    <h4 className="font-bold text-large overflow-hidden whitespace-nowrap text-ellipsis">{result.displayName?.text}</h4>
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
        </>
    );
}