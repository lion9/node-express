import express, { Router } from 'express';
import { createValidator, ExpressJoiInstance } from 'express-joi-validation';
import { createBodySchema, updateBodySchema } from '../joi-schemas/users.schemas';
import UserController from './controller/users.controller';
import { verifyJWT } from '../middleware/authJWT';


const userRouter: Router = express.Router();
const validator: ExpressJoiInstance = createValidator();


userRouter.route('/').get(verifyJWT, UserController.getUsers);

userRouter.route('/:id').get(verifyJWT, UserController.getUserByID);

userRouter.post('/', verifyJWT,  validator.body(createBodySchema), UserController.insertNewUser);

userRouter.post('/group/:id', verifyJWT,  UserController.addUserToGroup);

userRouter.post('/login', UserController.login);

userRouter.patch('/:id', verifyJWT,  validator.body(updateBodySchema), UserController.updateExistingUser);

userRouter.delete('/:id', verifyJWT,  UserController.deleteUserByID);

export default userRouter;
