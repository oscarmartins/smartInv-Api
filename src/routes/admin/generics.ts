import * as express from 'express';
import * as wrap from 'co-express';

const router = express.Router();

import { GenericModel } from '../../models/generic';
const genericModel = new GenericModel();

router.get('/', wrap(async (req, res, next) => {
  const db = req.db;
  try {
    const rs = await genericModel.all(db);
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
    data.generic_name = req.body.genericName;
    data.generic_type_id = req.body.genericTypeId;
    data.unit_id = req.body.unitId;
    if (data.generic_name && data.generic_type_id && data.unit_id) {
      await genericModel.save(db, data);
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

router.put('/:genericId', wrap(async (req, res, next) => {
  const db = req.db;
  try {
    const genericId = req.params.genericId;
    const data: any = {};
    data.generic_name = req.body.genericName;
    data.generic_type_id = req.body.genericTypeId;
    data.unit_id = req.body.unitId;
    if (data.generic_name && data.generic_type_id && data.unit_id) {
      await genericModel.update(db, genericId, data);
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

router.delete('/:genericId', wrap(async (req, res, next) => {
  const db = req.db;
  try {
    const genericId = req.params.genericId;
    if (genericId) {
      await genericModel.remove(db, genericId);
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