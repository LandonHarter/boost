"use client";

import { signIn } from "@/backend/auth";
import { auth } from "@/backend/firebase";
import useAuth from "@/hooks/useAuth";
import AccountSVG from "@/svg/account";
import SettingsSVG from "@/svg/settings";
import SignOutSVG from "@/svg/signout";
import { Avatar, Button, Dropdown, DropdownItem, DropdownMenu, DropdownSection, DropdownTrigger, Skeleton } from "@nextui-org/react";

export default function HeaderAccount() {
    const { user, signedIn, loading } = useAuth();

    function signedInUI() {
        if (!user) return;
        return (
            <Dropdown placement="bottom-end">
                <DropdownTrigger>
                    <Avatar src={user.picture} showFallback className="cursor-pointer transition-all" />
                </DropdownTrigger>
                <DropdownMenu>
                    <DropdownSection showDivider>
                        <DropdownItem key="profile" className="h-14 gap-2">
                            <p className="">Signed in as</p>
                            <p className="max-w-[150px] text-[14px] font-semibold overflow-hidden text-ellipsis whitespace-nowrap">{user.name}</p>
                        </DropdownItem>
                    </DropdownSection>
                    <DropdownItem startContent={<AccountSVG className="w-6 h-6 mr-1" pathClassName="stroke-1 stroke-[hsl(var(--nextui-foreground))]" />}>
                        Profile
                    </DropdownItem>
                    <DropdownItem startContent={<SettingsSVG className="w-[27px] h-[27px]" pathClassName="fill-[hsl(var(--nextui-foreground))]" />}>
                        Settings
                    </DropdownItem>
                    <DropdownItem color="danger" className="group" startContent={<SignOutSVG className="w-6 h-6 mr-[3px]" pathClassName="fill-none stroke-2 stroke-red-500 transition-all group-hover:stroke-white" />} onPress={() => {
                        auth.signOut();
                    }}>
                        Sign Out
                    </DropdownItem>
                </DropdownMenu>
            </Dropdown>
        );
    }

    function signedOutUI() {
        return (
            <Button color="primary" onPress={async () => {
                await signIn();
            }}>Sign In</Button>
        )
    }

    function loadingUI() {
        return (
            <Skeleton className="rounded-full">
                <Avatar />
            </Skeleton>
        );
    }

    return loading ? loadingUI() : (signedIn ? signedInUI() : signedOutUI());
}