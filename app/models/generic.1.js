"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class GenericModel {
    list(knex) {
        return knex('generics')
            .orderBy('generic_name');
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
//# sourceMappingURL=generic.1.js.map