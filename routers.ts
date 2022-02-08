import { Router  } from 'https://deno.land/x/oak/mod.ts'
import indexController from './controllers/indexController.ts'
import userController from './controllers/userController.ts'

const router = new Router()
router.get('/', indexController.main)
    .get('/api/user', userController.index)
    .get('/api/user/:id', userController.show)
    .post('/api/user', userController.store)
    .patch('/api/user/:id', userController.update)
    .delete('/api/user/:id', userController.destroy)

export default router