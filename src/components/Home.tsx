import React, { useState } from "react";
import { ChatList } from "./ChatList";
import { UserData } from "./App";
import { CurrentChat } from "./chat/CurrentChat";
import { UserSocket } from "./lib/UserSocket";

type HomeProps = {
    user: UserData,
    socket: UserSocket
}
export function Home(props: HomeProps) {
    const [ currentChat, setChat ] = useState("");
    
    const setCurrentChat = (chatLogin: string) => {
        setChat(chatLogin);
    }

    return (
        <div id="home">
            <ChatList 
                setChat={ setCurrentChat }
                socket={ props.socket }
            />
            <CurrentChat 
                chat={ currentChat } 
                socket={ props.socket }
            />
        </div>
    )
}