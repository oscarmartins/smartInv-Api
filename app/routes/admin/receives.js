"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const wrap = require("co-express");
const moment = require("moment");
const router = express.Router();
const receives_1 = require("../../models/receives");
const receiveModel = new receives_1.ReceiveModel();
router.get('/warehouses', wrap((req, res, next) => __awaiter(this, void 0, void 0, function* () {
    const db = req.db;
    try {
        const rs = yield receiveModel.getWarehouse(db);
        res.send({ ok: true, rows: rs });
    }
    catch (error) {
        console.log(error);
        res.send({ ok: false, error: error.message });
    }
    finally {
        db.destroy();
    }
})));
router.get('/product-list', wrap((req, res, next) => __awaiter(this, void 0, void 0, function* () {
    const db = req.db;
    const warehouseId = req.decoded.warehouse_id;
    try {
        const rs = yield receiveModel.getProductList(db, warehouseId);
        res.send({ ok: true, rows: rs });
    }
    catch (error) {
        console.log(error);
        res.send({ ok: false, error: error.message });
    }
    finally {
        db.destroy();
    }
})));
router.post('/', wrap((req, res, next) => __awaiter(this, void 0, void 0, function* () {
    const db = req.db;
    const warehouseId = req.decoded.warehouse_id;
    const receiveCode = req.body.summary.receiveCode;
    const supplierId = req.body.summary.supplierId;
    const receiveDate = req.body.summary.receiveDate;
    const createdAt = moment().format('x');
    const products = req.body.products;
    if (receiveCode && supplierId && receiveDate && products.length) {
        try {
            const data = {
                warehouse_id: warehouseId,
                receive_code: receiveCode,
                supplier_id: supplierId,
                receive_date: receiveDate,
                created_at: createdAt
            };
            const rs = yield receiveModel.saveReceiveSummary(db, data);
            console.log(rs);
            let _products = [];
            products.forEach(v => {
                let obj = {
                    product_id: v.product_id,
                    lot_id: v.lot_id,
                    receive_qty: +v.qty,
                    receive_id: rs[0],
                    cost: +v.cost,
                    price: +v.cost
                };
                _products.push(obj);
            });
            yield receiveModel.saveReceiveDetail(db, _products);
            yield Promise.all(_products.map((v) => __awaiter(this, void 0, void 0, function* () {
                yield receiveModel.increseProduct(db, v.lot_id, receiveDate, v.product_id, +v.receive_qty);
            })));
            res.send({ ok: true });
        }
        catch (error) {
            console.log(error);
            res.send({ ok: false, error: error.message });
        }
        finally {
            db.destroy();
        }
    }
    else {
        res.send({ ok: false, error: 'ข้อมูลไม่ครบถ้วน' });
    }
})));
router.get('/', wrap((req, res, next) => __awaiter(this, void 0, void 0, function* () {
    const db = req.db;
    const warehouseId = req.decoded.warehouse_id;
    try {
        const rs = yield receiveModel.getReceivesList(db, warehouseId);
        res.send({ ok: true, rows: rs });
    }
    catch (error) {
        console.log(error);
        res.send({ ok: false, error: error.message });
    }
    finally {
        db.destroy();
    }
})));
exports.default = router;
//# sourceMappingURL=receives.js.map