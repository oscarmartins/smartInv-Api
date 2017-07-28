import * as express from 'express';
import * as wrap from 'co-express';
import * as moment from 'moment';

const router = express.Router();

import { RequestModel } from '../../models/request';
const requestModel = new RequestModel();

router.get('/', wrap(async (req, res, next) => {
  const db = req.db;
  const warehouseId = req.decoded.warehouse_id;
  try {
    const rs = await requestModel.getRequest(db, warehouseId);
    res.send({ ok: true, rows: rs });
  } catch (error) {
    console.log(error);
    res.send({ ok: false, error: error.message });
  } finally {
    db.destroy();
  }
}));

export default router;