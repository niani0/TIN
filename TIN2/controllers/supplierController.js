const SupplierRepository = require('../repository/sequelize/SupplierRepository');

exports.showSupplierList = (req, res, next) => {
    SupplierRepository.getSuppliers()
        .then(mySuppliers => {
            res.render('Pages/Supplier/list', {
                suppliers: mySuppliers,
                navLocation: 'sup'
            });
        });
}
exports.showAddSupplierForm = (req, res, next) => {
    res.render('Pages/Supplier/form',{ 
        supplier: {},
        pageTitle: 'Nowy dostawca',
        formMode: 'createNew',
        btnLabel: 'Dodaj dostawce',
        formAction: '/suppliers/add',
        navLocation: 'sup',
        validationErrors: []
    })
}
exports.showEditSupplierForm = (req, res, next) => {
    const supplierId = req.params.supplierId;
    SupplierRepository.getSupplierById(supplierId)
        .then( mySupplier => {
            res.render('Pages/Supplier/form',{ 
                supplier: mySupplier,
                pageTitle: 'Edycja dostawcy',
                formMode: 'edit',
                btnLabel: 'Edytuj dostawce',
                formAction: '/suppliers/edit',
                navLocation: 'sup',
                validationErrors: []
        });
    });
}
exports.showSupplierDetails = (req, res, next) => {
    const supplierId = req.params.supplierId;
    SupplierRepository.getSupplierById(supplierId)
        .then( mySupplier => {
            res.render('Pages/Supplier/form', {
                supplier: mySupplier,
                formMode: 'showDetails',
                pageTitle: 'Szczegóły dostawcy',
                formAction: '',
                navLocation: 'sup',
                validationErrors: []
            });
        });
}
exports.addSupplier = (req,res,next) => {
    const supplierData = { ...req.body };
SupplierRepository.createSupplier(supplierData)
    .then( result => {
        res.redirect('/suppliers');
    }).catch(err => {
        err.errors.forEach(e => {
            if (e.path.includes('email') && e.type == 'unique violation')  {
                e.message = "Podany adres email jest już używany";
            }
        });
        res.render('pages/supplier/form', {
            supplier: supplierData,
            pageTitle: 'Nowy dostawca',
            formMode: 'createNew',
            btnLabel: 'Dodaj dostawce',
            formAction: '/suppliers/add',
            navLocation: 'sup',
            validationErrors: err.errors
        });
    });
};


exports.updateSupplier = (req,res,next) => {
    const supplierId = req.body.id;
    const supplierData = { ...req.body };
    let error =[];

    SupplierRepository.updateSupplier(supplierId, supplierData)
    .then(result => {
        res.redirect('/suppliers');
    }).catch(err => {
        err.errors.forEach(e => {
            if (e.path.includes('email') && e.type == 'unique violation')  {
                e.message = "Podany adres email jest już używany";
            }
        });
        error = err
        return SupplierRepository.getSupplierById(supplierId)
    }).then(mySupp => {
        res.render('pages/supplier/form', {
            supplier: mySupp,
            pageTitle: 'Edycja dostawcy',
            formMode: 'edit',
            btnLabel: 'Edytuj dostawce',
            formAction: '/suppliers/edit',
            navLocation: 'sup',
            validationErrors: error.errors
        });
    });
};

exports.deleteSupplier = (req,res,next) => {
    const supplierId = req.params.supplierId;
    SupplierRepository.deleteSupplier(supplierId)
        .then( () => {
            res.redirect('/suppliers');
        })
};