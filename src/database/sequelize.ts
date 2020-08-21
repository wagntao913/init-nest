// import { Sequelize } from 'sequelize-typescript/dist/sequelize/sequelize/sequelize';
import { Sequelize } from 'sequelize';
import db from '../../config/db';

const sequlize = new Sequelize(
  db.mysql.database,
  db.mysql.user,
  db.mysql.password || null,
  {
    host: db.mysql.host,
    port: db.mysql.port,
    dialect: 'mysql',
    timezone: '+8:00',
    pool: {
      max: db.mysql.connectionLimit,
      min: 0,
      acquire: 30000,
      idle: 10000,
    },
  },
);

sequlize
  .authenticate()
  .then(() => {
    console.log('数据库连接成功');
  })
  .catch((err: any) => {
    console.log(err);
    throw err;
  });

export default sequlize;
