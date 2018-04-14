// import utilService from './util.service.js'

import storageService from './storage.service.js'
import utilService from './util.service.js'
import LoremIpsum from './loremIpsum.js'
import eventBus, { USR_MSG_DISPLAY, EMAIL_READ } from './event-bus.service.js'


const EMAILS_KEY = 'emailAppKey';
var emailsDB = [];

function query(filter = null) {
    return storageService.load(EMAILS_KEY)
        .then(emails => {
            if (!emails) {
                emails = generateEmails();
                storageService.store(EMAILS_KEY, emails);
            }
            eventBus.$emit(EMAIL_READ, {read:countReadEmails(emails),all:emails.length});
            if (filter === null) return emails;
            else return emails.filter(email => {
                            var isInText = (filter.text === '' || email.subject.includes(filter.text) ||
                            email.body.includes(filter.text)); 
                            var isInStatus = (filter.emailStatus === 'All' || 
                            (email.isRead && filter.emailStatus === 'Read') ||
                            (!email.isRead && filter.emailStatus === 'Unread'));
                            return isInText && isInStatus;
            })
        })
}

function generateEmails() {
    var emails = []
    for (let index = 0; index < 8; index++) {
        var email = createEmail()
        emails.push(email)
    }
    return emails;
}

function countReadEmails(emails){
    var cntRead = 0;
    if (emails) emails.forEach(email => {if (email.isRead) cntRead++});
    return cntRead; 
}

function createEmail(email){
    var loremIpsum = new LoremIpsum();
    var email = {
        id: utilService.getRandomString(11),
        name: loremIpsum.generate(utilService.getRandomInt(1, 3), utilService.getRandomInt(3, 6)),
        subject: (email ? email.subject : loremIpsum.generate(utilService.getRandomInt(1, 5), utilService.getRandomInt(3, 6))),
        body: (email ? email.body : loremIpsum.generate(utilService.getRandomInt(5, 500), utilService.getRandomInt(3, 6))),
        isRead: Math.random() > 0.5,
        sentAt: moment().format('L')
    }
    return email;
}

function getEmailById(emailId) {
    return storageService.load(EMAILS_KEY)
        .then(emails => {
            return (emails ? emails.find(email => email.id === emailId) : '');
        })
}

function deleteEmail(emailId) {
    return storageService.load(EMAILS_KEY)
        .then(emails => {
            var emailIdx = emails.findIndex(email => email.id === emailId);
            emails.splice(emailIdx, 1);
            eventBus.$emit(EMAIL_READ, {read:countReadEmails(emails),all:emails.length});
            return storageService.store(EMAILS_KEY, emails);
    })
}

function setRead(emailId){
    if (emailId){
        return storageService.load(EMAILS_KEY)
            .then(emails => {
                var emailIdx = emails.findIndex(email => email.id === emailId);
                if (emailIdx != -1 && !emails[emailIdx].isRead){
                    emails[emailIdx].isRead = true;
                    storageService.store(EMAILS_KEY, emails);
                    eventBus.$emit(EMAIL_READ, {read:countReadEmails(emails),all:emails.length});
                }
                return storageService.store(EMAILS_KEY, emails);
        }) 
    }
}

function sendEmail(email) {
    return storageService.load(EMAILS_KEY)
        .then(emails => {
            emails.unshift(createEmail(email))
            eventBus.$emit(EMAIL_READ, {read:countReadEmails(emails),all:emails.length});
            return storageService.store(EMAILS_KEY, emails)
    })
}

export default {
    query,
    getEmailById,
    deleteEmail,
    setRead,
    sendEmail,
    countReadEmails
}

