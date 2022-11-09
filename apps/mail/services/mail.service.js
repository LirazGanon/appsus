import { utilService } from '../../../services/util.service.js'
import { storageService } from '../../../services/async-storage.service.js'

const MAIL_KEY = 'mailDB'

const loggedInUser = {
    email: 'lirazganon@gmail.com',
    fullName: 'Liraz Ganon'
}

const defaultMails = _getDefaultMails()

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

function get(mailId) {
    return storageService.get(MAIL_KEY, mailId)
}

function remove(mailId) {
    return storageService.remove(MAIL_KEY, mailId)
}

function save(mail) {
    if (mail.id) {
        return storageService.put(MAIL_KEY, mail)
    } else {
        return storageService.post(MAIL_KEY, mail)
    }
}

function getEmptyMail() {
    return {
        id: '',
        subject: '',
        body: '',
        isRead: false,
        sentAt: '',
        from: 'your-mail@someting.com',
        to: 'recived-mail@someting.com'
    }
}


function getNextMailId(mailId) {
    return storageService.query(MAIL_KEY)
        .then(mails => {
            var idx = mails.findIndex(mail => mail.id === mailId)
            if (idx === mails.length - 1) idx = -1
            return mails[idx + 1].id
        })
}

function _createMails() {
    let mails = query()
    if (!mails || !mails.length) {
        mails = defaultMails
        utilService.saveToStorage(MAIL_KEY, mails)
    }
    return mails
}

function _getDefaultMails() {
    return [
        {
            id: utilService.makeId(),
            subject: 'Shir Musery replied to your comment',
            body: 'Thanks for your support Liraz',
            isRead: false,
            sentAt: Date.now() - utilService.getRandomInt(0, 1000000),
            from: 'messages-noreply@linkedin.com',
            to: 'lirazganon@gmail.com'
        },
        {
            id: utilService.makeId(),
            subject: 'Yaniv Weinshtein RSVPed to Who\'s in Control? on Wed, November 16',
            body: '11 helpers are going to this Meetup',
            isRead: false,
            sentAt: Date.now() - utilService.getRandomInt(0, 1000000),
            from: 'info@meetup.com',
            to: 'lirazganon@gmail.com'
        },
        {
            id: utilService.makeId(),
            subject: 'The fastest way to get feedback on your code',
            body: `
        The best way to get feedback.\n
        Quick, quality feedback is one of the key ingredients of top-performing teams.\n
        With CodeSandbox, you get a live development environment for every PR. Besides shortening the code review cycle, this makes it easier than ever to get feedback from designers, managers and marketers\n `,
            isRead: false,
            sentAt: Date.now() - utilService.getRandomInt(0, 1000000),
            from: 'info@meetup.com',
            to: 'lirazganon@gmail.com'
        },


    ]
}

