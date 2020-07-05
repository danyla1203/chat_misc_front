import React from "react";

import { useState } from "react";
import { ChatItem } from "./ChatItem";

export type ChatItemFields = {
    chat_id: number,
    name: string,
    chatLogin: string,
    logo_ulr: string
}

type ChatListProps = {
    setChat: Function
}

export function ChatList(props: ChatListProps) {
    const [chatsList, setChats] = useState([]);

    const getChats = () => {
        let xhr = new XMLHttpRequest();
        xhr.open("GET", "/data/chats");
        xhr.send();
        xhr.onload = () => {
            setChats(JSON.parse(xhr.response));
        }
    }

    if(!chatsList) {
        getChats();
        return (
            <div id="chatList">Loading...</div>
        )

    } else {
        let chats = chatsList.map((chatData: ChatItemFields) => {
            return <ChatItem 
                        setChat={ props.setChat }
                        key={ chatData.chat_id } 
                        chat_id={ chatData.chat_id }
                        chatLogin = { chatData.chatLogin }
                        logo_ulr={ chatData.logo_ulr } 
                        name={ chatData.name }
                    />
        })
        return (
            <div id="chatList">
                { chats }
            </div>
        )
    }
}