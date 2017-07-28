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
const crypto = require("crypto");
const router = express.Router();
const login_1 = require("../models/login");
const jwt_1 = require("../models/jwt");
const jwt = new jwt_1.Jwt();
const loginModel = new login_1.LoginModel();
router.post('/admin', wrap((req, res, next) => __awaiter(this, void 0, void 0, function* () {
    const db = req.db;
    try {
        const username = req.body.username;
        const password = req.body.password;
        const encPassword = crypto.createHash('md5').update(password).digest('hex');
        const rs = yield loginModel.adminLogin(db, username, encPassword);
        if (rs.length) {
            const payload = {
                warehouse_id: rs[0].warehouse_id,
                id: rs[0].id,
                fullname: rs[0].fullname,
                is_admin: 1
            };
            const token = jwt.sign(payload);
            res.send({ ok: true, token: token });
        }
        else {
            res.send({ ok: false, error: 'ชื่อผู้ใช้งาน หรือ รหัสผ่านไม่ถูกต้อง' });
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
router.post('/user', wrap((req, res, next) => __awaiter(this, void 0, void 0, function* () {
    const db = req.db;
    try {
        const username = req.body.username;
        const password = req.body.password;
        const encPassword = crypto.createHash('md5').update(password).digest('hex');
        const rs = yield loginModel.userLogin(db, username, encPassword);
        if (rs.length) {
            const payload = {
                department_id: rs[0].department_id,
                id: rs[0].id,
                fullname: rs[0].fullname,
                is_admin: 0
            };
            const token = jwt.sign(payload);
            res.send({ ok: true, token: token });
        }
        else {
            res.send({ ok: false, error: 'ชื่อผู้ใช้งาน หรือ รหัสผ่านไม่ถูกต้อง' });
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
//# sourceMappingURL=login.js.map