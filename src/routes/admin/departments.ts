import * as express from 'express';
import * as wrap from 'co-express';

const router = express.Router();

import { DepartmentModel } from '../../models/department';
const departmentModel = new DepartmentModel();

router.get('/', wrap(async (req, res, next) => {
  const db = req.db;
  try {
    const rs = await departmentModel.all(db);
    res.send({ ok: true, rows: rs });
  } catch (error) {
    console.log(error);
    res.send({ ok: false, error: error.message });
  } finally {
    db.destroy();
  }
}));

router.post('/', wrap(async (req, res, next) => {
  const db = req.db;
  try {
    const data: any = {};
    data.department_name = req.body.departmentName;
    if (data.department_name) {
      await departmentModel.save(db, data);
      res.send({ ok: true });
    } else {
      res.send({ ok: false, error: 'ข้อมูลไม่ครบถ้วน กรุณาตรวจสอบ' });
    }
  } catch (error) {
    console.log(error);
    res.send({ ok: false, error: error.message });
  } finally {
    db.destroy();
  }
}));

router.put('/:departmentId', wrap(async (req, res, next) => {
  const db = req.db;
  try {
    const departmentId = req.params.departmentId;
    const data: any = {};
    data.department_name = req.body.departmentName;
    if (data.department_name && departmentId) {
      await departmentModel.update(db, departmentId, data);
      res.send({ ok: true });
    } else {
      res.send({ ok: false, error: 'ข้อมูลไม่ครบถ้วน กรุณาตรวจสอบ' });
    }
  } catch (error) {
    console.log(error);
    res.send({ ok: false, error: error.message });
  } finally {
    db.destroy();
  }
}));

router.delete('/:departmentId', wrap(async (req, res, next) => {
  const db = req.db;
  try {
    const departmentId = req.params.departmentId;
    if (departmentId) {
      await departmentModel.remove(db, departmentId);
      res.send({ ok: true });
    } else {
      res.send({ ok: false, error: 'ข้อมูลไม่ครบถ้วน กรุณาตรวจสอบ' });
    }
  } catch (error) {
    console.log(error);
    res.send({ ok: false, error: error.message });
  } finally {
    db.destroy();
  }
}));

export default router;