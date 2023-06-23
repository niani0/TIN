const OrderRepository = require('../repository/sequelize/OrderRepository');
const ClientRepository = require('../repository/sequelize/ClientRepository');
const SupplierRepository = require('../repository/sequelize/SupplierRepository');
const Order = require('../model/sequelize/Order');

exports.showOrderList = (req, res, next) => {
    OrderRepository.getOrders()
        .then(myOrders => {
            res.render('Pages/Order/list', {
                orders: myOrders,
                navLocation: 'ord',
            });
        });
}
exports.showAddOrderForm = (req, res, next) => {
    let allClis, allSupps
    ClientRepository.getClients()
        .then(clis => {
            allClis = clis;
            return SupplierRepository.getSuppliers();
        })
        .then(supps => {
            allSupps = supps;
            res.render('Pages/Order/form',{ 
                order: {},
                allClis: allClis,
                allSupps: allSupps,
                pageTitle: 'Nowe zamówienie',
                formMode: 'createNew',
                btnLabel: 'Dodaj zamówienie',
                formAction: '/orders/add',
                navLocation: 'ord',
                validationErrors: []
        });
    });
}
exports.showEditOrderForm = (req, res, next) => {
    const orderId = req.params.orderId;
    ClientRepository.getClients()
        .then(clis => {
            allClis = clis;
            return SupplierRepository.getSuppliers();
        }).then(supps => {
            allSupps = supps;
            return OrderRepository.getOrderById(orderId);
        })
        .then( myOrder => {
            res.render('Pages/Order/form',{ 
                order: myOrder,
                allClis: allClis,
                allSupps: allSupps,
                pageTitle: 'Edycja zamówienia',
                formMode: 'edit',
                btnLabel: 'Edytuj zamówienie',
                formAction: '/orders/edit',
                navLocation: 'ord',
                validationErrors: []
        });
    });
}
exports.showOrderDetails = (req, res, next) => { 
    const orderId = req.params.orderId;ClientRepository.getClients()
    .then(clis => {
        allClis = clis;
        return SupplierRepository.getSuppliers();
    }).then(supps => {
        allSupps = supps;
        return OrderRepository.getOrderById(orderId);
    })
    .then( myOrder => {
        res.render('Pages/Order/form', {
            order: myOrder,
            allClis: allClis,
            allSupps: allSupps,
            formMode: 'showDetails',
            pageTitle: 'Szczegóły zamówienia',
            formAction: '',
            navLocation: 'ord',
            validationErrors: []
        });
    });
}
exports.addOrder = (req,res,next) => {
    const orderData = { ...req.body };
    let allClis, allSupps, error;

OrderRepository.createOrder(orderData)
    .then( result => {
        res.redirect('/orders');
    }).catch(err => {
        error = err;
        return ClientRepository.getClients();   
    }).then(clients => {
        allClis= clients;
        return SupplierRepository.getSuppliers()
    }).then(supps => {
        allSupps =supps;
        res.render('pages/order/order-form', {
            order: {},
            allClis: allClis,
            allSupps: allSupps,
            formMode: 'createNew',
            pageTitle: 'Dodawanie zamówienia',
            btnLabel: 'Dodaj zamówienie',
            formAction: '/order/add',
            navLocation: 'order',
            validationErrors: error.errors
        });
    });
};


exports.updateOrder = (req,res,next) => {
    const orderId = req.body.id;
    const orderData = { ...req.body };
    let allClis, allSupps, error;

    OrderRepository.updateOrder(orderId, orderData)
    .then( result => {
        res.redirect('/orders');
    }).catch(err => {
        error = err;
        return ClientRepository.getClients();   
    }).then(clients => {
        allClis= clients;
        return SupplierRepository.getSuppliers()
    }).then(supps => {
        allSupps =supps;
        return OrderRepository.getOrderById(orderId)
    }).then(order => {
        res.render('pages/order/order-form', {
            order: order,
            allClis: allClis,
            allSupps: allSupps,
            formMode: 'edit',
            pageTitle: 'Edytowanie zamówienia',
            btnLabel: 'Edytuj zamówienie',
            formAction: '/order/edit',
            navLocation: 'order',
            validationErrors: error.errors
        });
    });
};

exports.deleteOrder = (req,res,next) => {
    const orderId = req.params.orderId;
    OrderRepository.deleteOrder(orderId)
        .then( () => {
            res.redirect('/orders');
        })
};
