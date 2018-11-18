import { Router } from '../common/router'
import * as restify from 'restify'
import { UserMeal } from './userMeals.model';
import { UserExercise } from './userExercises.model';
import { User } from '../users/users.model'

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

        application.get('/getTmb', (req, resp, next) => {
            let userId = req.query['userId'];
            
            User.findById(
                userId
            ).exec((err, userData) => {
                if (userData) {
                    let tmb = parseInt((66 + (13.7 * userData.weight) + (5.0 * userData.height) - (6.8 * userData.age)) + 1000);
                    resp.json({
                        tmb
                    });
                } else {
                    resp.send(404);
                }

                return next();
            });
        })

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