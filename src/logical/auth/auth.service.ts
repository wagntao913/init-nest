import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../users/users.service';
import { encryptPassword } from 'src/utils/cryptogram';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  async validateUser(username: string, password: string): Promise<any> {
    const user = await this.usersService.isExist(username);
    if (user) {
      const hashedPassword = user.password;
      const salt = user.password_salt;
      const hashPassword = encryptPassword(password, salt);
      if (hashedPassword === hashPassword) {
        // 密码正确
        return {
          code: 1,
          user,
        };
      } else {
        // 密码错误
        return {
          code: 2,
          user: null,
        };
      }
    }
    // 查无此人
    return {
      code: 3,
      user: null,
    };
  }

  async certificate(user: {
    user_name: any;
    user_id: any;
    real_name: any;
    role: any;
  }): Promise<any> {
    console.log(user);
    const payload = {
      username: user.user_name,
      sub: user.user_id,
      realName: user.real_name,
      role: user.role,
    };
    // console.log('JWT验证 - Step 3: 处理 jwt 签证', `payload: ${JSON.stringify(payload)}`);
    try {
      const token = this.jwtService.sign(payload);
      return {
        code: 200,
        data: {
          token,
          id: user.user_id,
        },
        msg: `登录成功`,
      };
    } catch (error) {
      return {
        code: 601,
        msg: `账号或密码错误`,
      };
    }
  }
}
