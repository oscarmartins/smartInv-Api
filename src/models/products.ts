import Knex = require('knex');
import * as moment from 'moment';

export class ProductModel {
  all(knex: Knex, warehouseId: any) {
    let queryQty = knex('lots as l')
      .sum('l.qty')
      .as('qty')
      .whereRaw('l.product_id=p.product_id')
      .groupBy('l.product_id');

    return knex('products as p')
      .select('p.product_id', 'p.product_name', 'u.unit_name',
      'p.supplier_id', 'g.generic_id', 'gt.generic_type_name',
      'g.generic_name', 's.supplier_name', queryQty)
      .leftJoin('suppliers as s', 's.supplier_id', 'p.supplier_id')
      .leftJoin('generics as g', 'g.generic_id', 'p.generic_id')
      .leftJoin('units as u', 'u.unit_id', 'g.unit_id')
      .leftJoin('generic_types as gt', 'gt.generic_type_id', 'g.generic_type_id')
      .where('warehouse_id', warehouseId)
      .orderBy('p.product_name');
  }
  
  allByGeneric(knex: Knex, warehouseId: any) {
    return knex('products as p')
      .select('u.unit_name', 'g.generic_id', 'gt.generic_type_name', 'g.generic_name')
      .leftJoin('generics as g', 'g.generic_id', 'p.generic_id')
      .leftJoin('units as u', 'u.unit_id', 'g.unit_id')
      .leftJoin('generic_types as gt', 'gt.generic_type_id', 'g.generic_type_id')
      .where('warehouse_id', warehouseId)
      .groupBy('p.generic_id')
      .orderBy('g.generic_name');
  }

  searchByGeneric(knex: Knex, warehouseId: any, query: any) {
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

  search(knex: Knex, warehouseId: any, query: any) {
    const _query = `%${query}%`;

    return knex('products as p')
      .select('p.product_id', 'p.product_name', 'u.unit_name',
      'p.supplier_id', 'g.generic_id', 'gt.generic_type_name',
      'g.generic_name', 's.supplier_name')
      .leftJoin('suppliers as s', 's.supplier_id', 'p.supplier_id')
      .leftJoin('generics as g', 'g.generic_id', 'p.generic_id')
      .leftJoin('units as u', 'u.unit_id', 'g.unit_id')
      .leftJoin('generic_types as gt', 'gt.generic_type_id', 'g.generic_type_id')
      .where('warehouse_id', warehouseId)
      .where('p.product_name', 'like', _query)
      .orderBy('p.product_name')
      .limit(50);
  }

  save(knex: Knex, datas: any) {
    return knex('products')
      .insert(datas);
  }

  update(knex: Knex, productId: any, datas: any) {
    return knex('products')
      .where('product_id', productId)
      .update(datas);
  }

  detail(knex: Knex, productId: any) {
    return knex('products')
      .where('product_id', productId);
  }

  remove(knex: Knex, productId: any) {
    return knex('products')
      .where('product_id', productId)
      .del();
  }

}