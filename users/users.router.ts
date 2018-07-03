import { Router } from '../common/router'
import * as restify from 'restify'
import { UserMeal } from './userMeals.model';
import { UserExercise } from './userExercises.model';

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
                if (userMeal) {
                    resp.json(userMeal);
                } else {
                    resp.send(404);
                }

                return next();
            });
        });

        application.get('/getExercises', (req, resp, next) => {
            let filterData = req.query;
            UserExercise.find({
                ...filterData
            }).exec((err, userExercises) => {
                if (userExercises) {
                    resp.json(userExercises);
                } else {
                    resp.send(404);
                }

                return next();
            });
        });
    }
}

export const usersRouter = new UsersRouter();