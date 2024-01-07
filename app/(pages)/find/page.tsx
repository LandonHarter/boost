"use client";

import ChevronSVG from "@/svg/chevron";
import { Button } from "@nextui-org/react";
import SearchHelp from "./search";
import { useRef } from "react";
import styles from "./styles.module.css";

export default function FindPage() {
    const search = useRef<HTMLDivElement>(null);

    return (
        <main className="w-screen flex flex-col items-center">
            <div className="flex flex-col items-center justify-center" style={{
                height: "calc(60vh - 80px)"
            }}>
                <h3 className="font-semibold text-[hsl(var(--nextui-primary-600))] text-xl mb-4">Find Help</h3>
                <h1 className="text-center text-5xl font-bold mb-4">Find resources around you for extra support</h1>
                <p className="text-center text-2xl mb-8 text-gray-400">Here are some of the closest places to you</p>
                <Button variant="light" className="text-lg text-gray-500" endContent={<ChevronSVG className={"w-3 h-3 translate-y-[2px] " + styles.chevron} pathClassName="stroke-[0.5px] fill-gray-500" />} onPress={() => {
                    search.current?.scrollIntoView({
                        behavior: "smooth"
                    });
                }}>Scroll Down</Button>
            </div>
            <div className="w-screen flex flex-col items-center" ref={search}>
                <SearchHelp />
            </div>
        </main>
    );
}