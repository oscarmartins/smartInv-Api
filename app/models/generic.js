"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class GenericModel {
    all(knex) {
        return knex('generics as g')
            .select('g.generic_id', 'g.generic_name', 'g.generic_type_id', 'gt.generic_type_name', 'g.unit_id', 'u.unit_name')
            .leftJoin('generic_types as gt', 'gt.generic_type_id', 'g.generic_type_id')
            .leftJoin('units as u', 'u.unit_id', 'g.unit_id')
            .orderBy('g.generic_name');
    }
    save(knex, datas) {
        return knex('generics')
            .insert(datas);
    }
    update(knex, genericId, datas) {
        return knex('generics')
            .where('generic_id', genericId)
            .update(datas);
    }
    detail(knex, genericId) {
        return knex('generics')
            .where('generic_id', genericId);
    }
    remove(knex, genericId) {
        return knex('generics')
            .where('generic_id', genericId)
            .del();
    }
}
exports.GenericModel = GenericModel;
//# sourceMappingURL=generic.js.map