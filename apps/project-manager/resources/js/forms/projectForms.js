const projectForms = {
    name : {
        type: 'form',
        field: {
            dbName: 'name',
            type: 'text',
            placeholder: 'Nouveau Projet',
        }
    },
    tabs: [
        {
            tabName: 'Informations du projet',
            type: 'form',
            fields: [
                {
                    name: 'Phase',
                    dbName: 'stage',
                    type: 'select',
                    items: [
                        'À venir (2022)',
                        'À venir (2021)',
                        'À venir',
                        'Créés',
                        'En cours',
                        'Terminés',
                        'Cloturés',
                    ]
                },
                {
                    name: 'Contrat Cadre',
                    dbName: 'isFrameworkContract',
                    type: 'boolean',
                },
                {
                    name: 'Client',
                    dbName: 'client_name',
                    type: 'text',
                    apiGet: {
                        route: '/api/v1/clients',
                        idToAdd: ''
                    },
                    apiPost: {
                        route: '/api/v1/clients',
                    },
                    fields: ['name'],
                    mainField: 'name',
                    dialogText: {
                        'title': "Ajouter un nouveau client",
                        'content': "Vous ne trouvez pas le client ? Ajoutez le !"
                    }
                },
                {
                    name: 'Agence',
                    dbName: 'agency_name',
                    type: 'text',
                    apiGet: {
                        route: '/api/v1/clients',
                        idToAdd: 'agency_id'
                    },
                    apiPost: {
                        route: '/api/v1/agencies',
                    },
                    fields: ['name'],
                    mainField: 'name',
                    dialogText: {
                        'title': "Ajouter une nouvelle agence",
                        'content': "Vous ne trouvez pas l'agence ? Ajoutez la !"
                    }
                },
                {
                    name: 'Format de réponse',
                    dbName: 'responseFormat',
                    type: 'text'
                },
                {
                    name: 'Attentes client',
                    dbName: 'clientExpectations',
                    type: 'textarea'
                },
                {
                    name: 'Ancien fonctionnement',
                    dbName: 'formerWorking',
                    type: 'text'
                },
                {
                    name: 'Ajout des entreprises sur un autre lot',
                    dbName: 'canAddCompaniesOnBatch',
                    type: 'boolean',
                },
                {
                    name: 'Lot prioritaire',
                    dbName: 'priorityBatch',
                    type: 'text'
                },
                {
                    name: 'Lot à venir',
                    dbName: 'batchToCome',
                    type: 'text'
                },
                {
                    name: 'Consultation ouverte',
                    dbName: 'isOnOpenConsultation',
                    type: 'boolean',
                },
                {
                    name: 'Ajout automatique sur CO',
                    dbName: 'isAddableAutomaticallyOnOP',
                    type: 'boolean',
                },
                {
                    name: 'Prochaine action',
                    dbName: 'nextStep',
                    type: 'text'
                },
                {
                    name: 'Nombre entreprise',
                    dbName: 'companiesNumber',
                    type: 'number',
                },
                {
                    name: 'Action support',
                    dbName: 'supportAction',
                    type: 'text'
                },
                {
                    name: 'Sales',
                    dbName: 'userSales',
                    type: 'select',
                    items: [],
                },
                {
                    name: 'Ops',
                    dbName: 'userCustomerManager',
                    type: 'select',
                    items: [],
                },
                {
                    name: 'Support',
                    dbName: 'userSupport',
                    type: 'selectMultiple',
                    items: [],
                },
                {
                    name: 'Date de début',
                    dbName: 'dateStart',
                    type: 'date',
                },
                {
                    name: 'Date de fin',
                    dbName: 'dateEnd',
                    type: 'date',
                },
                {
                    name: 'Date prochaine action',
                    dbName: 'dateNext',
                    type: 'date',
                }
            ]
        },
        {
            tabName: 'Checklist',
            type: 'checklist',
            list: [
                {
                    label: 'Visio',
                    dbName: 'visio',
                },
                {
                    label: 'DPGF reçu',
                    dbName: 'dpgfReceived',
                },
                {
                    label: 'DPGF envoyé',
                    dbName: 'dpgfSent',
                },
                {
                    label: 'Liste d\'entreprises reçu',
                    dbName: 'companiesList',
                },
                {
                    label: 'Invitation des entreprises',
                    dbName: 'companiesInvited'
                },
                {
                    label: 'MV envoyé',
                    dbName: 'mvSent',
                },
                {
                    label: 'Formation 50%',
                    dbName: 'formation50',
                },
                {
                    label: 'Formation 75%',
                    dbName: 'formation75',
                },
                {
                    label: 'Formation 100%',
                    dbName: 'formation100',
                },
                {
                    label: 'Point mi-projet',
                    dbName: 'statusHalf',
                },
                {
                    label: 'Point fin de projet',
                    dbName: 'statusEnd',
                },
                {
                    label: 'Mail type envoyé',
                    dbName: 'mailSent',
                },
            ]
        },
        {
            tabName: 'Contacts',
            type: 'taglist',
            list: {
                placeholder: 'Rechercher un contact',
                dbName: 'contact_tags',
                options: {
                    dbLabel: 'fullName'
                }
            }
        },
        {
            tabName: 'Commentaires',
            type: 'comments',
            form: {
                type: 'textarea',
                placeholder: 'Rédiger un commentaire',
            },
            list: {
                dbName: 'comments'
            }
        },
        {
            tabName: 'Pièce jointe',
            type: 'image',
            placeholder: 'Ajouter une pièce jointe',
            dbName: 'screenshot',
        },
        {
            tabName: 'Service accompagnement',
            type: 'hours',
            list: [
                {
                    name: 'Formation',
                    dbName: 'formation',
                },
                {
                    name: 'Support',
                    dbName: 'support',
                },
                {
                    name: 'DPGF',
                    dbName: 'dpgf',
                },
                {
                    name: "Ajout d'entreprises",
                    dbName: 'addCompanies',
                },
                {
                    name: 'Consultation ouverte',
                    dbName: 'consultation',
                },
                {
                    name: 'Appels spécifiques',
                    dbName: 'specials',
                },
                {
                    name: 'Recherche de nouvelles entreprises',
                    dbName: 'searchCompanies',
                },
                {
                    name: 'Paramétrage projet',
                    dbName: 'settingsProject',
                },
                {
                    name: 'Paramétrage ratios',
                    dbName: 'settingsRatios',
                },
            ]
        }
    ]
}

export default projectForms;
