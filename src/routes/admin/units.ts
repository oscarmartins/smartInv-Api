import * as express from 'express';
import * as wrap from 'co-express';

const router = express.Router();

import { UnitModel } from '../../models/units';
const unitModel = new UnitModel();

router.get('/', wrap(async (req, res, next) => {
  const db = req.db;
  try {
    const rs = await unitModel.all(db);
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
    data.unit_name = req.body.unitName;
    if (data.unit_name) {
      await unitModel.save(db, data);
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

router.put('/:unitId', wrap(async (req, res, next) => {
  const db = req.db;
  try {
    const unitId = req.params.unitId;
    const data: any = {};
    data.unit_name = req.body.unitName;
    if (data.unit_name && unitId) {
      await unitModel.update(db, unitId, data);
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

router.delete('/:unitId', wrap(async (req, res, next) => {
  const db = req.db;
  try {
    const unitId = req.params.unitId;
    if (unitId) {
      await unitModel.remove(db, unitId);
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