import React, { Component } from 'react';
import { LoginPage } from './LoginPage';
import { Home } from "./Home";

import { UserSocket } from "./lib/UserSocket";

export type UserData = {
    user_id: number,
    name: string,
    email: string,
    error?: string
}

type userState = {
    userData: UserData,
    socket: UserSocket
}

export class App extends Component<{}, userState> {
    componentDidMount() {
        if (this.state) {
            return;
        }
        
        let ws = new UserSocket("ws://localhost:8080");
        ws.onopen = () => {
            ws.get({ action: "login"}, (result) => {
                this.setState({
                    userData: result,
                    socket: ws
                })
            });
        }
    }
     
    setUser(userData: UserData): void {
        this.setState({
            userData: userData,
        });
    }

    render() {
        if (!this.state) {
            return <LoginPage 
                        setUserData={ this.setUser } 
                        socket={ this.state }
                    />;

        } else if (this.state.userData.error) {
            return <LoginPage 
                        error={ this.state.userData.error} 
                        setUserData={ this.setUser }
                        socket={ this.state.socket }
                    />

        } else {
            return <Home 
                        user={ this.state.userData }
                        socket={ this.state.socket }
                    />
        }
    }
}
