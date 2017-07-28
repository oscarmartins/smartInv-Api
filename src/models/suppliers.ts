import Knex = require('knex');
import * as moment from 'moment';

export class SuppliersModel {
  all(knex: Knex) {
    return knex('suppliers')
      .orderBy('supplier_name');
  }

  save(knex: Knex, datas: any) {
    return knex('suppliers')
      .insert(datas);
  }

  update(knex: Knex, supplierId: any, datas: any) {
    return knex('suppliers')
      .where('supplier_id', supplierId)
      .update(datas);
  }

  detail(knex: Knex, supplierId: any) {
    return knex('suppliers')
      .where('supplier_id', supplierId);
  }

  remove(knex: Knex, supplierId: any) {
    return knex('suppliers')
      .where('supplier_id', supplierId)
      .del();
  }

}