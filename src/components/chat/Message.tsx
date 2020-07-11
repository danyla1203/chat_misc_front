import React from "react";
import { MessageType } from "./CurrentChat";


type MessageProps = {
    message: MessageType
}
export function Message(props: MessageProps) {
    return (
        <div className="message">

        </div>
    )
}