import React, { Component } from 'react';
import { LoginPage } from './LoginPage';
import { Home } from "./Home";

export type UserData = {
    user_id: number,
    name: string,
    email: string,
}

type userState = {
    userData: UserData,
    isLoged: boolean | null;
}

export class App extends Component<{}, userState> {
    componentDidMount() {
        if (this.state.isLoged) {
            return;
        }
        let xhr = new XMLHttpRequest();
        xhr.open("GET", "/data/user");
        xhr.send();
        xhr.onload = () => {
            if (xhr.status === 200) {
                this.setState({
                    userData: JSON.parse(xhr.response),
                    isLoged: true
                });
            }
        }
    }
     
    setUser(userData: UserData): void {
        this.setState({
            userData: userData,
            isLoged: true
        });
    }

    render() {
        if (this.state.isLoged === null) {
            return <LoginPage setUserData={ this.setUser } />;

        } else if (this.state.isLoged === false ) {
            return <LoginPage error="Data is wrong" setUserData={ this.setUser }/>

        } else {
            return <Home user={ this.state.userData }/>
        }
    }
}
