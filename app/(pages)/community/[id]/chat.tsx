"use client";

import { sendMessage } from "@/backend/actions/messaging";
import { firestore } from "@/backend/firebase";
import Loading from "@/components/loading/loading";
import useAuth from "@/hooks/useAuth";
import SendSVG from "@/svg/send";
import { Message } from "@/types/Message";
import { Button, Input } from "@nextui-org/react";
import { collection, getDocs, limit, onSnapshot, orderBy, query } from "firebase/firestore";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { ChatMessage, OwnMessage } from "./messages";

export default function CommunityChat({ communityId, chat }: { communityId: string, chat: string }) {
    const { user, signedIn } = useAuth();
    const [messages, setMessages] = useState<Message[]>([]);
    const [loading, setLoading] = useState(true);
    const [messageInput, setMessageInput] = useState("");

    useEffect(() => {
        if (!chat) return;
        (async () => {
            setLoading(true);

            const messagesQuery = query(collection(firestore, "communities/" + communityId + "/chats/" + chat + "/messages"), orderBy("createdAt", "desc"), limit(25));
            const messagesSnapshot = await getDocs(messagesQuery);
            setMessages(messagesSnapshot.docs.map(doc => ({ ...doc.data(), id: doc.id } as Message)));

            setLoading(false);
        })();

        return onSnapshot(collection(firestore, "communities/" + communityId + "/chats/" + chat + "/messages"), (snapshot) => {
            setMessages(snapshot.docs.map(doc => ({ ...doc.data(), id: doc.id } as Message)));
        });
    }, [chat]);

    if (loading) {
        return (
            <div className="fixed top-[80px] left-[300px] flex justify-center items-center" style={{
                height: "calc(80vh - 80px)",
                width: "calc(100vw - 300px)"
            }}>
                <Loading />
            </div>
        );
    }
    return (
        <div className="fixed top-[80px] left-[300px]" style={{
            height: "calc(80vh - 80px)",
            width: "calc(100vw - 300px)"
        }}>
            <div className="flex flex-col-reverse items-start pb-12 px-8" style={{
                height: "calc(100vh - 150px)"
            }}>
                {messages.map((message, i) => {
                    if (!user) return;
                    const isAuthor = message.author.uid === user.uid;
                    return isAuthor ? <OwnMessage key={i} message={message} /> : <ChatMessage key={i} message={message} />;
                })}
            </div>
            <form className="px-6 flex items-center" action={async (data: FormData) => {
                if (!messageInput || messageInput.length < 1) {
                    toast.error("Please enter a message!");
                    return;
                }

                if (!signedIn || !user) {
                    toast.error("Please sign in to send a message!");
                    return;
                }

                setMessageInput("");
                await sendMessage(messageInput, chat, communityId, user);
            }}>
                <Input placeholder="Message" name="messageContent" variant="faded" className="mr-2" maxLength={1000} autoComplete="off" value={messageInput} onValueChange={setMessageInput} />
                <Button isIconOnly color="primary" className="w-[54px] h-[54px] p-3" type="submit">
                    <SendSVG className="h-full" pathClassName="stroke-[1.75px] stroke-white" />
                </Button>
            </form>
        </div>
    );
}