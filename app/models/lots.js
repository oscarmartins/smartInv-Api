"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class LotsModel {
    getProductLots(knex, productId) {
        return knex('lots as l')
            .select('l.product_id', 'l.qty', 'l.lot_id', 'l.lot_no', 'l.receive_date', 'l.cost', 'l.price')
            .where('l.product_id', productId);
    }
    saveLotDetail(knex, productId, lotNo, cost, price) {
        return knex('lots')
            .insert({
            product_id: productId,
            lot_no: lotNo,
            cost: +cost,
            price: +price
        });
    }
    updateLotDetail(knex, lotId, lotNo, cost, price) {
        return knex('lots')
            .update({
            lot_no: lotNo,
            cost: +cost,
            price: +price
        })
            .where('lot_id', lotId);
    }
}
exports.LotsModel = LotsModel;
//# sourceMappingURL=lots.js.map