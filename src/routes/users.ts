import { Router } from "express";
import controllerUser from '../controller/users';


const router = Router();



router.get('/users', controllerUser.getUsers);
router.get('/user/:id', controllerUser.getUserByID);
router.post('/user', controllerUser.createUser);
router.put('/user/:id', controllerUser.updateUser);
router.delete('/user/:id', controllerUser.deleteUser);

router.patch('/user/:id', controllerUser.patchUser);
router.get('/usersFilter', controllerUser.filterUsers);
router.get('/users/:id/posts', controllerUser.listingNested);



export default router;
