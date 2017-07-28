import Knex = require('knex');
import * as moment from 'moment';

export class DepartmentModel {
  all(knex: Knex) {
    return knex('departments')
      .orderBy('department_name');
  }

  save(knex: Knex, datas: any) {
    return knex('departments')
      .insert(datas);
  }

  update(knex: Knex, departmentId: any, datas: any) {
    return knex('departments')
      .where('department_id', departmentId)
      .update(datas);
  }

  detail(knex: Knex, departmentId: any) {
    return knex('departments')
      .where('department_id', departmentId);
  }

  remove(knex: Knex, departmentId: any) {
    return knex('departments')
      .where('department_id', departmentId)
      .del();
  }

}