import io from 'socket.io-client'
export const SOCKET = io('http://192.168.0.152:5000/', {
    // autoConnect: false,
    // reconnectionDelay: 1000,
    // reconnection: true,
    // transports: ['websocket'],
    // jsonp: false,
    // agent: false,
    // rejectUnauthorized: false,
    // timeout: 20000,
});