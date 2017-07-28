import Knex = require('knex');
import * as moment from 'moment';

export class UnitModel {
  all(knex: Knex) {
    return knex('units')
      .orderBy('unit_name');
  }

  save(knex: Knex, datas: any) {
    return knex('units')
      .insert(datas);
  }

  update(knex: Knex, unitId: any, datas: any) {
    return knex('units')
      .where('unit_id', unitId)
      .update(datas);
  }

  detail(knex: Knex, unitId: any) {
    return knex('units')
      .where('unit_id', unitId);
  }

  remove(knex: Knex, unitId: any) {
    return knex('units')
      .where('unit_id', unitId)
      .del();
  }

}