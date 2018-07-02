import { Router } from '../common/router'
import * as restify from 'restify'
import { User } from '../users/users.model'

class AuthenticationRouter extends Router {

    constructor() {
        super();
        this.on('beforeRender', document => {
            document.password = undefined;
        });
    }

    applyRoutes(application: restify.Server) {
        application.post('/login', (req, resp, next) => {
            let email = req.body.email;
            let password = req.body.password;
            
            User.findOne({
                email,
                password
            }).exec((err, user) => {
                if (user) {
                    resp.json(user);
                } else {
                    resp.send(403);
                }

                return next();
            });
        });

        application.post('/register', (req, resp, next) => {
            req.body.daysWithoutTraining = '0';
            let user = new User(req.body);
            user.save().then(this.render(resp, next));
        });
    }
}

export const authenticationRouter = new AuthenticationRouter();