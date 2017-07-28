import * as express from 'express';
import * as wrap from 'co-express';

const router = express.Router();

import { GenericTypeModel } from '../../models/generic-types';
const genericTypeModel = new GenericTypeModel();

router.get('/', wrap(async (req, res, next) => {
  const db = req.db;
  try {
    const rs = await genericTypeModel.all(db);
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
    data.generic_type_name = req.body.genericTypeName;
    data.generic_type_id = req.body.genericTypeId;
    if (data.generic_type_name && data.generic_type_id) {
      await genericTypeModel.save(db, data);
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

router.put('/:genericTypeId', wrap(async (req, res, next) => {
  const db = req.db;
  try {
    const genericTypeId = req.params.genericTypeId;
    const data: any = {};
    data.generic_type_name = req.body.genericTypeName;
    data.generic_type_id = req.body.genericTypeId;
    if (data.generic_type_name && data.generic_type_id) {
      await genericTypeModel.update(db, genericTypeId, data);
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

router.delete('/:genericTypeId', wrap(async (req, res, next) => {
  const db = req.db;
  try {
    const genericTypeId = req.params.genericTypeId;
    if (genericTypeId) {
      await genericTypeModel.remove(db, genericTypeId);
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