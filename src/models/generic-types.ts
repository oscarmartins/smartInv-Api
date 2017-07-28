import Knex = require('knex');
import * as moment from 'moment';

export class GenericTypeModel {
  all(knex: Knex) {
    return knex('generic_types')
      .orderBy('generic_type_name');
  }

  save(knex: Knex, datas: any) {
    return knex('generic_types')
      .insert(datas);
  }

  update(knex: Knex, genericTypeId: any, datas: any) {
    return knex('generic_types')
      .where('generic_type_id', genericTypeId)
      .update(datas);
  }

  detail(knex: Knex, genericTypeId: any) {
    return knex('generic_types')
      .where('generic_type_id', genericTypeId);
  }

  remove(knex: Knex, genericTypeId: any) {
    return knex('generic_types')
      .where('generic_type_id', genericTypeId)
      .del();
  }

}