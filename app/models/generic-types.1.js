"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class GenericTypeModel {
    all(knex) {
        return knex('generic_types')
            .orderBy('generic_type_name');
    }
    save(knex, datas) {
        return knex('generic_types')
            .insert(datas);
    }
    update(knex, genericTypeId, datas) {
        return knex('generic_types')
            .where('generic_type_id', genericTypeId)
            .update(datas);
    }
    detail(knex, genericTypeId) {
        return knex('generic_types')
            .where('generic_type_id', genericTypeId);
    }
    remove(knex, genericTypeId) {
        return knex('generic_types')
            .where('generic_type_id', genericTypeId)
            .del();
    }
}
exports.GenericTypeModel = GenericTypeModel;
//# sourceMappingURL=generic-types.1.js.map