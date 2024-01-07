"use client";

import { Button } from "@nextui-org/react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function NotFound() {
    const router = useRouter();

    return (
        <main className="w-screen h-[70vh] flex flex-col items-center justify-center">
            <h3 className="font-semibold text-xl text-[hsl(var(--nextui-primary-600))] mb-4">404</h3>
            <h1 className="text-5xl text-center font-bold mb-4">We looked everywhere for this page!</h1>
            <p className="text-2xl text-gray-500 mb-8">Sorry we couldn't find your page. Try typing in a different url.</p>
            <div className="grid grid-cols-2 place-items-center">
                <Button variant='bordered' className='text-xl font-semibold px-6 h-12' onPress={() => {
                    router.back();
                }}>← Go Back</Button>
                <Link href="/"><Button color='primary' className='text-xl font-semibold px-6 h-12'>Continue Home</Button></Link>
            </div>
        </main>
    );
}