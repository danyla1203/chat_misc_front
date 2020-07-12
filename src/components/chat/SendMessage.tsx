import React from "react";
import { UserSocket } from "../lib/UserSocket";

type SendMessageProps = {
    socket: UserSocket
}
export function SendMessages(props: SendMessageProps) {
    const sendMessage = () => {
        let form = document.querySelector<HTMLFormElement>("#send_message_form")!;
        let input = form.elemnets.text;
        props.socket.get("message", { input: input }, (response) => {
            if (!response.ok) {
                alert("Something wrong, i can feel it");
            }
        });
    }

    return (
        <form id="send_message_form">
            <input type="text" name="text"/>
            <button onClick={ sendMessage }>Send</button>
        </form>
    )
}