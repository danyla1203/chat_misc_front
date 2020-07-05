import React, { Component } from "react";
import { ChatInfo } from "./ChatInfo";

interface User {
    user_id: number;
    name: string;
    avatar_url: string;
}
export interface Message {
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
    messages: Message[]
}
export class CurrentChat extends Component<{chat: string}, CurrentChatState> {
    getChatData(chatName: string) {
        let xhr = new XMLHttpRequest();
        xhr.open("GET", `/data/chat/${chatName}`);
        xhr.send();
        xhr.onload = () => {
            this.setState({
                chatData: JSON.parse(xhr.response)
            })
        }
    }

    getChatMessages(chatName: string) {
        let xhr = new XMLHttpRequest();
        xhr.open("GET", `/data/chat/messages/${chatName}`);
        xhr.send();
        xhr.onload = () => {
            this.setState({
                messages: JSON.parse(xhr.response)
            })
        }
    }

    componentDidMount() {
        if (!this.state) {
            this.getChatData(this.props.chat);
            this.getChatMessages(this.props.chat);
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

            </div>
        )
    }
}