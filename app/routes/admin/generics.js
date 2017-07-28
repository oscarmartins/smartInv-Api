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
const generic_1 = require("../../models/generic");
const genericModel = new generic_1.GenericModel();
router.get('/', wrap((req, res, next) => __awaiter(this, void 0, void 0, function* () {
    const db = req.db;
    try {
        const rs = yield genericModel.all(db);
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
        data.generic_name = req.body.genericName;
        data.generic_type_id = req.body.genericTypeId;
        data.unit_id = req.body.unitId;
        if (data.generic_name && data.generic_type_id && data.unit_id) {
            yield genericModel.save(db, data);
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
router.put('/:genericId', wrap((req, res, next) => __awaiter(this, void 0, void 0, function* () {
    const db = req.db;
    try {
        const genericId = req.params.genericId;
        const data = {};
        data.generic_name = req.body.genericName;
        data.generic_type_id = req.body.genericTypeId;
        data.unit_id = req.body.unitId;
        if (data.generic_name && data.generic_type_id && data.unit_id) {
            yield genericModel.update(db, genericId, data);
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
router.delete('/:genericId', wrap((req, res, next) => __awaiter(this, void 0, void 0, function* () {
    const db = req.db;
    try {
        const genericId = req.params.genericId;
        if (genericId) {
            yield genericModel.remove(db, genericId);
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
//# sourceMappingURL=generics.js.map