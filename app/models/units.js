"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class UnitModel {
    all(knex) {
        return knex('units')
            .orderBy('unit_name');
    }
    save(knex, datas) {
        return knex('units')
            .insert(datas);
    }
    update(knex, unitId, datas) {
        return knex('units')
            .where('unit_id', unitId)
            .update(datas);
    }
    detail(knex, unitId) {
        return knex('units')
            .where('unit_id', unitId);
    }
    remove(knex, unitId) {
        return knex('units')
            .where('unit_id', unitId)
            .del();
    }
}
exports.UnitModel = UnitModel;
//# sourceMappingURL=units.js.map