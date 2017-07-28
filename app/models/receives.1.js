"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class ReceiveModel {
    getWarehouse(knex) {
        return knex('warehouses')
            .orderBy('warehouse_name');
    }
    getProductList(knex, warehouseId) {
        return knex('products as p')
            .select('p.product_id', 'p.product_name', 'g.generic_name', 'u.unit_name')
            .innerJoin('generics as g', 'g.generic_id', 'p.generic_id')
            .innerJoin('units as u', 'u.unit_id', 'g.unit_id');
    }
}
exports.ReceiveModel = ReceiveModel;
//# sourceMappingURL=receives.1.js.map