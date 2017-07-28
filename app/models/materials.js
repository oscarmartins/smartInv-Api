"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class MaterialModel {
    all(knex) {
        return knex('meterials as m')
            .select('m.product_id')
            .leftJoin('suppliers as s', 's.supplier_id', 'm.supplier_id')
            .leftJoin('generics as g', 'g.generic_id', 'm.generic_id')
            .orderBy('m.product_name');
    }
    save(knex, datas) {
        return knex('meterials')
            .insert(datas);
    }
    update(knex, productId, datas) {
        return knex('meterials')
            .where('product_id', productId)
            .update(datas);
    }
    detail(knex, productId) {
        return knex('meterials')
            .where('product_id', productId);
    }
    remove(knex, productId) {
        return knex('meterials')
            .where('product_id', productId)
            .del();
    }
}
exports.MaterialModel = MaterialModel;
//# sourceMappingURL=materials.js.map