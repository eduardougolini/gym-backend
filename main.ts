import { Server } from './server/server';
import { usersRouter } from './authentication/authentication.router';

const server = new Server();
server.bootstrap([
    usersRouter
]).then(server => {
    console.log('Server: ', server.application.address());
}).catch(err => {
    console.log('Falhou ao iniciar');
    console.error(err);
});