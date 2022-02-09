import { Router  } from 'https://deno.land/x/oak/mod.ts'
import indexController from './controllers/indexController.ts'
import { GetUser, GetUsers, PostUser, UpdateUser, DeleteUser } from './controllers/userPostgresController.ts'
import { GetUserMongo, GetUsersMongo, PostUserMongo, UpdateUserMongo, DeleteUserMongo } from './controllers/userMongoController.ts';

const router = new Router()
router.get('/', indexController.main)
    .get('/api/user', GetUsers)
    .get('/api/user/:id', GetUser)
    .post('/api/user', PostUser)
    .patch('/api/user/:id', UpdateUser)
    .delete('/api/user/:id',  DeleteUser)
    .get('/api/mongo/user', GetUsersMongo)
    .get('/api/mongo/user/:id', GetUserMongo)
    .post('/api/mongo/user', PostUserMongo)
    .patch('/api/mongo/user/:id', UpdateUserMongo)
    .delete('/api/mongo/user/:id',  DeleteUserMongo)

export default router