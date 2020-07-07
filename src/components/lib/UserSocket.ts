import { IMessageEvent } from "websocket"

interface Get {
    action: string
    cookies?: any[]
}

interface Message extends IMessageEvent {
    action?: string;
}

interface Queue {
    data: Get,
    callback: (result: any) => void;
}

export class UserSocket extends WebSocket {
    private queue: Queue[] = [];

    onmessage = this.delegateMessage;

    private delegateMessage(message: any) {
        let messageData = JSON.parse(message.data);
        let action = messageData.action;
        for (let i = 0; i < this.queue.length; i++) {
            let queueItem = this.queue[i];
            if (queueItem.data.action === action) {
                queueItem.callback(messageData);
            }
        }
    }

    private getCookieObject (cookies: string): any {
        let splitedCookies = cookies.split("; ");
        let cookiesObj: any = {};

        for (let i = 0; i < splitedCookies.length; i++) {
            let [ cookieName, value ] = splitedCookies[i].split("=");
            cookiesObj[cookieName] = value;
        }
        return cookiesObj;
    }

    message(data: Get) {
        let cookies = this.getCookieObject(document.cookie);
        data.cookies = cookies;
        this.send(JSON.stringify(data));
    }

    get(data: Get, callback: (result: any) => void) {
        let queueItem = {
            data: data,
            callback: callback
        }
        this.queue.push(queueItem);
        this.message(data);
    }

}   