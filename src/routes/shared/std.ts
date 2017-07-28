import * as express from 'express';
import * as wrap from 'co-express';

const router = express.Router();
import { WarehouseModel } from '../../models/warehouses';
import { ProductModel } from '../../models/products';

const warehouseModel = new WarehouseModel();
const productModel = new ProductModel();

router.get('/warehouses', wrap(async (req,res,next) => {
  const db = req.db;
  try {
    const rs = await warehouseModel.all(db);
    res.send({ ok: true, rows: rs });
  } catch (error) {
    console.log(error);
    res.send({ ok: false, error: error.message });
  }
}));

router.get('/products/:warehouseId', wrap(async (req,res,next) => {
  const db = req.db;
  const warehouseId = req.params.warehouseId;

  try {
    const rs = await productModel.allByGeneric(db, warehouseId);
    res.send({ ok: true, rows: rs });
  } catch (error) {
    console.log(error);
    res.send({ ok: false, error: error.message });
  } finally {
    db.destroy();
  }
}));

router.post('/products/:warehouseId', wrap(async (req,res,next) => {
  const db = req.db;
  const warehouseId = req.params.warehouseId;
  const query = req.body.query;

  try {
    const rs = await productModel.searchByGeneric(db, warehouseId, query);
    res.send({ ok: true, rows: rs });
  } catch (error) {
    console.log(error);
    res.send({ ok: false, error: error.message });
  } finally {
    db.destroy();
  }
}));

export default router;