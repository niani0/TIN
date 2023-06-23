const Client = require ("../../model/sequelize/Client");
const Order = require ("../../model/sequelize/Order");
const Supplier = require ("../../model/sequelize/Supplier");

exports.getSuppliers = () => {
    return Supplier.findAll();
};

exports.getSupplierById = (suppId) => {
    return Supplier.findByPk(suppId,
        {
            include: [{
                model: Order,
                as: 'orders',
                include: [{
                    model: Client,
                    as: 'client'
                }]
            }]
        })
};

exports.createSupplier = (newSuppData) => {
    return Supplier.create({
        name: newSuppData.name,
        email: newSuppData.email,
    });
};

exports.updateSupplier = (suppId, suppData) => {
    return Supplier.update(suppData, {where: {id: suppId}});
};

exports.deleteSupplier = (suppId) => {
    return Supplier.destroy({
        where: {id: suppId}
    });
};
