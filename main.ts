import { Server } from './server/server';
import { authenticationRouter } from './authentication/authentication.router';
import { usersRouter } from './users/users.router';

const server = new Server();
server.bootstrap([
    usersRouter,
    authenticationRouter
]).then(server => {
    console.log('Server: ', server.application.address());
}).catch(err => {
    console.log('Falhou ao iniciar');
    console.error(err);
});