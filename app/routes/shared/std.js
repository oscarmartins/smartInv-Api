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
const router = express.Router();
const warehouses_1 = require("../../models/warehouses");
const products_1 = require("../../models/products");
const warehouseModel = new warehouses_1.WarehouseModel();
const productModel = new products_1.ProductModel();
router.get('/warehouses', wrap((req, res, next) => __awaiter(this, void 0, void 0, function* () {
    const db = req.db;
    try {
        const rs = yield warehouseModel.all(db);
        res.send({ ok: true, rows: rs });
    }
    catch (error) {
        console.log(error);
        res.send({ ok: false, error: error.message });
    }
})));
router.get('/products/:warehouseId', wrap((req, res, next) => __awaiter(this, void 0, void 0, function* () {
    const db = req.db;
    const warehouseId = req.params.warehouseId;
    try {
        const rs = yield productModel.allByGeneric(db, warehouseId);
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
router.post('/products/:warehouseId', wrap((req, res, next) => __awaiter(this, void 0, void 0, function* () {
    const db = req.db;
    const warehouseId = req.params.warehouseId;
    const query = req.body.query;
    try {
        const rs = yield productModel.searchByGeneric(db, warehouseId, query);
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
//# sourceMappingURL=std.js.map