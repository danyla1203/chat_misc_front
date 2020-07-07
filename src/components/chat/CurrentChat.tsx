import React, { Component } from "react";
import { ChatInfo } from "./ChatInfo";
import { UserSocket } from "../lib/UserSocket";

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
type CurrentChatProps = {
    chat: string,
    socket: UserSocket
}
export class CurrentChat extends Component<CurrentChatProps, CurrentChatState> {
    getChatData(chatName: string) {
        this.props.socket.get({ action: `chat-data/${chatName}`}, (chatData) => {
            this.setState({
                chatData: chatData
            })
        });
    }

    getChatMessages(chatName: string) {
        this.props.socket.get({ action: `chat-messages/${chatName}`}, (chatData) => {
            this.setState({
                chatData: chatData
            })
        });
    }

    componentDidMount() {
        if (!this.state) {
            let props = this.props;
            this.getChatData(props.chat);
            this.getChatMessages(props.chat);
            
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

            </div>
        )
    }
}