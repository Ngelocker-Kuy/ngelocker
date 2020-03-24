import openSocket from 'socket.io-client';

const socket = openSocket('http://192.168.1.15:3000');

export default socket