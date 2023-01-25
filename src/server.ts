import http from 'http';
import app from './app';
import webSocket from './websocket';

// initialize http server
export const server = http.createServer(app);

// initialize websocket server
export const websocket = webSocket.createServer(server);
