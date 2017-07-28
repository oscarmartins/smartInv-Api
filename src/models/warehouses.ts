import Knex = require('knex');
import * as moment from 'moment';

export class WarehouseModel {
  all(knex: Knex) {
    return knex('warehouses')
      .orderBy('warehouse_name');
  }

  save(knex: Knex, datas: any) {
    return knex('warehouses')
      .insert(datas);
  }

  update(knex: Knex, unitId: any, datas: any) {
    return knex('warehouses')
      .where('unit_id', unitId)
      .update(datas);
  }

  detail(knex: Knex, unitId: any) {
    return knex('warehouses')
      .where('unit_id', unitId);
  }

  remove(knex: Knex, unitId: any) {
    return knex('warehouses')
      .where('unit_id', unitId)
      .del();
  }

}