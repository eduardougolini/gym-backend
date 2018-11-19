import { Router } from '../common/router'
import * as restify from 'restify'
import { UserMeal } from './userMeals.model';
import { UserRoutine } from './userRoutines.model'
import { RoutineExercise } from './routineExercises.model';
import { User } from './users.model'

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
        });

        application.put('/updateUserInfo', (req, resp, next) => {
            let userId = req.body['userId'];
            let weight = req.body['weight'];
            let userImage = req.body['userImage'];
            console.log(weight)

            User.update({_id: userId}, {
                weight,
                userImage
            }).exec((err, userData) => {
                if (userData) {
                    return User.findById(userId)
                } else {
                    resp.send(404)
                }
            }).then(user => {
                resp.json(user)
                return next()
            });
        });

        application.post('/createRoutine', (req, resp, next) => {
            let userRoutine = new UserRoutine(req.body);
            userRoutine.save().then(this.render(resp, next));
        });

        application.get('/getUserRoutines', (req, resp, next) => {
            let filterData = req.query;
            
            UserRoutine.find({
                ...filterData
            }).exec((err, userRoutine) => {
                if (userRoutine) {
                    resp.json(userRoutine);
                } else {
                    resp.send(404);
                }

                return next();
            });
        });

        application.post('/addExerciseToRoutine', (req, resp, next) => {
            let routineExercise = new RoutineExercise(req.body);
            routineExercise.save().then(this.render(resp, next));
        });

        application.get('/getRoutineExercises', (req, resp, next) => {
            let filterData = req.query;
            
            RoutineExercise.find({
                ...filterData
            }).exec((err, userRoutine) => {
                if (userRoutine) {
                    resp.json(userRoutine);
                } else {
                    resp.send(404);
                }

                return next();
            });
        });

    }
}

export const usersRouter = new UsersRouter();