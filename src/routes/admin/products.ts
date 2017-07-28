import * as express from 'express';
import * as wrap from 'co-express';
import * as moment from 'moment';
import * as _ from 'lodash';

const router = express.Router();

import { ProductModel } from '../../models/products';
const productModel = new ProductModel();

router.get('/', wrap(async (req, res, next) => {
  const db = req.db;
  const warehouseId = req.decoded.warehouse_id;

  try {
    const rs = await productModel.all(db, warehouseId);
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
    data.product_id = moment().format('x');
    data.product_name = req.body.productName;
    data.supplier_id = req.body.supplierId;
    data.generic_id = req.body.genericId;

    if (data.product_name && data.supplier_id && data.generic_id) {
      await productModel.save(db, data);
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

router.put('/:productId', wrap(async (req, res, next) => {
  const db = req.db;
  try {
    const productId = req.params.productId;
    const data: any = {};
    data.product_name = req.body.productName;
    data.supplier_id = req.body.supplierId;
    data.generic_id = req.body.genericId;

    if (data.product_name && productId && data.supplier_id && data.generic_id) {
      await productModel.update(db, productId, data);
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

router.delete('/:productId', wrap(async (req, res, next) => {
  const db = req.db;
  try {
    const productId = req.params.productId;
    if (productId) {
      await productModel.remove(db, productId);
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

router.post('/search', wrap(async (req, res, next) => {
  const db = req.db;
  const query = req.body.query;
  console.log(query)
  console.log(req.body);
  const warehouseId = req.decoded.warehouse_id;
  if (query) {
    try {
      const rs = await productModel.search(db, warehouseId, query);
      res.send({ ok: true, rows: rs });
    } catch (error) {
      console.log(error);
      res.send({ ok: false, error: error.message });
    } finally {
      db.destroy();
    }
  } else {
    res.send({ ok: false, error: 'กรุณาระบุคำค้นหา' });
  }

}));

export default router;