import React, { Component } from "react";
import { SendMessages } from "./SendMessage";
import { Message } from "./Message";
import { MessageType } from "./CurrentChat";

type MessagesProps = {
    messages: MessageType[];
}
type MessagesState = {
    messages: MessageType[];
}
export class ChatMessages extends Component<MessagesProps, MessagesState> {

    getRenderedMessages(messages: MessageType[]) {
        let renderedMessages = messages.map((message) => {
            return (
                <Message message={ message }/>
            )
        })
        return renderedMessages;
    }

    render() {
        let renderedMessages = this.getRenderedMessages(this.props.messages);    
        return (
            <div id="messages">
                { renderedMessages }
                <SendMessages />
            </div>
        )
    }

}