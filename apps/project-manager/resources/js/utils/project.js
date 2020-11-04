export const addRolesToSelect = (projectForms, roles) => {
    const projectFields = projectForms.tabs;
    for (let i = 0; i < projectFields.length; i++) {
        if (projectFields[i].tabName === 'Informations du projet') {
            for (let j = 0; j < projectFields[i].fields.length; j++) {
                if (projectFields[i].fields[j].dbName === 'userCustomerManager') {
                    for (let k = 0; k < roles.length; k++) {
                        if (roles[k].name === 'manager')
                        projectFields[i].fields[j].items = roles[k].users;
                    }
                }
                if (projectFields[i].fields[j].dbName === 'userSupport') {
                    for (let k = 0; k < roles.length; k++) {
                        if (roles[k].name === 'support')
                        projectFields[i].fields[j].items = roles[k].users;
                    }
                }
                if (projectFields[i].fields[j].dbName === 'userSales') {
                    for (let k = 0; k < roles.length; k++) {
                        if (roles[k].name === 'sales')
                        projectFields[i].fields[j].items = roles[k].users;
                    }
                }
            }
        }
    }
    projectForms.tabs = projectFields;
    return projectForms;
}
