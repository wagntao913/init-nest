import { Injectable } from '@nestjs/common';
// import { Sequelize } from 'sequelize/types';
import * as Sequelize from 'sequelize';
import sequlize from 'src/database/sequelize';
import { UserCreatDto } from './user.dto';

@Injectable()
export class UsersService {
  async creatUser(creatUserDto: UserCreatDto): Promise<any> {
    // return creatUserDto;
    const sql = `
    INSERT INTO
      user_info(user_name,sex,birthday)
    VALUES
      ('${creatUserDto.username}','${creatUserDto.sex}','${creatUserDto.birthday}')`;

    try {
      const res = await sequlize.query(sql, {
        type: Sequelize.QueryTypes.INSERT,
        raw: true,
      });

      if (res) {
        return {
          code: 200,
          data: res,
          msg: 'SUCCESS',
        };
      }
    } catch (error) {
      return {
        code: 503,
        msg: `Service error: ${error}`,
      };
    }
  }

  async getUserList(): Promise<any> {
    const sql = 'SELECT * FROM user_info';
    try {
      const res = await sequlize.query(sql, {
        type: Sequelize.QueryTypes.SELECT,
        raw: true,
      });
      const user = res;
      if (user) {
        return {
          code: 200,
          data: {
            user,
          },
          msg: 'Success',
        };
      }
    } catch (error) {
      return {
        code: 503,
        msg: `Service error: ${error}`,
      };
    }
  }

  async updateUser(id: string, updateUserDto: UserCreatDto): Promise<any> {
    const sql = `
    UPDATE
      user_info 
    SET 
      user_name='${updateUserDto.username}',sex='${updateUserDto.sex}',birthday='${updateUserDto.birthday}',address='${updateUserDto.address}'
    WHERE
      id='${id}'`;

    try {
      const res = await sequlize.query(sql, {
        type: Sequelize.QueryTypes.UPDATE,
      });

      if (res) {
        return {
          code: 200,
          data: {
            res,
          },
          msg: 'SUCCESS',
        };
      }
    } catch (error) {
      return {
        code: 503,
        msg: `Service error: ${error}`,
      };
    }
  }

  async deleteUser(id: string): Promise<any> {
    const sql = `DELETE FROM user_info WHERE id=${id}`;
    try {
      const res = await sequlize.query(sql, {
        type: Sequelize.QueryTypes.DELETE,
      });
      return {
        code: 200,
        data: {
          res,
        },
        msg: 'SUCCESS',
      };
    } catch (error) {
      return {
        code: 503,
        msg: `Service error: ${error}`,
      };
    }
  }
}
