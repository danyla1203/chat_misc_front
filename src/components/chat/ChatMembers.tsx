import { User } from "./CurrentChat";
import React from "react"

type UsersList = {
    users: User[]
}
export function ChatMembers(props: UsersList) {
    let users = props.users.map((user) => {
        return (
            <div className="user_small">
                <img src={ user.avatar_url } alt=""/>
                <h4>{ user.name }</h4>
            </div>
        )
    })

    return (
        <div>
            { users }
        </div>
    )
}