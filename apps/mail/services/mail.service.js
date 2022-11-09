import { utilService } from '../../../util.service.js'
import { storageService } from '../../../async-storage.service.js'

const MAIL_KEY = 'mailDB'
_createMails()

export const mailService = {
    query,
    get,
    remove,
    save,
    getEmptyMail,
    getNextMailId
}

function query() {
    return storageService.query(MAIL_KEY)
}

function get(mailId){
    return storageService.get(MAIL_KEY, mailId)
}

function remove(mailId) {
    return storageService.remove(MAIL_KEY, mailId)
}

function save(mail) {
    if(mail.id){
        return storageService.put(MAIL_KEY, mail)
    } else {
        return storageService.post(MAIL_KEY, mail)
    }
}

function getEmptyMail(title='', to = 0) {
    return { id: '', title, to}
}


function getNextMailId(mailId) {
    return storageService.query(MAIL_KEY)
        .then(mails =>{
            var idx  = mails.findIndex(mail => mail.id === mailId)
            if (idx === mails.length-1) idx = -1
            return mails[idx+1].id
        })
}

function _createMails() {
    let mails = utilService.loadFromStorage(MAIL_KEY)
    if (!mails || !mails.length) {
        mails = []
        mails.push(_createMail('Audu Mea', 300))
        mails.push(_createMail('Fiak Ibasa', 120))
        mails.push(_createMail('Subali Pesha', 100))
        mails.push(_createMail('Mitsu Bashi', 150))
        utilService.saveToStorage(MAIL_KEY, mails)
    }
    return mails
}

function _createMail(title, to = 250) {
    const mail = getEmptyMail(title, to)
    mail.id = utilService.makeId() 
    return mail
}
