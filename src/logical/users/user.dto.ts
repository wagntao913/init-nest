import { ApiProperty } from '@nestjs/swagger';

export class UserCreatDto {
  @ApiProperty({ description: '用户名', example: 'beppo' })
  readonly accountName: string | number;

  @ApiProperty({ description: '姓名', example: '张无忌' })
  readonly realName: string;

  @ApiProperty({ description: '密码', example: '000000' })
  readonly password: string;

  @ApiProperty({ description: '二次密码', example: '000000' })
  readonly repassword: string;

  @ApiProperty({ description: '手机号', example: '15698875896' })
  readonly mobile: string;
}

export class loginDto {
  @ApiProperty({ description: '登录用户名', example: 'beppo' })
  readonly username: string;

  @ApiProperty({ description: '登录密码', example: '000000' })
  readonly password: string;
}
