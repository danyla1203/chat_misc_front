import { UserSocket } from "../src/components/lib/UserSocket";

describe("test UserSocket", () => {
    let socket: UserSocket

    beforeEach(() => {
        socket = new UserSocket("ws://localhost");
    })

    test("test getCookieObject", () => {
        let cookie = "name=Peter; password=dou";
        expect(socket["getCookieObject"](cookie)).toStrictEqual({ "name": "Peter", "password": "dou" });
        cookie = "id=12; name=Danila; password=pushka";
        expect(socket["getCookieObject"](cookie)).toStrictEqual({ "id": 12, "name": "Danila", "password": "pushka" });
        cookie = "test=dou23; test2=12";
        expect(socket["getCookieObject"](cookie)).toStrictEqual({ "test": "dou23", "test2": 12 });
    })

})

