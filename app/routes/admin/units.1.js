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
const units_1 = require("../../models/units");
const unitModel = new units_1.UnitModel();
router.get('/', wrap((req, res, next) => __awaiter(this, void 0, void 0, function* () {
    const db = req.db;
    try {
        const rs = yield unitModel.all(db);
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
        data.unit_name = req.body.unitName;
        if (data.unit_name) {
            yield unitModel.save(db, data);
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
router.put('/:unitId', wrap((req, res, next) => __awaiter(this, void 0, void 0, function* () {
    const db = req.db;
    try {
        const unitId = req.params.unitId;
        const data = {};
        data.unit_name = req.body.unitName;
        if (data.unit_name && unitId) {
            yield unitModel.update(db, unitId, data);
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
router.delete('/:unitId', wrap((req, res, next) => __awaiter(this, void 0, void 0, function* () {
    const db = req.db;
    try {
        const unitId = req.params.unitId;
        if (unitId) {
            yield unitModel.remove(db, unitId);
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
exports.default = router;
//# sourceMappingURL=units.1.js.map