import { User } from '../entities/user.entity';

export class UserDto {
  id: string;
  email: string;
  roles: {
    id: string;
    name: string;
  }[];

  constructor(user: User) {
    this.id = user.id;
    this.email = user.email;
    this.roles =
      user.roles?.map((role) => ({
        id: role.id,
        name: role.name,
      })) || [];
  }
}
