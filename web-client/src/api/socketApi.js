import io  from "socket.io-client";
import {webConstants} from "../utils/webConstants";
import {getUserId} from "./webApiController";
let socket;
const createSocket = async (userId)=>{
    socket = io.connect(webConstants.API.SOCKET_URL,{transports: ["websocket"],query:{userId} });
    socket.on("news",(msg)=>{
    })
    socket.on('message',function(data){
    });
    socket.emit("PING");
    socket.on('connect', () => {
        socket.emit("PING");
    });

    socket.on('disconnect', () => {
    });
    //
    // socket.on("QR_CODE",(msg)=>{
    //     console.log(msg);
    // })

}

export const initSocket = async ()=>{
    let userId = localStorage.getItem("userId");
    if(!userId){
        let {data:{data}} = await getUserId();
        userId = data;
        localStorage.setItem("userId",userId);
    }
    await createSocket(userId);
}

export const getSocket = ()=>{
    return socket;
}
