const SupplierRepository = require('../repository/sequelize/SupplierRepository');

exports.getSuppliers = (req, res, next) => {
    SupplierRepository.getSuppliers()
    .then(suppliers => {
        res.status(200).json(suppliers);
    })
    .catch(err => {
        console.log(err);
    })
};

exports.getSupplierById = (req, res, next) => {
    const supplierId = req.params.supplierId;
    SupplierRepository.getSupplierById(supplierId)
    .then(supplier => {
        if(!supplier){
            res.status(404).json({
                message: 'supplier with id: '+supplierId+' not found'
            })
        } else {
            res.status(200).json(supplier);
        }
    })
    .catch(err => {
        console.log(err);
    })
};

exports.createSupplier = (req, res, next) => {
    SupplierRepository.createSupplier(req.body)
    .then(newObj => {
        res.status(201).json(newObj);
    })
    .catch(err => {
        if(!err.statusCode) {
            err.statusCode = 500;
        }
        next(err);
    });
};

exports.updateSupplier = (req, res, next) => {
    const supplierId = req.params.supplierId;
    SupplierRepository.updateSupplier(supplierId, req.body)
    .then(result => {
        res.status(201).json({message: 'Supplier updated', supplier: result});
    })
    .catch(err => {
        if(!err.statusCode) {
            err.statusCode = 500;
        }
        next(err);
    });
};

exports.deleteSupplier = (req, res, next) => {
    const supplierId = req.params.supplierId;
    SupplierRepository.deleteSupplier(supplierId)
    .then(result => {
        res.status(200).json({message: 'Removed Supplier', supplier: result});
    })
    .catch(err => {
        if(!err.statusCode) {
            err.statusCode = 500;
        }
        next(err);
    });
};
