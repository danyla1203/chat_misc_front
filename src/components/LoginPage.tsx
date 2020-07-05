import React from "react";

type Props = {
    error?: string,
    setUserData: Function
}

export function LoginPage(props: Props) {
    let getUserByInputedData = () => {
        let form = document.querySelector<HTMLFormElement>("#loginForm")!;
        let inputedData = new FormData(form);

        let xhr = new XMLHttpRequest();
        xhr.open("POST", "/data/user");
        xhr.send(inputedData);
        xhr.onload = () => {
            if (xhr.status === 200) {
                props.setUserData(JSON.parse(xhr.response));
            }
        }
    } 

    let error = props.error ? props.error : "";
    return (
        <div id="login">
            <div id="errors">
                { error }
            </div>
            <form id="loginForm" method="POST">
                <input type="text" name="name"/>
                <input type="text" name="password"/>
                <button onClick={ getUserByInputedData } type="button">Sign in</button>
            </form>
        </div>
    )
}