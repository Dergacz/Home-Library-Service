import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
  Put,
  NotFoundException,
  BadRequestException,
  ForbiddenException,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdatePasswordDto } from './dto/update-password.dto';
import { UserResponseDto } from './dto/user-response.dto';
import { plainToInstance } from 'class-transformer';

@Controller('user')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  findAll(): UserResponseDto[] {
    const users = this.usersService.findAll();
    return users.map((user) =>
      plainToInstance(UserResponseDto, user, { excludeExtraneousValues: true }),
    );
  }

  @Get(':id')
  findOne(@Param('id') id: string): UserResponseDto {
    try {
      const user = this.usersService.findOne(id);
      return plainToInstance(UserResponseDto, user, {
        excludeExtraneousValues: true,
      });
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw new NotFoundException('User not found');
      }
      if (error instanceof BadRequestException) {
        throw new BadRequestException('Invalid user ID');
      }
      throw error;
    }
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  create(@Body() createUserDto: CreateUserDto): UserResponseDto {
    const user = this.usersService.create(createUserDto);
    return plainToInstance(UserResponseDto, user, {
      excludeExtraneousValues: true,
    });
  }

  @Put(':id')
  update(
    @Param('id') id: string,
    @Body() updatePasswordDto: UpdatePasswordDto,
  ): UserResponseDto {
    try {
      const user = this.usersService.update(id, updatePasswordDto);
      return plainToInstance(UserResponseDto, user, {
        excludeExtraneousValues: true,
      });
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw new NotFoundException('User not found');
      }
      if (error instanceof BadRequestException) {
        throw new BadRequestException('Invalid user ID or password data');
      }
      if (error instanceof ForbiddenException) {
        throw new ForbiddenException('Old password is incorrect');
      }
      throw error;
    }
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  remove(@Param('id') id: string): void {
    try {
      this.usersService.remove(id);
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw new NotFoundException('User not found');
      }
      if (error instanceof BadRequestException) {
        throw new BadRequestException('Invalid user ID');
      }
      throw error;
    }
  }
}
