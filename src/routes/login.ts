import * as express from 'express';
import * as wrap from 'co-express';
import * as crypto from 'crypto';
const router = express.Router();

import { LoginModel } from '../models/login';
import { Jwt } from '../models/jwt';
const jwt = new Jwt();
const loginModel = new LoginModel();

router.post('/admin', wrap(async (req, res, next) => {
  const db = req.db;
  try {
    const username = req.body.username;
    const password = req.body.password;
    const encPassword = crypto.createHash('md5').update(password).digest('hex');
    const rs = await loginModel.adminLogin(db, username, encPassword);
    if (rs.length) {
      const payload = {
        warehouse_id: rs[0].warehouse_id,
        id: rs[0].id,
        fullname: rs[0].fullname,
        is_admin: 1
      };

      const token = jwt.sign(payload);
      res.send({ ok: true, token: token });
    } else {
      res.send({ ok: false, error: 'ชื่อผู้ใช้งาน หรือ รหัสผ่านไม่ถูกต้อง' });
    }
  } catch (error) {
    console.log(error);
    res.send({ ok: false, error: error.message });
  } finally {
    db.destroy();
  }
}));

router.post('/user', wrap(async (req, res, next) => {
  const db = req.db;
  try {
    const username = req.body.username;
    const password = req.body.password;
    const encPassword = crypto.createHash('md5').update(password).digest('hex');
    const rs = await loginModel.userLogin(db, username, encPassword);
    if (rs.length) {
      const payload = {
        department_id: rs[0].department_id,
        id: rs[0].id,
        fullname: rs[0].fullname,
        is_admin: 0
      };

      const token = jwt.sign(payload);
      res.send({ ok: true, token: token });
    } else {
      res.send({ ok: false, error: 'ชื่อผู้ใช้งาน หรือ รหัสผ่านไม่ถูกต้อง' });
    }
  } catch (error) {
    console.log(error);
    res.send({ ok: false, error: error.message });
  } finally {
    db.destroy();
  }
}));

export default router;