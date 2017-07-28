import Knex = require('knex');
import * as moment from 'moment';

export class RequestModel {

  removeRequest(knex: Knex, requestId: any, userId: any, deletedTime: any) {
    return knex('request')
      .where('request_id', requestId)
      .update({
        is_deleted: 'Y',
        deleted_by_user_id: userId,
        deleted_time: deletedTime
      });
  }
  
  getRequest(knex: Knex, warehouseId: any) {
    let queryTotal = knex('request_detail as rd')
      .count('*')
      .whereRaw('rd.request_id=r.request_id')
      .groupBy('rd.request_id')
      .limit(1)
      .as('total_products')

    return knex('request as r')
      .select('r.*', 'd.department_name', 'u.fullname as user_fullname', queryTotal)
      .leftJoin('users as u', 'u.id', 'r.user_id')
      .leftJoin('departments as d', 'd.department_id', 'r.department_id')
      .where('r.warehouse_id', warehouseId)
      .where('r.is_deleted', '<>', 'Y')
      .orderBy('r.request_id', 'DESC');
  }
}