import { ApiProperty } from '@nestjs/swagger';

export class UserCreatDto {
  @ApiProperty({ description: '用户名', example: 'user', required: true })
  username: string;

  @ApiProperty({ description: '性别', example: 1 })
  sex: string;

  @ApiProperty({ description: '生日', example: '2010-02-18' })
  birthday: string;

  @ApiProperty({ description: '地址', example: '北京市海淀区' })
  address: string;
}
