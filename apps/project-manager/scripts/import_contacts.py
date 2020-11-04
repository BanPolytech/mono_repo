import csv
import re
import requests
import json

output = []
urlHubspotApi = "https://api.hubapi.com/contacts/v1/contact/email/"
HubspotApiKey = '07048469-69d1-4944-bb50-b6d829eb5fdb'

linesNumber = len(list(csv.reader(open('contacts_export.csv'), delimiter=';')))
i = 1

with open('contacts_export.csv') as csv_file:
    for contact in csv.reader(csv_file, delimiter=';'):
        print('contact ' + str(i) + ' over ' + str(linesNumber))
        i += 1

        phone = ''
        matchPhone = re.match(r"Mobile : (.+) \| Téléphone : (.+)", contact[7])
        if matchPhone:
            if matchPhone.group(1) and matchPhone.group(1) != 'null':
                phone = matchPhone.group(1)
            elif matchPhone.group(2) and matchPhone.group(1) != 'null':
                phone = matchPhone.group(2)
        else:
            phone = ''

        url = urlHubspotApi + contact[6] + '/profile?hapikey=' + HubspotApiKey
        r = requests.get(url=url)

        data = r.json()

        company = ''
        position = ''

        if 'properties' in data:
            if 'company' in data['properties']:
                company = data['properties']['company']['value']
            else:
                company = ''

            position = ''
            if 'jobtitle' in data['properties']:
                position = data['properties']['jobtitle']['value']
            else:
                position = ''

        output.append({
            'firstname': contact[0],
            'lastname': contact[1],
            'company': company,
            'agency': '',
            'position': position,
            'role': '',
            'phone': phone,
            'mail': contact[6],
            'notes': '',
            'projects': [],
        })

with open('contacts.json', 'w') as outfile:
    json.dump(output, outfile)

## SEND THE DATA TO THE REPLICASET RS0 CONFIGURED WITH KUBEFWD IN LENS
from pymongo import MongoClient

connection = MongoClient("mongo:27017", replicaSet='rs0')
db = connection['aosforce-app']
collection = db['contacts']
collection.insert_many(output)

# connection = MongoClient("localhost:27017")
# db = connection['project-manager']
# collection = db['contacts']
# collection.insert_many(output)
