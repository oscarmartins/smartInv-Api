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
const suppliers_1 = require("../../models/suppliers");
const supplierModel = new suppliers_1.SuppliersModel();
router.get('/', wrap((req, res, next) => __awaiter(this, void 0, void 0, function* () {
    const db = req.db;
    try {
        const rs = yield supplierModel.all(db);
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
        data.supplier_name = req.body.supplierName;
        data.address = req.body.address;
        data.telephone = req.body.telephone;
        data.fax = req.body.fax;
        data.contact_name = req.body.contactName;
        data.contact_telephone = req.body.contactTelephone;
        if (data.supplier_name && data.address && data.contact_name && data.contact_telephone) {
            yield supplierModel.save(db, data);
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
router.put('/:supplierId', wrap((req, res, next) => __awaiter(this, void 0, void 0, function* () {
    const db = req.db;
    try {
        const supplierId = req.params.supplierId;
        const data = {};
        data.supplier_name = req.body.supplierName;
        data.address = req.body.address;
        data.telephone = req.body.telephone;
        data.fax = req.body.fax;
        data.contact_name = req.body.contactName;
        data.contact_telephone = req.body.contactTelephone;
        if (data.supplier_name && data.address && data.contact_name && data.contact_telephone) {
            yield supplierModel.update(db, supplierId, data);
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
router.delete('/:supplierId', wrap((req, res, next) => __awaiter(this, void 0, void 0, function* () {
    const db = req.db;
    try {
        const supplierId = req.params.supplierId;
        if (supplierId) {
            yield supplierModel.remove(db, supplierId);
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
//# sourceMappingURL=suppliers.1.js.map