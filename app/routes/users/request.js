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
const request_1 = require("../../models/users/request");
const requestModel = new request_1.RequestModel();
router.get('/', wrap((req, res, next) => __awaiter(this, void 0, void 0, function* () {
    const db = req.db;
    console.log(req.decoded);
    const departmentId = req.decoded.department_id;
    try {
        const rs = yield requestModel.getRequest(db, departmentId);
        res.send({ ok: true, rows: rs });
    }
    catch (error) {
        res.send({ ok: false, error: error.message });
    }
    finally {
        db.destroy();
    }
})));
router.delete('/:requestId', wrap((req, res, next) => __awaiter(this, void 0, void 0, function* () {
    const db = req.db;
    const requestId = req.params.requestId;
    const userId = req.decoded.id;
    const deletedTime = moment().format('x');
    try {
        yield requestModel.removeRequest(db, requestId, userId, deletedTime);
        res.send({ ok: true });
    }
    catch (error) {
        res.send({ ok: false, error: error.message });
    }
    finally {
        db.destroy();
    }
})));
router.post('/', wrap((req, res, next) => __awaiter(this, void 0, void 0, function* () {
    const db = req.db;
    const products = req.body.products;
    const requestDate = req.body.requestDate;
    const warehouseId = req.body.warehouseId;
    const userId = req.decoded.id;
    const departmentId = req.decoded.department_id;
    try {
        let summary = {
            request_date: requestDate,
            department_id: departmentId,
            warehouse_id: warehouseId,
            user_id: userId
        };
        const rs = yield requestModel.saveSummary(db, summary);
        let _products = [];
        products.forEach(v => {
            const obj = {};
            obj.request_id = rs[0];
            obj.generic_id = v.generic_id;
            obj.request_qty = v.qty;
            _products.push(obj);
        });
        yield requestModel.saveDetail(db, _products);
        res.send({ ok: true });
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
//# sourceMappingURL=request.js.map