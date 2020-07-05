import React from "react";

type ChatItemProps = {
    chat_id: number,
    name: string,
    chatLogin: string,
    logo_ulr: string
    setChat: Function
}

export function ChatItem(props: ChatItemProps) {
    return (
        <div className="chatListItem" onClick={ () => { props.setChat(props.chatLogin) } }>
            <img src={ props.logo_ulr } alt=""/>
            <h3>{ props.name }</h3>
        </div>
    )
}