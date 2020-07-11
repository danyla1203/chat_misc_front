import React, { useState } from "react";
import { ChatData } from "./CurrentChat";
import { ChatMembers } from "./ChatMembers";

type ChatInfoProps = {
    chatData: ChatData
}
export function ChatInfo(props: ChatInfoProps) {
    let [ isOpen, setState ] = useState(false);

    const toogle = () => {
        isOpen ? setState(false) : setState(true);
    }

    if (isOpen) {
        return (
            <div id="popup">
                <img src={ props.chatData.logo_url } alt="chat logo"/>
                <h4>{ props.chatData.name }</h4>
                <h4>{ props.chatData.chatNickname }</h4>
                <p>{ props.chatData.description }</p>
                <ChatMembers users={ props.chatData.members }/>
            </div>
        )
    } else {
        return (
            <div>
                <button onClick={ toogle }>Show group info</button>
            </div>
        )
    }
}