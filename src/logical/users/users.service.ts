import { Injectable } from '@nestjs/common';
// import { Sequelize } from 'sequelize/types';
import * as Sequelize from 'sequelize';
import sequlize from 'src/database/sequelize';
import { encryptPassword, makeSalt } from 'src/utils/cryptogram';
import { UserCreatDto } from './user.dto';

@Injectable()
export class UsersService {
  /**
   * @description 获取用户列表
   */
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

  /**
   * @description 修改用户
   * @param id 用户ID
   * @param updateUserDto 用户修改信息Dto
   */
  async updateUser(id: string, updateUserDto: UserCreatDto): Promise<any> {
    const sql = `
    UPDATE
      user_info 
    SET 
      user_name='${updateUserDto.accountName}',real_name='${updateUserDto.realName}',password='${updateUserDto.password}',mobile='${updateUserDto.mobile}'
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

  /**
   * @description 删除用户
   * @param id 用户id
   */
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

  /**
   * @description 校验用户是否已存在
   * @param username 用户名
   */
  async isExist(username: string): Promise<any> {
    const sql = ` SELECT * FROM user_info WHERE account_name='${username}'`;

    try {
      const res = await sequlize.query(sql, {
        type: Sequelize.QueryTypes.SELECT,
        raw: true,
      });

      const user = res[0];
      if (user) {
        return user;
      }
    } catch (error) {
      return void 0;
    }
  }

  /**
   *
   *
   * @param {{
   *     accountName: any;
   *     realName: any;
   *     password: any;
   *     repassword: any;
   *     mobile: any;
   *   }} requestBody
   * @returns {Promise<any>}
   * @memberof UsersService
   */
  async register(requestBody: {
    accountName: any;
    realName: any;
    password: any;
    repassword: any;
    mobile: any;
  }): Promise<any> {
    const { accountName, realName, password, repassword, mobile } = requestBody;
    if (password !== repassword) {
      return {
        code: 400,
        msg: '两次密码不一致',
      };
    }
    const user = await this.isExist(accountName);
    if (user) {
      return {
        code: 400,
        msg: '用户已存在',
      };
    }
    const salt = makeSalt();
    const hashPwd =encryptPassword(password, salt);
    console.log('== hashPwd ==',hashPwd)
    console.log('== salt ==',salt)
    const registerSql = `
      INSERT INTO 
        user_info(account_name, real_name, password, password_salt, mobile, user_status, role, create_by)
      VALUES
        ('${accountName}','${realName}','${hashPwd}','${salt}','${mobile}',1,3,0)
    `;
    try {
      await sequlize.query(registerSql, {
        type: Sequelize.QueryTypes.INSERT,
        raw: true,
      });
      return {
        code: 200,
        msg: 'SUCEESS',
      };
    } catch (error) {
      return {
        code: 503,
        msg: `Service error: ${error}`,
      };
    }
  }
}
