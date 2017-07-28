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
const lots_1 = require("../../models/lots");
const lotsModel = new lots_1.LotsModel();
router.get('/product-lots/:productId', wrap((req, res, next) => __awaiter(this, void 0, void 0, function* () {
    const db = req.db;
    const productId = req.params.productId;
    try {
        const rs = yield lotsModel.getProductLots(db, productId);
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
router.post('/product-lots/:productId', wrap((req, res, next) => __awaiter(this, void 0, void 0, function* () {
    const db = req.db;
    const productId = req.params.productId;
    const lotNo = req.body.lotNo;
    const cost = req.body.cost;
    const price = req.body.price;
    if (lotNo && cost && productId) {
        try {
            const rs = yield lotsModel.saveLotDetail(db, productId, lotNo, cost, price);
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
        res.send({ ok: false, error: 'ข้อมูลไม่ครบถ้วน' });
    }
})));
router.put('/:lotId', wrap((req, res, next) => __awaiter(this, void 0, void 0, function* () {
    const db = req.db;
    const lotId = req.params.lotId;
    const lotNo = req.body.lotNo;
    const cost = req.body.cost;
    const price = req.body.price;
    if (lotNo && cost && lotId) {
        try {
            const rs = yield lotsModel.updateLotDetail(db, lotId, lotNo, cost, price);
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
        res.send({ ok: false, error: 'ข้อมูลไม่ครบถ้วน' });
    }
})));
exports.default = router;
//# sourceMappingURL=lots.js.map