import {
  Injectable,
  NotFoundException,
  BadRequestException,
  ForbiddenException,
} from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';
import { User } from './entities/user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdatePasswordDto } from './dto/update-password.dto';

@Injectable()
export class UsersService {
  private users: User[] = [];

  findAll(): User[] {
    return this.users;
  }

  findOne(id: string): User {
    if (!this.isValidUUID(id)) {
      throw new BadRequestException('Invalid user ID');
    }

    const user = this.users.find((user) => user.id === id);
    if (!user) {
      throw new NotFoundException('User not found');
    }

    return user;
  }

  create(createUserDto: CreateUserDto): User {
    const now = Date.now();
    const newUser: User = {
      id: uuidv4(),
      login: createUserDto.login,
      password: createUserDto.password,
      version: 1,
      createdAt: now,
      updatedAt: now,
    };

    this.users.push(newUser);
    return newUser;
  }

  update(id: string, updatePasswordDto: UpdatePasswordDto): User {
    if (!this.isValidUUID(id)) {
      throw new BadRequestException('Invalid user ID');
    }

    const userIndex = this.users.findIndex((user) => user.id === id);
    if (userIndex === -1) {
      throw new NotFoundException('User not found');
    }

    const user = this.users[userIndex];
    if (user.password !== updatePasswordDto.oldPassword) {
      throw new ForbiddenException('Old password is incorrect');
    }

    const updatedUser: User = {
      ...user,
      password: updatePasswordDto.newPassword,
      version: user.version + 1,
      updatedAt: Date.now(),
    };

    this.users[userIndex] = updatedUser;
    return updatedUser;
  }

  remove(id: string): void {
    if (!this.isValidUUID(id)) {
      throw new BadRequestException('Invalid user ID');
    }

    const userIndex = this.users.findIndex((user) => user.id === id);
    if (userIndex === -1) {
      throw new NotFoundException('User not found');
    }

    this.users.splice(userIndex, 1);
  }

  private isValidUUID(id: string): boolean {
    const uuidRegex =
      /^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
    return uuidRegex.test(id);
  }
}
