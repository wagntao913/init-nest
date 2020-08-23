import { ApiProperty } from '@nestjs/swagger';

export class UserCreatDto {
  @ApiProperty({ description: '用户名', example: 'beppo' })
  accountName: string;

  @ApiProperty({ description: '姓名', example: '张无忌' })
  realName: string;

  @ApiProperty({ description: '密码', example: '000000' })
  password: string;

  @ApiProperty({ description: '二次密码', example: '000000' })
  repassword: string;

  @ApiProperty({ description: '手机号', example: '15698875896' })
  mobile: string;
}
