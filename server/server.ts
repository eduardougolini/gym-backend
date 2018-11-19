import * as restify from 'restify';
import { environment } from '../common/environment'
import { Router } from '../common/router'
import * as mongoose from 'mongoose'

export class Server {
    
    public application: restify.Server;

    initializeDb(): mongoose.MongooseThenable {
        (<any>mongoose).Promise = global.Promise;
        return mongoose.connect(environment.db.url, {
            useMongoClient: true
        });
    }

    initRoutes(routers: Router[]): Promise<any> {
        return new Promise((resolve, reject) => {
            try {
                this.application = restify.createServer({
                    name: 'gym-backend',
                    version: '1.0.0'
                });
                
                this.application.use(restify.plugins.queryParser());
                this.application.use(restify.plugins.bodyParser());
                // function unknownMethodHandler(req, res) {
                //     if (req.method.toLowerCase() === 'options') {
                //         console.log('received an options method request');
                //       var allowHeaders = ['Accept', 'Accept-Version', 'Content-Type', 'Api-Version', 'Origin', 'X-Requested-With']; // added Origin & X-Requested-With
                  
                //       if (res.methods.indexOf('OPTIONS') === -1) res.methods.push('OPTIONS');
                  
                //       res.header('Access-Control-Allow-Credentials', true);
                //       res.header('Access-Control-Allow-Headers', allowHeaders.join(', '));
                //       res.header('Access-Control-Allow-Methods', res.methods.join(', '));
                //       res.header('Access-Control-Allow-Origin', req.headers.origin);
                  
                //       return res.send(204);
                //     }
                //     else
                //       return res.send(405);
                //   }
                  
                //   this.application.on('MethodNotAllowed', unknownMethodHandler);
                ////////////
                const corsMiddleware = require('restify-cors-middleware')
 
                const cors = corsMiddleware({
                preflightMaxAge: 5, //Optional
                origins: ['http://localhost:8080', 'http://192.168.5.111:8080'],
                allowHeaders: ['API-Token'],
                exposeHeaders: ['API-Token-Expiry']
                })
                
                this.application.pre(cors.preflight)
                this.application.use(cors.actual)

                //routes
                for (let router of routers) {
                    router.applyRoutes(this.application);
                }
                

                this.application.listen(environment.server.port, () => {
                    resolve(this.application);
                });
            } catch (error) {
                reject(error);
            }
        });
    }

    bootstrap(routers: Router[] = []): Promise<Server> {
        return this.initializeDb().then(() => 
            this.initRoutes(routers).then(() => this)
        );
    }

}