import * as express from 'express';
import * as wrap from 'co-express';
import * as moment from 'moment';

const router = express.Router();

import { ReceiveModel } from '../../models/receives';
const receiveModel = new ReceiveModel();

router.get('/warehouses', wrap(async (req, res, next) => {
  const db = req.db;
  try {
    const rs = await receiveModel.getWarehouse(db);
    res.send({ ok: true, rows: rs });
  } catch (error) {
    console.log(error);
    res.send({ ok: false, error: error.message });
  } finally {
    db.destroy();
  }
}));

router.get('/product-list', wrap(async (req, res, next) => {
  const db = req.db;
  const warehouseId = req.decoded.warehouse_id;
  try {
    const rs = await receiveModel.getProductList(db, warehouseId);
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
  const warehouseId = req.decoded.warehouse_id;
  const receiveCode = req.body.summary.receiveCode;
  const supplierId = req.body.summary.supplierId;
  const receiveDate = req.body.summary.receiveDate;
  const createdAt = moment().format('x');

  const products = req.body.products;

  if (receiveCode && supplierId && receiveDate && products.length) {
    try {
      const data: any = {
        warehouse_id: warehouseId,
        receive_code: receiveCode,
        supplier_id: supplierId,
        receive_date: receiveDate,
        created_at: createdAt
      }

      // save summary
      const rs = await receiveModel.saveReceiveSummary(db, data);
      console.log(rs);
      // save detail
      let _products = [];
      products.forEach(v => {
        let obj: any = {
          product_id: v.product_id,
          lot_id: v.lot_id,
          receive_qty: +v.qty,
          receive_id: rs[0],
          cost: +v.cost,
          price: +v.cost
        }
        _products.push(obj);
      });

      await receiveModel.saveReceiveDetail(db, _products);

      await Promise.all(_products.map(async (v) => {
        await receiveModel.increseProduct(db, v.lot_id, receiveDate, v.product_id, +v.receive_qty);
      }));

      res.send({ ok: true });
    } catch (error) {
      console.log(error);
      res.send({ ok: false, error: error.message });
    } finally {
      db.destroy();
    }
  } else {
    res.send({ ok: false, error: 'ข้อมูลไม่ครบถ้วน' })
  }

}));

router.get('/', wrap(async (req, res, next) => {
  const db = req.db;
  const warehouseId = req.decoded.warehouse_id;
  try {
    const rs = await receiveModel.getReceivesList(db, warehouseId);
    res.send({ ok: true, rows: rs });
  } catch (error) {
    console.log(error);
    res.send({ ok: false, error: error.message });
  } finally {
    db.destroy();
  }
}));


export default router;