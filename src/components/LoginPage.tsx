import React from "react";
import "./LoginForm.css";
import { UserSocket } from "./lib/UserSocket";

type Props = {
    error?: string,
    setUserData: Function
    socket: UserSocket
}

export function LoginPage(props: Props) {
    let getUserByInputedData = () => {
        let form = document.querySelector<HTMLFormElement>("#loginForm")!;
        let inputedData = new FormData(form);
        inputedData = Object.assign({}, inputedData, {action: "login/data"});
        
        props.socket.get(inputedData, (result: any) => {
            props.setUserData(result);
        })
    } 

    let error = props.error ? props.error : "";
    return (
        <div id="login">
            <div id="errors">
                { error }
            </div>
            <form id="loginForm" method="POST">
                <div>
                    <span>Name: </span>
                    <input type="text" name="name"/>
                </div>
                <div>
                    <span>Password: </span>
                    <input type="text" name="password"/>
                </div>
                <button onClick={ getUserByInputedData } type="button">Sign in</button>
            </form>
        </div>
    )
}