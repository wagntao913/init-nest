import { AuthService } from './../auth/auth.service';
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { ApiTags, ApiBody } from '@nestjs/swagger';
import { loginDto, UserCreatDto } from './user.dto';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { UsersService } from './users.service';
import { AuthGuard } from '@nestjs/passport';

@Controller('project/users')
@ApiTags('用户')
export class UsersController {
  constructor(
    private readonly UsersService: UsersService,
    private readonly AuthService: AuthService,
  ) {}

  @Get('getUserList')
  async getUserList(): Promise<any> {
    return this.UsersService.getUserList();
  }

  @UseGuards(AuthGuard('jwt'))
  @Post('register')
  register(@Body() creatUserDto: UserCreatDto): any {
    return this.UsersService.register(creatUserDto);
  }

  @Put('updateUser/:id')
  updateUser(
    @Param('id') id: string,
    @Body() updateUserDto: UserCreatDto,
  ): any {
    return this.UsersService.updateUser(id, updateUserDto);
  }

  @Delete('deleteUser/:id')
  deleteUser(@Param('id') id: string): any {
    return this.UsersService.deleteUser(id);
  }

  @ApiBody({ description: '用户登录', type: loginDto })
  @Post('login')
  async login(@Body() LoginParams: loginDto) {
    const authResult = await this.AuthService.validateUser(
      LoginParams.username,
      LoginParams.password,
    );
    switch (authResult.code) {
      case 1:
        return this.AuthService.certificate(authResult.user);
      case 2:
        return {
          code: 601,
          msg: `账号或密码不正确`,
        };
      default:
        return {
          code: 600,
          msg: `查无此人`,
        };
    }
  }
}
