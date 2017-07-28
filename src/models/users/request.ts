import Knex = require('knex');
import * as moment from 'moment';

export class RequestModel {

  saveSummary(knex: Knex, datas: any) {
    return knex('request')
      .insert(datas, 'request_id');
  }

  saveDetail(knex: Knex, datas: any) {
    return knex('request_detail')
      .insert(datas);
  }

  // removeRequestDetail(knex: Knex, requestId: any) {
  //   return knex('request_detail')
  //     .where('request_id', requestId)
  //     .del();
  // }

  removeRequest(knex: Knex, requestId: any, userId: any, deletedTime: any) {
    return knex('request')
      .where('request_id', requestId)
      .update({
        is_deleted: 'Y',
        deleted_by_user_id: userId,
        deleted_time: deletedTime
      });
  }
  
  getRequest(knex: Knex, departmentId: any) {
    let queryTotal = knex('request_detail as rd')
      .count('*')
      .whereRaw('rd.request_id=r.request_id')
      .groupBy('rd.request_id')
      .limit(1)
      .as('total_products')

    return knex('request as r')
      .select('r.*', 'w.warehouse_name', 'u.fullname as user_fullname', queryTotal)
      .leftJoin('warehouses as w', 'w.warehouse_id', 'r.warehouse_id')
      .leftJoin('users as u', 'u.id', 'r.user_id')
      .where('r.department_id', departmentId)
      .where('r.is_deleted', '<>', 'Y')
      .orderBy('r.request_id', 'DESC');
  }
}