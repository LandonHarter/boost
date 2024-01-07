"use client";

import { firestore } from "@/backend/firebase";
import ChatSVG from "@/svg/chat";
import PlusSVG from "@/svg/plus";
import { Chat } from "@/types/Message";
import { Button, Input, Modal, ModalBody, ModalContent, ModalHeader, useDisclosure } from "@nextui-org/react";
import { addDoc, collection, getDocs, orderBy, query } from "firebase/firestore";
import { useEffect, useState } from "react";
import { toast } from "sonner";

export default function CommunitySidebar({ selected, setSelected, community }: { selected: string, setSelected: (selected: string) => void, community: string }) {
    const [chats, setChats] = useState<Chat[]>([]);
    const { isOpen, onOpen, onOpenChange } = useDisclosure();

    useEffect(() => {
        (async () => {
            const chatsQuery = query(collection(firestore, "communities/" + community + "/chats"), orderBy("createdAt", "desc"));
            const chatsSnapshot = await getDocs(chatsQuery);
            setChats(chatsSnapshot.docs.map(doc => ({ ...doc.data(), id: doc.id } as Chat)));
        })();
    }, []);

    return (
        <>
            <div className="fixed left-0 top-[80px] w-[300px] border-r-2 border-gray-200" style={{
                height: "calc(100vh - 80px)",
            }}>
                {chats.map((chat, i) => {
                    return (
                        <div key={i} className={"w-full py-3 flex items-center cursor-pointer rounded-xl " + (selected == chat.id ? "bg-[#d8d8d8]" : "bg-transparent")} onClick={() => setSelected(chat.id)}>
                            <ChatSVG className="w-6 h-6 ml-4 mr-3 translate-y-1" pathClassName="fill-[hsl(var(--nextui-foreground))]" />
                            <h1 className="text-lg font-medium">{chat.name}</h1>
                        </div>
                    );
                })}
                <div className="w-full py-3 flex justify-center items-center cursor-pointer rounded-xl border-2 border-dashed" onClick={() => {
                    onOpen();
                }}>
                    <PlusSVG className="w-6 h-6 mr-[6px]" pathClassName="fill-[hsl(var(--nextui-foreground))]" />
                    <h1 className="text-lg font-medium ml-[6px]">Create New</h1>
                </div>
            </div>
            <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
                <ModalContent className="py-4">
                    {(onClose) => (
                        <>
                            <ModalHeader className="flex flex-col items-center text-3xl">Create Channel</ModalHeader>
                            <ModalBody>
                                <form className="flex flex-col items-center" action={async (data: FormData) => {
                                    const name = data.get("channelName") as string;
                                    if (!name || name.length < 1) {
                                        toast.error("Please enter a channel name!");
                                        return;
                                    }

                                    const doc = collection(firestore, "communities/" + community + "/chats");
                                    const result = await addDoc(doc, {
                                        name,
                                        createdAt: Date.now(),
                                    });

                                    setChats([...chats, {
                                        id: result.id,
                                        name,
                                        createdAt: new Date()
                                    }]);
                                    setSelected(result.id);

                                    toast.success("Channel created!");
                                    onClose();
                                }}>
                                    <Input placeholder="Channel Name" variant="faded" name="channelName" />
                                    <Button className="mt-4 w-full" color="primary" type="submit">Create</Button>
                                </form>
                            </ModalBody>
                        </>
                    )}
                </ModalContent>
            </Modal>
        </>
    );
}