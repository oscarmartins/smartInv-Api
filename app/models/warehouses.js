"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class WarehouseModel {
    all(knex) {
        return knex('warehouses')
            .orderBy('warehouse_name');
    }
    save(knex, datas) {
        return knex('warehouses')
            .insert(datas);
    }
    update(knex, unitId, datas) {
        return knex('warehouses')
            .where('unit_id', unitId)
            .update(datas);
    }
    detail(knex, unitId) {
        return knex('warehouses')
            .where('unit_id', unitId);
    }
    remove(knex, unitId) {
        return knex('warehouses')
            .where('unit_id', unitId)
            .del();
    }
}
exports.WarehouseModel = WarehouseModel;
//# sourceMappingURL=warehouses.js.map