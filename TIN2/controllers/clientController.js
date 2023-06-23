const ClientRepository = require('../repository/sequelize/ClientRepository');

exports.showClientList = (req, res, next) => {
    ClientRepository.getClients()
        .then(myClients => {
            res.render('Pages/Client/list', {
                clients: myClients,
                navLocation: 'cli'
            });
        });
}
exports.showAddClientForm = (req, res, next) => {
    res.render('Pages/Client/form',{ 
        client: {},
        pageTitle: 'Nowy klient',
        formMode: 'createNew',
        btnLabel: 'Dodaj klienta',
        formAction: '/clients/add',
        navLocation: 'cli',
        validationErrors: []
    });
}
exports.showEditClientForm = (req, res, next) => {
    const clientId = req.params.clientId;
    ClientRepository.getClientById(clientId)
        .then( myClient => {
            res.render('Pages/Client/form',{ 
                client: myClient,
                pageTitle: 'Edycja klienta',
                formMode: 'edit',
                btnLabel: 'Edytuj klienta',
                formAction: '/clients/edit',
                navLocation: 'cli',
                validationErrors: []
        });
    });
}
exports.showClientDetails = (req, res, next) => {
    const clientId = req.params.clientId;
    ClientRepository.getClientById(clientId)
        .then( myClient => {
            res.render('Pages/Client/form', {
                client: myClient,
                formMode: 'showDetails',
                pageTitle: 'Szczegóły klienta',
                formAction: '',
                navLocation: 'cli',
                validationErrors: []
            });
        });
}

exports.addClient = (req,res,next) => {
    const clientData = { ...req.body };
ClientRepository.createClient(clientData)
    .then( result => {
        res.redirect('/clients');
    })
    .catch(err => {
        res.render('pages/client/form', {
            client: clientData,
            pageTitle: 'Dodawanie klienta',
            formMode: 'createNew',
            btnLabel: 'Dodaj klienta',
            formAction: '/clients/add',
            navLocation: 'cli',
            validationErrors: err.errors
        });
    });
};


exports.updateClient = (req,res,next) => {
    const clientId = req.body.id;
    const clientData = { ...req.body };
    let error=[];

    ClientRepository.updateClient(clientId, clientData)
    .then(result => {
        res.redirect('/clients');
    })
    .catch(err => {
        err.errors.forEach(e => {
            if (e.path.includes('email') && e.type == 'unique violation')  {
                e.message = "Podany adres email jest już używany";
            }
        });
        error = err
        return ClientRepository.getClientById(clientId)
    }).then(myClient => {
        res.render('pages/client/form', {
            client: myClient,
            pageTitle: 'Edycja klienta',
            formMode: 'edit',
            btnLabel: 'Edytuj klienta',
            formAction: '/clients/edit',
            navLocation: 'cli',
            validationErrors: error.errors
        })
    });
};

exports.deleteClient = (req,res,next) => {
    const clientId = req.params.clientId;
    ClientRepository.deleteClient(clientId)
        .then( () => {
            res.redirect('/clients');
        })
};
