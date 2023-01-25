import { Server, WebSocketServer } from 'ws';
import { Server as HTTPServer } from 'http';

class WebSocket {
    websocketServer: Server | undefined;

    public createServer (httpServer: HTTPServer) {
        this.websocketServer = new WebSocketServer({
            server: httpServer,
            path: '/chat',
        });
        this.listen();
        return this.websocketServer;
    }

    private listen () {
        this.websocketServer?.on('listening', () => console.log('WebSocket listening'));
        this.websocketServer?.on('connection', (socket) => {
            socket.send(JSON.stringify({
                user: 'Server',
                text: 'Welcome to chat!',
            }));
            socket.on('message', (data) => {
                this.websocketServer?.clients.forEach((client) => {
                    if (client !== socket && client.readyState === 1) {
                        client.send(data.toString());
                    }
                });
            });
        });
    }
}

export default new WebSocket();
