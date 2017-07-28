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
const products_1 = require("../../models/products");
const productModel = new products_1.ProductModel();
router.get('/', wrap((req, res, next) => __awaiter(this, void 0, void 0, function* () {
    const db = req.db;
    const warehouseId = req.decoded.warehouse_id;
    try {
        const rs = yield productModel.all(db, warehouseId);
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
    try {
        const data = {};
        data.product_id = moment().format('x');
        data.product_name = req.body.productName;
        data.supplier_id = req.body.supplierId;
        data.generic_id = req.body.genericId;
        if (data.product_name && data.supplier_id && data.generic_id) {
            yield productModel.save(db, data);
            res.send({ ok: true });
        }
        else {
            res.send({ ok: false, error: 'ข้อมูลไม่ครบถ้วน กรุณาตรวจสอบ' });
        }
    }
    catch (error) {
        console.log(error);
        res.send({ ok: false, error: error.message });
    }
    finally {
        db.destroy();
    }
})));
router.put('/:productId', wrap((req, res, next) => __awaiter(this, void 0, void 0, function* () {
    const db = req.db;
    try {
        const productId = req.params.productId;
        const data = {};
        data.product_name = req.body.productName;
        data.supplier_id = req.body.supplierId;
        data.generic_id = req.body.genericId;
        if (data.product_name && productId && data.supplier_id && data.generic_id) {
            yield productModel.update(db, productId, data);
            res.send({ ok: true });
        }
        else {
            res.send({ ok: false, error: 'ข้อมูลไม่ครบถ้วน กรุณาตรวจสอบ' });
        }
    }
    catch (error) {
        console.log(error);
        res.send({ ok: false, error: error.message });
    }
    finally {
        db.destroy();
    }
})));
router.delete('/:productId', wrap((req, res, next) => __awaiter(this, void 0, void 0, function* () {
    const db = req.db;
    try {
        const productId = req.params.productId;
        if (productId) {
            yield productModel.remove(db, productId);
            res.send({ ok: true });
        }
        else {
            res.send({ ok: false, error: 'ข้อมูลไม่ครบถ้วน กรุณาตรวจสอบ' });
        }
    }
    catch (error) {
        console.log(error);
        res.send({ ok: false, error: error.message });
    }
    finally {
        db.destroy();
    }
})));
router.post('/search', wrap((req, res, next) => __awaiter(this, void 0, void 0, function* () {
    const db = req.db;
    const query = req.body.query;
    console.log(query);
    console.log(req.body);
    const warehouseId = req.decoded.warehouse_id;
    if (query) {
        try {
            const rs = yield productModel.search(db, warehouseId, query);
            res.send({ ok: true, rows: rs });
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
        res.send({ ok: false, error: 'กรุณาระบุคำค้นหา' });
    }
})));
exports.default = router;
//# sourceMappingURL=products.js.map