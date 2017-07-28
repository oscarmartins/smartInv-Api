import Knex = require('knex');
import * as moment from 'moment';

export class LoginModel {
  adminLogin(knex: Knex, username: string, password: string) {
    return knex('admin')
      .select('id', 'fullname', 'warehouse_id')
      .where({
        username: username,
        password: password
      })
      .limit(1);
  }
    
  userLogin(knex: Knex, username: string, password: string) {
    return knex('users')
      .select('id', 'fullname', 'department_id')
      .where({
        username: username,
        password: password
      })
      .limit(1);
  }
}