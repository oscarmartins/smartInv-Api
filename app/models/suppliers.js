"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class SuppliersModel {
    all(knex) {
        return knex('suppliers')
            .orderBy('supplier_name');
    }
    save(knex, datas) {
        return knex('suppliers')
            .insert(datas);
    }
    update(knex, supplierId, datas) {
        return knex('suppliers')
            .where('supplier_id', supplierId)
            .update(datas);
    }
    detail(knex, supplierId) {
        return knex('suppliers')
            .where('supplier_id', supplierId);
    }
    remove(knex, supplierId) {
        return knex('suppliers')
            .where('supplier_id', supplierId)
            .del();
    }
}
exports.SuppliersModel = SuppliersModel;
//# sourceMappingURL=suppliers.js.map