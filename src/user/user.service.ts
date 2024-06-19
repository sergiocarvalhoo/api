import { Inject, Injectable, NotFoundException, Scope } from '@nestjs/common';
import { UserModel } from './user.model';
import { UserSchema } from './user.schema';
import { hashSync as bcryptHashSync } from 'bcrypt';
import { TENANT_CONNECTION } from 'src/tenant/tenant.module';

@Injectable({ scope: Scope.REQUEST })
export class UserService {
  constructor(@Inject(TENANT_CONNECTION) private connection) {}
  userRepository = this.connection.getRepository(UserModel);

  // CREATE
  async create(user: UserSchema): Promise<UserModel> {
    const newUser: UserSchema = {
      name: user.name,
      email: user.email,
      password: bcryptHashSync(user.password, 10),
    };

    return await this.userRepository.save(newUser);
  }

  // READ ONE
  async findOne(id: number): Promise<UserModel> {
    const user = await this.userRepository.findOne({ where: { id } });

    if (!user) {
      throw new NotFoundException();
    }

    return user;
  }

  // READ ONE BY EMAIL
  async findByEmail(email: string): Promise<UserModel | null> {
    const userFound = await this.userRepository.findOne({
      where: { email },
    });

    if (!userFound) {
      return null;
    }

    return userFound;
  }

  // READ ALL
  async findAll(): Promise<UserModel[]> {
    return await this.userRepository.find();
  }

  // UPDATE
  async update(id: number, user: UserSchema): Promise<UserModel> {
    const userFound = await this.userRepository.findOne({ where: { id } });

    if (!userFound) {
      throw new NotFoundException();
    }

    await this.userRepository.update({ id }, user);

    return await this.userRepository.findOne({ where: { id } });
  }

  // DELETE
  async delete(id: number): Promise<string> {
    const user = await this.userRepository.findOne({ where: { id } });

    if (!user) {
      throw new NotFoundException();
    }

    await this.userRepository.delete({ id });

    return 'User deleted successfully';
  }
}
