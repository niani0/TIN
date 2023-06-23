const express = require('express');
const router = express.Router();
const supplierControler = require('../controllers/supplierController');

router.get('/',supplierControler.showSupplierList);
router.get('/add',supplierControler.showAddSupplierForm);
router.get('/details/:supplierId',supplierControler.showSupplierDetails);
router.get('/edit/:supplierId',supplierControler.showEditSupplierForm);
router.post('/add',supplierControler.addSupplier);
router.post('/edit',supplierControler.updateSupplier);
router.get('/delete/:supplierId',supplierControler.deleteSupplier);
module.exports = router;