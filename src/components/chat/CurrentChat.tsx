import React, { Component } from "react";
import { ChatInfo } from "./ChatInfo";
import { ChatMessages } from "./ChatMessages";
import { UserSocket } from "../lib/UserSocket";

export interface User {
    user_id: number;
    name: string;
    avatar_url: string;
}
export interface MessageType {
    message_id: number;
    text: string;
    autor: User
}

export interface ChatData {
    chat_id: number;
    name: string;
    description: string,
    chatNickname: string,
    logo_url: string,
    members: User[]
}

type CurrentChatState = {
    chatData: ChatData,
    messages: MessageType[]
}
type CurrentChatProps = {
    chat: string,
    socket: UserSocket
}
export class CurrentChat extends Component<CurrentChatProps, CurrentChatState> {
    getChatData(chatName: string) {
        let xhr = new XMLHttpRequest();
        xhr.open("GET", `/data/chat-data/${chatName}`);
        xhr.send();
        xhr.onload = () => {
            this.setState({
                chatData: JSON.parse(xhr.response)
            })
        }
    }

    getChatMessages(chatName: string) {
        let xhr = new XMLHttpRequest();
        xhr.open("GET", `/data/messages/${chatName}`);
        xhr.send();
        xhr.onload = () => {
            this.setState({
                messages: JSON.parse(xhr.response)
            })
        }
    }

    componentDidMount() {
        if (!this.state) {
            let props = this.props;
            //first time get chat data and messages
            this.getChatData(props.chat);
            this.getChatMessages(props.chat);
            
            //it handle messages from server
            props.socket.get({action: `chat-message/${props.chat}`}, (result) => {
                this.setState({
                    messages: this.state.messages.concat(result)
                })
            })
        }
    }

    render() {
        if (!this.state) {
            return (
                <div>Loading...</div>
            )
        }
        return (
            <div>
                <ChatInfo chatData={ this.state.chatData }/>
                <ChatMessages 
                    messages={ this.state.messages }
                    socket={ this.props.socket }
                />
            </div>
        )
    }
}