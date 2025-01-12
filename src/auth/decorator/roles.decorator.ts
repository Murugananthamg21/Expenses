import { SetMetadata } from '@nestjs/common';
import { UserRoles } from '../dto/create-auth.dto';

export const ROLES_KEY = 'roles';
export const Roles = (...roles: UserRoles[]) => SetMetadata(ROLES_KEY, roles);
