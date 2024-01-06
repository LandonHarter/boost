import { Navbar, NavbarBrand, NavbarContent, NavbarItem } from "@nextui-org/react";
import Image from "next/image";
import Link from "next/link";
import HeaderAccount from "./account";

export default function Header() {
    return (
        <header className="w-screen flex justify-center py-2 bg-[hsl(var(--nextui-background))]">
            <Navbar classNames={{
                base: "bg-[hsl(var(--nextui-background))]",
                content: "bg-[hsl(var(--nextui-background))]",
                wrapper: "max-w-none px-20"
            }}>
                <NavbarBrand>
                    <Link href="/" className="flex items-center">
                        <Image src="/images/icons/icon.png" alt="Boost Logo" width={1024} height={512} className="w-12 translate-y-1" />
                        <h1 className="text-2xl font-semibold text-[hsl(var(--nextui-primary))]">Boost</h1>
                    </Link>
                </NavbarBrand>
                <NavbarContent justify="center" className="gap-16">
                    <Link href="/mission"><NavbarItem className="font-semibold text-xl">Mission</NavbarItem></Link>
                    <Link href="/mission"><NavbarItem className="font-semibold text-xl">Mission</NavbarItem></Link>
                    <Link href="/mission"><NavbarItem className="font-semibold text-xl">Mission</NavbarItem></Link>
                </NavbarContent>
                <NavbarContent justify="end">
                    <HeaderAccount />
                </NavbarContent>
            </Navbar>
        </header>
    );
}