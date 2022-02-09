import { Router  } from 'https://deno.land/x/oak/mod.ts'
import indexController from './controllers/indexController.ts'
import { GetUser, GetUsers, PostUser, UpdateUser, DeleteUser } from './controllers/userController.ts'

const router = new Router()
router.get('/', indexController.main)
    .get('/api/user', GetUsers)
    .get('/api/user/:id', GetUser)
    .post('/api/user', PostUser)
    .patch('/api/user/:id', UpdateUser)
    .delete('/api/user/:id',  DeleteUser)

export default router