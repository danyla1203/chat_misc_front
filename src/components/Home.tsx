import React, { useState } from "react";
import { ChatList } from "./ChatList";
import { UserData } from "./App";
import { CurrentChat } from "./chat/CurrentChat";


type HomeProps = {
    user: UserData
}

export function Home(props: HomeProps) {
    const [ currentChat, setChat ] = useState("");

    const setCurrentChat = (chatLogin: string) => {
        setChat(chatLogin);
    }

    return (
        <div id="home">
            <ChatList setChat={ setCurrentChat }/>
            <CurrentChat chat={ currentChat } />
        </div>
    )
}