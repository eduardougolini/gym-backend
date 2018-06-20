import { Router } from '../common/router'
import * as restify from 'restify'

class UsersRouter extends Router {
    applyRoutes(application: restify.Server) {
        application.post('/login', (req, resp, next) => {
            resp.json({authorized: 'true'});

            return next();
        });
    }
}

export const usersRouter = new UsersRouter();