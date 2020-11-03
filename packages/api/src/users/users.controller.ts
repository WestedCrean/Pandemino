import { Controller, Get, Delete, Put, Body, UseGuards, Param, Query } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { UsersService } from './users.service';
import { User } from './users.entity'

@Controller('users')
@UseGuards(AuthGuard('firebase'))
export class UsersController {
  constructor(
    private readonly usersService: UsersService,
  ) {}

  @Put()
  async updateUser(@Body() updateUser: { id: number, firstName: string, lastName: string }): Promise<User> {
    return this.usersService.update(updateUser)
  }


  @Get()
  findAll(): Promise<User[]> {
    return this.usersService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string): Promise<User> {
    return this.usersService.findOne(id);
  }

  @Get('/single')
  findOneByEmail(@Query('email') email: string): Promise<User> {
    return this.usersService.findOneByEmail(email);
  }

  @Delete(':id')
  remove(@Param('id') id: string): Promise<void> {
    return this.usersService.remove(id)
  }

}
