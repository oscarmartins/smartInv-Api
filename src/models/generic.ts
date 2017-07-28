import Knex = require('knex');
import * as moment from 'moment';

export class GenericModel {
  all(knex: Knex) {
    return knex('generics as g')
      .select('g.generic_id', 'g.generic_name', 'g.generic_type_id', 'gt.generic_type_name', 'g.unit_id', 'u.unit_name')
      .leftJoin('generic_types as gt', 'gt.generic_type_id', 'g.generic_type_id')
      .leftJoin('units as u', 'u.unit_id', 'g.unit_id')
      .orderBy('g.generic_name');
  }

  save(knex: Knex, datas: any) {
    return knex('generics')
      .insert(datas);
  }

  update(knex: Knex, genericId: any, datas: any) {
    return knex('generics')
      .where('generic_id', genericId)
      .update(datas);
  }

  detail(knex: Knex, genericId: any) {
    return knex('generics')
      .where('generic_id', genericId);
  }

  remove(knex: Knex, genericId: any) {
    return knex('generics')
      .where('generic_id', genericId)
      .del();
  }

}