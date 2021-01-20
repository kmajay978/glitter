import io from 'socket.io-client'

export const SOCKET = io('http://3.17.161.217:3001/', {
    // autoConnect: false,
    // reconnectionDelay: 1000,
    // reconnection: true,
    // transports: ['websocket'],
    // jsonp: false,
    // agent: false,
    // rejectUnauthorized: false,
    // timeout: 20000,
});