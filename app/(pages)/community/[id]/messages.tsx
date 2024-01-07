import { Message } from "@/types/Message";
import { Avatar } from "@nextui-org/react";

export function ChatMessage({ message }: { message: Message }) {
    return (
        <div className="flex items-start mt-12 self-start">
            <Avatar src={message.author.avatar} size="md" className="mr-4 translate-y-[38px]" />
            <div className="flex flex-col">
                <p className="text-gray-500 mb-1 ml-1">{message.author.name}</p>
                <div className="p-4 bg-[#d4d4d4] rounded-xl">
                    <h1 className="text-black text-lg">{message.text}</h1>
                </div>
            </div>
        </div>
    );
}

export function OwnMessage({ message }: { message: Message }) {
    return (
        <div className="p-4 bg-primary-500 self-end rounded-xl mt-12">
            <h1 className="text-white text-lg">{message.text}</h1>
        </div>
    )
}