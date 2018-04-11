// import utilService from './util.service.js'

import storageService from './storage.service.js'
import utilService from './util.service.js'
import LoremIpsum from './loremIpsum.js'
import eventBus, { USR_MSG_DISPLAY } from './event-bus.service.js'


const EMAILS_KEY = 'emailAppKey';
var emailsDB = [];

function query(filter = null) {
    return storageService.load(EMAILS_KEY)
        .then(emails => {
            if (!emails) {
                emails = generateEmails();
                storageService.store(EMAILS_KEY, emails);
            }
            if (filter === null) return emails;
            else return emails.filter(email => email.vendor.includes(filter.byVendor))
        })
}

function generateEmails() {
    var emails = []
    for (let index = 0; index < 10; index++) {
        var email = createEmail()
        emails.push(email)
    }
    return emails;
}

function createEmail(){
    var loremIpsum = new LoremIpsum();
    var email = {
        id: utilService.getRandomString(11),
        name: loremIpsum.generate(utilService.getRandomInt(1, 3), utilService.getRandomInt(3, 6)),
        email: "john.smith@john.smith.com",
        subject: loremIpsum.generate(utilService.getRandomInt(1, 5), utilService.getRandomInt(3, 6)),
        body: loremIpsum.generate(utilService.getRandomInt(5, 50), utilService.getRandomInt(3, 6))
    }
    return email;
}

function getById(emailId) {
    return storageService.load(EMAILS_KEY)
        .then(emails => {
            return emails.find(email => email.id === emailId);
        })
}

function deleteEmail(emailId) {
    return storageService.load(EMAILS_KEY)
        .then(emails => {
            var emailIdx = emails.findIndex(email => email.id === emailId);
            emails.splice(emailIdx, 1);
            return storageService.store(EMAILS_KEY, emails);
        })
}


function saveEmail(email) {
    return storageService.load(EMAILS_KEY)
        .then(emails => {
            if (email.id) {
                var emailIdx = emails.findIndex(curremail => curremail.id === email.id)
                emails.splice(emailIdx, 1, email);
            } else {
                email.id = Date.now();
                emails.push(email);
            }
            return storageService.store(EMAILS_KEY, emails);
        });
}

export default {
    query,
    getById,
    deleteEmail,
    saveEmail
}
