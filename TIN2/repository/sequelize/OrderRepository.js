const Sequelize = require('sequelize');

const Client = require ("../../model/sequelize/Client");
const Order = require ("../../model/sequelize/Order");
const Supplier = require ("../../model/sequelize/Supplier");

exports.getOrders = () => {
    return Order.findAll({include: [
        {
            model: Client,
            as: 'client'
        },
        {
            model: Supplier,
            as: 'supplier'
        }
    ]});
};

exports.getOrderById = (orderId) => {
    return Order.findByPk(orderId,
        {
            include: [{
                model: Client,
                as: 'client'
            },
        {
            model: Supplier,
            as: 'supplier'
        }]
        })
};

exports.createOrder = (data) => {
    console.log(JSON.stringify(data));

    return Order.create({
        client_id: data.client_id,
        supplier_id: data.supplier_id,
        order_date: data.order_date,
        delivery_date: data.delivery_date
    });
};

exports.updateOrder = (orderId, data) => {
    return Order.update(data, {where: {id: orderId}});
};

exports.deleteOrder = (orderId) => {
    return Order.destroy({
        where: {id: orderId}
    });
};

exports.deleteManyOrders = (orderIds) => {
    return Order.find({ id: { [Sequelize.Op.in]: orderIds}});
};
