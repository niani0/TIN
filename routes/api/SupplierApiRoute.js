const express = require('express');
const router = express.Router();

const supplierApiController = require('../../api/SupplierAPI');

router.get('/', supplierApiController.getSuppliers);
router.get('/:supplierId', supplierApiController.getSupplierById);
router.post('/', supplierApiController.createSupplier);
router.put('/:supplierId', supplierApiController.updateSupplier);
router.delete('/:supplierId', supplierApiController.deleteSupplier);

module.exports = router;
