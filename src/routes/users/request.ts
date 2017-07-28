import * as express from 'express';
import * as wrap from 'co-express';
import * as moment from 'moment';

const router = express.Router();
import { RequestModel } from '../../models/users/request';

const requestModel = new RequestModel();

router.get('/', wrap(async (req, res, next) => {
  const db = req.db;
  console.log(req.decoded);
  const departmentId = req.decoded.department_id;

  try {
    const rs = await requestModel.getRequest(db, departmentId)
    res.send({ ok: true, rows: rs });
  } catch (error) {
    res.send({ ok: false, error: error.message });
  } finally {
    db.destroy();
  }

}));

router.delete('/:requestId', wrap(async (req, res, next) => {
  const db = req.db;
  const requestId = req.params.requestId;
  const userId = req.decoded.id;
  const deletedTime = moment().format('x');

  try {
    await requestModel.removeRequest(db, requestId, userId, deletedTime)
    // await requestModel.removeRequestDetail(db, requestId)
    res.send({ ok: true });
  } catch (error) {
    res.send({ ok: false, error: error.message });
  } finally {
    db.destroy();
  }
}));

router.post('/', wrap(async (req, res, next) => {
  const db = req.db;
  const products = req.body.products;
  const requestDate = req.body.requestDate;
  const warehouseId = req.body.warehouseId;
  const userId = req.decoded.id;
  const departmentId = req.decoded.department_id;

  try {
    let summary = {
      request_date: requestDate,
      department_id: departmentId,
      warehouse_id: warehouseId,
      user_id: userId
    };

    const rs = await requestModel.saveSummary(db, summary);
    let _products = [];
    products.forEach(v => {
      const obj: any = {};
      obj.request_id = rs[0];
      obj.generic_id = v.generic_id;
      obj.request_qty = v.qty;
      _products.push(obj);
    });

    await requestModel.saveDetail(db, _products);

    res.send({ ok: true });
  } catch (error) {
    console.log(error);
    res.send({ ok: false, error: error.message });
  } finally {
    db.destroy();
  }
}));

export default router;