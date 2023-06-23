const Client = require ("../../model/sequelize/Client");
const Order = require ("../../model/sequelize/Order");
const Supplier = require ("../../model/sequelize/Supplier");

exports.getClients = () => {
    return Client.findAll();
};

exports.getClientById = (clientId) => {
    return Client.findByPk(clientId,
        {
            include: [{
                model: Order,
                as: 'orders',
                include: [{
                    model: Supplier,
                    as: 'supplier'
                }]
            }]
        })
};

exports.createClient = (newClientData) => {
    return Client.create({
        name: newClientData.name,
        congomen: newClientData.congomen,
        company: newClientData.company
    });
};

exports.updateClient = (clientId, clientData) => {
    return Client.update(clientData, {where: {id: clientId}});
};

exports.deleteClient = (clientId) => {

    return Client.destroy({
        where: {id: clientId}
    });
};
