import Knex = require('knex');
import * as moment from 'moment';

export class LotsModel {
  getProductLots(knex: Knex, productId: any) {
    return knex('lots as l')
      .select('l.product_id', 'l.qty', 'l.lot_id', 'l.lot_no', 'l.receive_date', 'l.cost', 'l.price')
      .where('l.product_id', productId);
  }

  saveLotDetail(knex: Knex, productId: any, lotNo: any, cost: number, price: number) {
    return knex('lots')
      .insert({
        product_id: productId,
        lot_no: lotNo,
        cost: +cost,
        price: +price
      });
  }

  updateLotDetail(knex: Knex, lotId: any, lotNo: any, cost: number, price: number) {
    return knex('lots')
      .update({
        lot_no: lotNo,
        cost: +cost,
        price: +price
      })
      .where('lot_id', lotId)
  }
}