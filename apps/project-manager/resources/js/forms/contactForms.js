const contactForms = {
    name : {
        type: 'text',
        dataName: 'fullname',
        placeholder: 'Nouveau contact'
    },
    tabs: [
        {
            tabName: 'Informations du contact',
            type: 'form',
            fields: [
                {
                    name: 'Prénom',
                    dbName: 'firstname',
                    type: 'text'
                },
                {
                    name: 'Nom',
                    dbName: 'lastname',
                    type: 'text'
                },
                {
                    name: 'Société',
                    dbName: 'company',
                    type: 'text'
                },
                {
                    name: 'Agence',
                    dbName: 'agency',
                    type: 'text'
                },
                {
                    name: 'Poste',
                    dbName: 'position',
                    type: 'text'
                },
                {
                    name: 'Rôle',
                    dbName: 'role',
                    type: 'text',
                },
                {
                    name: 'Téléphone',
                    dbName: 'phone',
                    type: 'text'
                },
                {
                    name: 'Email',
                    dbName: 'mail',
                    type: 'text'
                },
                {
                    name: 'Notes perso sur le contact',
                    dbName: 'notes',
                    type: 'textarea',
                },
            ]
        },
        {
            tabName: 'Projets',
            type: 'taglist',
            list: {
                placeholder: 'Rechercher un projet',
                dbName: 'project_tags',
                options: {
                    dbLabel: 'name'
                }
            }
        },
    ]
}

export default contactForms;
