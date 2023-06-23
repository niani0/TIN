const OrderRepository = require('../repository/sequelize/OrderRepository');

exports.getOrders = (req, res, next) => {
    OrderRepository.getOrders()
    .then(orders => {
        res.status(200).json(orders);
    })
    .catch(err => {
        console.log(err);
    })
};

exports.getOrderById = (req, res, next) => {
    const orderId = req.params.orderId;
    OrderRepository.getOrderById(orderId)
    .then(order => {
        if(!order){
            res.status(404).json({
                message: 'Order with id: '+orderId+' not found'
            })
        } else {
            res.status(200).json(order);
        }
    })
    .catch(err => {
        console.log(err);
    })
};

exports.createOrder = (req, res, next) => {
    OrderRepository.createOrder(req.body)
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

exports.updateOrder = (req, res, next) => {
    const orderId = req.params.orderId;
    OrderRepository.updateOrder(orderId, req.body)
    .then(result => {
        res.status(201).json({message: 'Order updated', order: result});
    })
    .catch(err => {
        if(!err.statusCode) {
            err.statusCode = 500;
        }
        next(err);
    });
};

exports.deleteOrder = (req, res, next) => {
    const orderId = req.params.orderId;
    OrderRepository.deleteOrder(orderId)
    .then(result => {
        res.status(200).json({message: 'Removed Order', order: result});
    })
    .catch(err => {
        if(!err.statusCode) {
            err.statusCode = 500;
        }
        next(err);
    });
};
