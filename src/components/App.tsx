import React, { Component } from 'react';
import { LoginPage } from './LoginPage';
import { Home } from "./Home";

export type UserData = {
    user_id: number,
    name: string,
    email: string,
    error?: string
}

type userState = {
    userData: UserData,
}
export class App extends Component<{}, userState> {

    constructor(props: any) {
        super(props);
        this.setUser = this.setUser.bind(this);
    }

    componentDidMount() {
        if (this.state) {
            return;
        }
        
        let xhr = new XMLHttpRequest();
        xhr.open("GET", "http://localhost:8080/login");
        xhr.send();
        xhr.onload = () => {
            let result = JSON.parse(xhr.response);
            if (result.status === 200) {
                this.setState({
                    userData: result.userData
                })
            }
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
                    />;

        } else if (this.state.userData.error) {
            return <LoginPage 
                        error={ this.state.userData.error} 
                        setUserData={ this.setUser }
                    />

        } else {
            return <Home 
                        user={ this.state.userData }
                    />
        }
    }
}
