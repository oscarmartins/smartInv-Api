"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class ProductModel {
    all(knex, warehouseId) {
        let queryQty = knex('lots as l')
            .sum('l.qty')
            .as('qty')
            .whereRaw('l.product_id=p.product_id')
            .groupBy('l.product_id');
        return knex('products as p')
            .select('p.product_id', 'p.product_name', 'u.unit_name', 'p.supplier_id', 'g.generic_id', 'gt.generic_type_name', 'g.generic_name', 's.supplier_name', queryQty)
            .leftJoin('suppliers as s', 's.supplier_id', 'p.supplier_id')
            .leftJoin('generics as g', 'g.generic_id', 'p.generic_id')
            .leftJoin('units as u', 'u.unit_id', 'g.unit_id')
            .leftJoin('generic_types as gt', 'gt.generic_type_id', 'g.generic_type_id')
            .where('warehouse_id', warehouseId)
            .orderBy('p.product_name');
    }
    allByGeneric(knex, warehouseId) {
        return knex('products as p')
            .select('u.unit_name', 'g.generic_id', 'gt.generic_type_name', 'g.generic_name')
            .leftJoin('generics as g', 'g.generic_id', 'p.generic_id')
            .leftJoin('units as u', 'u.unit_id', 'g.unit_id')
            .leftJoin('generic_types as gt', 'gt.generic_type_id', 'g.generic_type_id')
            .where('warehouse_id', warehouseId)
            .groupBy('p.generic_id')
            .orderBy('g.generic_name');
    }
    searchByGeneric(knex, warehouseId, query) {
        const _query = `%${query}%`;
        return knex('products as p')
            .select('u.unit_name', 'g.generic_id', 'gt.generic_type_name', 'g.generic_name')
            .leftJoin('generics as g', 'g.generic_id', 'p.generic_id')
            .leftJoin('units as u', 'u.unit_id', 'g.unit_id')
            .leftJoin('generic_types as gt', 'gt.generic_type_id', 'g.generic_type_id')
            .where('warehouse_id', warehouseId)
            .where('g.generic_name', 'like', _query)
            .orderBy('g.generic_name')
            .groupBy('g.generic_id')
            .limit(50);
    }
    search(knex, warehouseId, query) {
        const _query = `%${query}%`;
        return knex('products as p')
            .select('p.product_id', 'p.product_name', 'u.unit_name', 'p.supplier_id', 'g.generic_id', 'gt.generic_type_name', 'g.generic_name', 's.supplier_name')
            .leftJoin('suppliers as s', 's.supplier_id', 'p.supplier_id')
            .leftJoin('generics as g', 'g.generic_id', 'p.generic_id')
            .leftJoin('units as u', 'u.unit_id', 'g.unit_id')
            .leftJoin('generic_types as gt', 'gt.generic_type_id', 'g.generic_type_id')
            .where('warehouse_id', warehouseId)
            .where('p.product_name', 'like', _query)
            .orderBy('p.product_name')
            .limit(50);
    }
    save(knex, datas) {
        return knex('products')
            .insert(datas);
    }
    update(knex, productId, datas) {
        return knex('products')
            .where('product_id', productId)
            .update(datas);
    }
    detail(knex, productId) {
        return knex('products')
            .where('product_id', productId);
    }
    remove(knex, productId) {
        return knex('products')
            .where('product_id', productId)
            .del();
    }
}
exports.ProductModel = ProductModel;
//# sourceMappingURL=products.js.map