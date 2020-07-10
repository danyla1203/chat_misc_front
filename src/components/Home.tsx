import React, { useState } from "react";
import { ChatList } from "./ChatList";
import { UserData } from "./App";
import { CurrentChat } from "./chat/CurrentChat";
import { UserSocket } from "./lib/UserSocket";

type HomeProps = {
    user: UserData,
}
export function Home(props: HomeProps) {
    const [ currentChat, setChat ] = useState("");
    const [ socket, setSocket ] = useState(new UserSocket("ws://localhost:8080"))
    
    const setCurrentChat = (chatLogin: string) => {
        setChat(chatLogin);
    }

    socket.onopen = () => {
        setSocket(socket);
    }
    if (socket.readyState === 1) {
        return (
            <div id="home">
                <ChatList 
                    setChat={ setCurrentChat }
                    socket={ socket }
                />
                <CurrentChat 
                    chat={ currentChat } 
                    socket={ socket }
                />
            </div>
        )
    } else {
        return (
            <div>Loading...</div>
        )
    }
}