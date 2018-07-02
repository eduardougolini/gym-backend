import { Router } from '../common/router'
import * as restify from 'restify'
import { UserMeal } from './userMeals.model';

class UsersRouter extends Router {
    applyRoutes(application: restify.Server) {
        application.post('/addMeal', (req, resp, next) => {
            let userMeal = new UserMeal(req.body);
            userMeal.save().then(this.render(resp, next));
        });
    }
}

export const usersRouter = new UsersRouter();