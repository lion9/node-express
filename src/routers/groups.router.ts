import express, { Router } from 'express';
import { createValidator, ExpressJoiInstance } from 'express-joi-validation';
import { createBodySchema, updateBodySchema } from '../joi-schemas/groups.schemas';
import GroupController from './controller/groups.controller';

const groupRouter: Router = express.Router();
const validator: ExpressJoiInstance = createValidator();


groupRouter.route('/').get(GroupController.getAllGroups);

groupRouter.route('/:id').get(GroupController.getGroupByID);

groupRouter.post('/', validator.body(createBodySchema), GroupController.insertNewGroup);

groupRouter.patch('/:id', validator.body(updateBodySchema), GroupController.updateExistingGroup);

groupRouter.delete('/:id', GroupController.deleteGroupByID);

export default groupRouter;
