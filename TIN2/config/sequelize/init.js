const sequelize = require('./sequelize');

const Client = require('../../model/sequelize/Client');
const Supplier = require('../../model/sequelize/Supplier');
const Order = require('../../model/sequelize/Order');

module.exports = () => {
    Client.hasMany(Order, {as: 'orders', foreignKey: {name: 'client_id', allowNull: false}, constraints: true, onDelete: 'CASCADE'});
    Order.belongsTo(Client, {as: 'client', foreignKey: {name: 'client_id', allowNull: false} } );
    Supplier.hasMany(Order, {as: 'orders', foreignKey: {name: 'supplier_id', allowNull: false}, constraints: true, onDelete: 'CASCADE'});
    Order.belongsTo(Supplier, {as: 'supplier', foreignKey: {name: 'supplier_id', allowNull: false} } );

    let allClients, allSupps;
    return sequelize
        .sync({force: true})
        .then ( () => {
            return Client.findAll();
        })
        .then(clients => {
            if( !clients || Object.keys(clients).length == 0) {
                return Client.bulkCreate([
                    {congomen: 'Kowalski', name: 'Jan', company: 'Kowal Sklep'},
                    {congomen: 'Nowak', name: 'Piotr', company: 'PiotrPOL'},
                    {congomen: 'Lewandowski', name: 'Paweł', company: 'Paweł Sklep'},
                ])
                .then( ()=> {
                    return Client.findAll();
                });
            } else {
                return clients;
            }
        })
        .then( clients => {
            allClients = clients;
            return Supplier.findAll();
        })
        .then(supps => {
            if( !supps || Object.keys(supps).length == 0) {
                return Supplier.bulkCreate([
                    {name: 'Jan', email: 'Jan.dostawy@gmail.com'},
                    {name: 'Piotr', email: 'Piotr.dostawy@gmail.com'},
                    {name: 'Paweł', email: 'Paweł.dostawy@gmail.com'}
                ])
                .then( ()=> {
                    return Client.findAll();
                });
            } else {
                return supps;
            }
        })
        .then( supps => {
            allSupps = supps;
            return Order.findAll();
        })
        .then(orders => {
            if( !orders || Object.keys(orders).length == 0) {
                return Order.bulkCreate([
                    {client_id: allClients[0].id, supplier_id: allSupps[0].id, order_date: '2020-01-01', delivery_date: '2022-01-01'},
                    {client_id: allClients[1].id, supplier_id: allSupps[1].id, order_date: '2021-01-01', delivery_date: '2022-02-02'},
                    {client_id: allClients[1].id, supplier_id: allSupps[1].id, order_date: '2020-01-01', delivery_date: '2022-02-02'}
                ]);
            } else {
                return orders;
            }
        });
};