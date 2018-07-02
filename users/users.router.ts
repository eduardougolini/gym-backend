import { Router } from '../common/router'
import * as restify from 'restify'
import { UserMeal } from './userMeals.model';

class UsersRouter extends Router {
    applyRoutes(application: restify.Server) {
        application.post('/addMeal', (req, resp, next) => {
            let userMeal = new UserMeal(req.body);
            userMeal.save().then(this.render(resp, next));
        });

        application.get('/getMeals', (req, resp, next) => {
            let filterData = req.query;
            UserMeal.find({
                ...filterData
            }).exec((err, userMeal) => {
                console.log(userMeal)
                if (userMeal) {
                    resp.json(userMeal);
                } else {
                    resp.send(404);
                }

                return next();
            });
        });
    }
}

export const usersRouter = new UsersRouter();