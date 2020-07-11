import React from "react";
import { MessageType } from "./CurrentChat";


type MessageProps = {
    message: MessageType
}
export function Message(props: MessageProps) {
    let autor = props.message.autor;
    let text = props.message.text;
    return (
        <div className="message">
            <div className="autor">
                <img src={ autor.avatar_url } alt="user"/>
                <h4>{ autor.name }</h4>
            </div>
            { text } 
        </div>
    )
}