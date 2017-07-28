import * as express from 'express';
import * as wrap from 'co-express';

const router = express.Router();

import { LotsModel } from '../../models/lots';
const lotsModel = new LotsModel();

router.get('/product-lots/:productId', wrap(async (req, res, next) => {
  const db = req.db;
  const productId = req.params.productId;
  try {
    const rs = await lotsModel.getProductLots(db, productId);
    res.send({ ok: true, rows: rs });
  } catch (error) {
    console.log(error);
    res.send({ ok: false, error: error.message });
  } finally {
    db.destroy();
  }
}));

router.post('/product-lots/:productId', wrap(async (req, res, next) => {
  const db = req.db;
  const productId = req.params.productId;
  const lotNo = req.body.lotNo;
  const cost = req.body.cost;
  const price = req.body.price;
  if (lotNo && cost && productId) {
    try {
      const rs = await lotsModel.saveLotDetail(db, productId, lotNo, cost, price);
      res.send({ ok: true, rows: rs });
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

router.put('/:lotId', wrap(async (req, res, next) => {
  const db = req.db;
  const lotId = req.params.lotId;
  const lotNo = req.body.lotNo;
  const cost = req.body.cost;
  const price = req.body.price;
  if (lotNo && cost && lotId) {
    try {
      const rs = await lotsModel.updateLotDetail(db, lotId, lotNo, cost, price);
      res.send({ ok: true, rows: rs });
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

export default router;