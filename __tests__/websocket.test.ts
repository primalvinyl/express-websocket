import request from 'superwstest';
import { server } from '../src/server';

describe('WebSocket Server', () => {
    beforeEach((done) => {
        server.listen(8080, done);
    });

    afterEach((done) => {
        server.close(done);
    });

    it('allows a client connection', async () => {
        await request(server).ws('/chat')
            .expectUpgrade((res) => res.headers.upgrade === 'websocket');
    });

    it('allows multiple client connections', async () => {
        await request(server).ws('/chat')
            .expectUpgrade((res) => res.headers.upgrade === 'websocket');

        await request(server).ws('/chat')
            .expectUpgrade((res) => res.headers.upgrade === 'websocket');

        await request(server).ws('/chat')
            .expectUpgrade((res) => res.headers.upgrade === 'websocket');
    });

    it('sends a welcome message to the client', async () => {
        await request(server).ws('/chat')
            .expectJson({ user: 'Server', text: 'Welcome to chat!' });
    });

    it('allows clients to send messages to each other', async () => {
        const client = await request(server).ws('/chat')
        client.on('message', (message) => {
            expect(JSON.parse(message.toString()))
                .toEqual({ user: 'Client', text: 'hello everyone' });
        });

        await request(server).ws('/chat')
            .sendJson({ user: 'Client', text: 'hello everyone' })
            .wait(1000);
    });
});
