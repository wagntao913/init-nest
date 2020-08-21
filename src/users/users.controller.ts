import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { UserCreatDto } from './user.dto';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { UsersService } from './users.service';

@Controller('users')
@ApiTags('用户')
export class UsersController {
  constructor(private readonly UsersService: UsersService) {}

  @Get('')
  async getUserList(): Promise<any> {
    return this.UsersService.getUserList();
    // return { success: true };
  }

  @Post()
  creatUser(@Body() creatUserDto: UserCreatDto): any {
    return this.UsersService.creatUser(creatUserDto);
  }

  @Put(':id')
  updateUser(
    @Param('id') id: string,
    @Body() updateUserDto: UserCreatDto,
  ): any {
    return this.UsersService.updateUser(id, updateUserDto);
  }

  @Delete(':id')
  deleteUser(@Param('id') id: string): any {
    return this.UsersService.deleteUser(id);
  }
}
