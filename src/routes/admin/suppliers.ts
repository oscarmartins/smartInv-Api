import * as express from 'express';
import * as wrap from 'co-express';

const router = express.Router();

import { SuppliersModel } from '../../models/suppliers';
const supplierModel = new SuppliersModel();

router.get('/', wrap(async (req, res, next) => {
  const db = req.db;
  try {
    const rs = await supplierModel.all(db);
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
    data.supplier_name = req.body.supplierName;
    data.address = req.body.address;
    data.telephone = req.body.telephone;
    data.fax = req.body.fax;
    data.contact_name = req.body.contactName;
    data.contact_telephone = req.body.contactTelephone;

    if (data.supplier_name && data.address && data.contact_name && data.contact_telephone) {
      await supplierModel.save(db, data);
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

router.put('/:supplierId', wrap(async (req, res, next) => {
  const db = req.db;
  try {
    const supplierId = req.params.supplierId;
    const data: any = {};
    data.supplier_name = req.body.supplierName;
    data.address = req.body.address;
    data.telephone = req.body.telephone;
    data.fax = req.body.fax;
    data.contact_name = req.body.contactName;
    data.contact_telephone = req.body.contactTelephone;

    if (data.supplier_name && data.address && data.contact_name && data.contact_telephone) {
      await supplierModel.update(db, supplierId, data);
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

router.delete('/:supplierId', wrap(async (req, res, next) => {
  const db = req.db;
  try {
    const supplierId = req.params.supplierId;
    if (supplierId) {
      await supplierModel.remove(db, supplierId);
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