import { ContainerTypes, ValidatedRequestSchema } from 'express-joi-validation';
import { Permission } from '../types/permission';

export interface GroupRequestSchema extends ValidatedRequestSchema {
    [ContainerTypes.Body]: {
        name: string,
        permissions: Array<Permission>
    }
}
