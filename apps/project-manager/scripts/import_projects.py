import csv
import re
import json
from datetime import date

## CSV "Suivi_projets.csv" comes from export of BRIDGE24 which is synced to the Trello's data

output = []
stage = {
    'A venir': 'À venir',
    'En cours': 'En cours',
    'En attente': 'Créés',
    'Terminé': 'Terminés',
    'REX': 'Cloturés',
}

linesNumber = len(list(csv.reader(open('Suivi_projets.csv'), delimiter=';')))
i = 1

with open('Suivi_projets.csv') as csv_file:
    for project in csv.DictReader(csv_file, delimiter=';'):
        print('project ' + str(i) + ' over ' + str(linesNumber))
        i += 1

        nombreProjets = 0
        matchNP = re.match(r"\*\*Nombre de projets *: *(.+)\*\* * \n", project['Description'])
        if matchNP and project['Liste'] == 'A venir':
            if matchNP.group(1) != ' ':
                nombreProjets = int(matchNP.group(1))
            else:
                nombreProjets = 1
        else:
            nombreProjets = 1

        responseformat = ''
        matchRF = re.match(r"\*\*DPGF ou devis et sur quel lot *:\*\* *(.+)\n", project['Description'])
        if matchRF:
            responseformat = matchRF.group(1)
        else:
            responseformat = ''

        clientExpectations = ''
        matchCE = re.match(r"\*\*Attentes du client *:\*\* *([^\*\*]*)\*{2}", project['Description'])
        if matchCE:
            clientExpectations = matchCE.group(1)
        else:
            clientExpectations = ''

        formerWorking = ''
        matchFW = re.match(r"\*\*Ancien fonctionnement *:\*\* *([^\*\*]*)\*{2}", project['Description'])
        if matchFW:
            formerWorking = matchFW.group(1)
        else:
            formerWorking = ''

        priorityBatch = ''
        matchPB = re.match(r"\*\*Lot prioritaire *:\*\* *([^\*\*]*)\*{2}", project['Description'])
        if matchPB:
            priorityBatch = matchPB.group(1)
        else:
            priorityBatch = ''

        batchToCome = ''
        matchBTC = re.match(r"\*\*Lot à venir *:\*\* *([^\*\*]*)\*{2}", project['Description'])
        if matchBTC:
            batchToCome = matchBTC.group(1)
        else:
            batchToCome = ''

        for i in range(nombreProjets):
            output.append({
                'name': project['Nom de la carte'],
                'stage': stage[project['Liste']],
                'clientName': project['NOM DU CLIENT'],
                'isFrameworkContract': False,
                'area': '',
                'responseFormat': responseformat,
                'clientExpectations': clientExpectations,
                'formerWorking': formerWorking,
                'canAddCompaniesOnBatch': True if re.search(
                    r"\*\*Possibilité d’ajouter les entreprises sur un autre lot *:\*\* *oui", project['Description'],
                    re.IGNORECASE) else False,
                'priorityBatch': priorityBatch,
                'batchToCome': batchToCome,
                'isOnOpenConsultation': False,
                'isAddableAutomaticallyOnOP': False,
                'nextStep': project['PROCHAINE ACTION'],
                'companiesNumber': project["NOMBRE D'ENTREPRISES CONSULTÉES"],
                'supportAction': project['ACTION CS'],
                'userSales': project['SALES'],
                'userCustomerManager': '',
                'userSupport': [],
                'dateStart': project['DATE DÉBUT AO'],
                'dateEnd': project['DATE FIN AO'],
                'dateNext': project['Échéance'],
                'checklist': {
                    'visio': True if re.search(r"\*\*Lot à venir :\*\* *([^\*\*]*)\*{2}",
                                               project['Checklists']) else False,
                    'dpgfReceived': True if re.search(r'DPGF reçu \(Complété\)', project['Checklists']) else False,
                    'dpgfSent': True if re.search(r'DPGF Envoyé / paramétré \(Complété\)',
                                                  project['Checklists']) else False,
                    'companiesList': True if re.search(r"Liste d'entreprise reçu \(Complété\)",
                                                       project['Checklists']) else False,
                    'companiesInvited': True if re.search(r'Invitations des entreprises \(Complété\)',
                                                          project['Checklists']) else False,
                    'mvSent': True if re.search(r'MV envoyé \(Complété\)', project['Checklists']) else False,
                    'formation50': True if re.search(r'Formation 50% \(Complété\)', project['Checklists']) else False,
                    'formation75': True if re.search(r'Formation 50% \(Complété\)', project['Checklists']) else False,
                    'formation100': True if re.search(r'Formation 100% \(Complété\)', project['Checklists']) else False,
                    'statusHalf': True if re.search(r'Point mi-projet \(Complété\)', project['Checklists']) else False,
                    'statusEnd': True if re.search(r'Point fin-projet \(Complété\)', project['Checklists']) else False,
                    'mailSent': True if re.search(r'Mail type envoyé \(Complété\)', project['Checklists']) else False,
                },
                'contacts': [],
                'comments': [{
                    'author': "import",
                    'date': date.today().strftime("%d/%m/%Y"),
                    'message': project['Commentaires']
                }],
                'screenshot': {
                    'uploadDate': '',
                    'format': '',
                    'base64': '',
                },
            })

with open('projects.json', 'w') as outfile:
    json.dump(output, outfile)

## SEND THE DATA TO THE REPLICASET RS0 CONFIGURED WITH KUBEFWD IN LENS
from pymongo import MongoClient

# connection = MongoClient("mongo:27017", replicaSet='rs0')
# db = connection['aosforce-app']
# collection = db['projects']
# collection.insert_many(output)

connection = MongoClient("localhost:27017")
db = connection['project-manager']
collection = db['projects']
collection.insert_many(output)
