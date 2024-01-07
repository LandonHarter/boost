"use client";

import ChevronSVG from "@/svg/chevron";
import { Button } from "@nextui-org/react";
import { useRef } from "react";
import styles from "./styles.module.css";
import SearchCauses from "./search";

export default function DonatePage() {
    const search = useRef<HTMLDivElement>(null);

    return (
        <main className="w-screen flex flex-col items-center">
            <div className="flex flex-col items-center justify-center" style={{
                height: "calc(60vh - 80px)"
            }}>
                <h3 className="font-semibold text-[hsl(var(--nextui-primary-600))] text-xl mb-4">Donate</h3>
                <h1 className="text-center text-5xl font-bold mb-4">Find a cause worth supporting</h1>
                <p className="text-center text-2xl mb-8 text-gray-400">The struggle can be real, lighten the load for someone else.</p>
                <Button variant="light" className="text-lg text-gray-500" endContent={<ChevronSVG className={"w-3 h-3 translate-y-[2px] " + styles.chevron} pathClassName="stroke-[0.5px] fill-gray-500" />} onPress={() => {
                    search.current?.scrollIntoView({
                        behavior: "smooth"
                    });
                }}>Scroll Down</Button>
            </div>
            <div className="w-screen flex flex-col items-center pt-4" ref={search}>
                <SearchCauses />
            </div>
        </main>
    );
}