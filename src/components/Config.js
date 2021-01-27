import io from 'socket.io-client'

export const SOCKET = io('localhost:3001', {
    // autoConnect: false,
    // reconnectionDelay: 1000,
    // reconnection: true,
    // transports: ['websocket'],
    // jsonp: false,
    // agent: false,
    // rejectUnauthorized: false,
    // timeout: 20000,
});