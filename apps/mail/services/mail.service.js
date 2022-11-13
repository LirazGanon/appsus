import { utilService } from '../../../services/util.service.js'
import { storageService } from '../../../services/async-storage.service.js'

const MAIL_KEY = 'mailDB'

const loggedInUser = {
    email: 'liraz@gmail.com',
    fullName: 'Liraz Ganon'
}

_createMails()

export const mailService = {
    query,
    get,
    remove,
    save,
    getEmptyMail,
    getNextMailId,
    getPrevMailId
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
        return storageService.post(MAIL_KEY, mail, false)
    }
}


function getNextMailId(mailId) {
    return storageService.query(MAIL_KEY)
        .then(mails => {
            var idx = mails.findIndex(mail => mail.id === mailId)
            if (idx === mails.length - 1) idx = -1
            return { nextId: mails[idx + 1].id, idx, mailLength: mails.length }
        })
}

function getPrevMailId(mailId) {
    return storageService.query(MAIL_KEY)
        .then(mails => {
            var idx = mails.findIndex(mail => mail.id === mailId)
            if (idx === 0) return null
            return mails[idx - 1].id
        })
}

function _createMails() {
    let mails = utilService.loadFromStorage(MAIL_KEY)
    if (!mails || !mails.length) {
        mails = _getDefaultMails()
        mails.sort((a, b) => b.sentAt - a.sentAt)
        utilService.saveToStorage(MAIL_KEY, mails)
    }
    return mails
}

function getEmptyMail() {
    return {
        id: '',
        subject: '',
        body: '',
        isRead: false,
        sentAt: Date.now(),
        from: 'your-mail@someting.com',
        to: '',
        type: 'Social',
        IsStarred: false
    }
}

function _getDefaultMails() {
    return [
        {
            id: utilService.makeId(),
            subject: 'Shir Musery replied to your comment',
            body: 'Thanks for your support Liraz',
            isRead: false,
            sentAt: Date.now() - utilService.getRandomInt(0, 200000000),
            from: 'messages-noreply@linkedin.com',
            to: 'liraz@gmail.com',
            type: 'Social',
            IsStarred: true,
            isTrash: false,
        },
        {
            id: utilService.makeId(),
            subject: 'Yaniv Weinshtein RSVPed to Who\'s in Control? on Wed, November 16',
            body: '11 helpers are going to this Meetup',
            isRead: false,
            sentAt: Date.now() - utilService.getRandomInt(0, 200000000),
            from: 'info@meetup.com',
            to: 'liraz@gmail.com',
            type: 'Promotion',
            IsStarred: true,
            isTrash: false,
        },
        {
            id: utilService.makeId(),
            subject: 'The fastest way to get feedback on your code',
            body: `The best way to get feedback.
            Quick, quality feedback is one of the key ingredients of top-performing teams.
            With CodeSandbox, you get a live development environment for every PR. Besides shortening the code review cycle, this makes it easier than ever to get feedback from designers, managers and marketers`,
            isRead: true,
            sentAt: Date.now() - utilService.getRandomInt(0, 200000000),
            from: 'CodeSandbox@meetup.com',
            to: 'liraz@gmail.com',
            type: 'Promotion',
            IsStarred: true,
            isTrash: false,
        },
        {
            id: utilService.makeId(),
            subject: 'Your logo is ready for download',
            body: `Your logo is waiting!
            Hi Liraz,
            
            Thank you for using BrandCrowd to create your logo.
            
            We've saved a copy of your logo within your account. To complete downloading your logo click here.`,
            isRead: true,
            sentAt: Date.now() - utilService.getRandomInt(0, 200000000),
            from: 'brandcrowd@hello.brandcrowd.com',
            to: 'liraz@gmail.com',
            type: 'Promotion',
            IsStarred: true,
            isTrash: false,
        },
        {
            id: utilService.makeId(),
            subject: 'Liraz, subscribers like you get better deals',
            body: `Please do not reply to this email as we cannot read or reply to your contact.	
            Important information: The up to 15% discount is valid from 09/11/2022 00:00 (GMT) to 10/11/2022 23:59 (GMT). Valid on pick-ups between 09/11/2022 and 28/02/2023. Terms and conditions apply. *Denotes a discount of up to and including 15%. Discounts may vary depending on product restrictions. If no discount is displayed there is none available for that selected rental. Discounts will be visible within the rental details section of your search results. This offer cannot be used in conjunction with any other offer or existing bookings. Offers are subject to availability and may be subject to change or withdrawn without prior notification.	
            Full Sale terms and conditions can be found here.	
            You can unsubscribe from the car hire marketing database at any time by clicking here.`,
            isRead: false,
            sentAt: Date.now() - utilService.getRandomInt(0, 200000000),
            from: 'arguscarhire@email.arguscarhire.com',
            to: 'liraz@gmail.com',
            type: 'Social',
            IsStarred: true,
            isTrash: true,
        },
        {
            id: utilService.makeId(),
            subject: 'Atlas Search Webinar',
            body: `Hi Liraz,

            Join us on Wednesday November 16th for our Intro to Atlas Search webinar. We’ll search through different data types, including text, numbers, dates, and geoJSON while exploring a variety of search capabilities to learn how you can work with a single API when building on MongoDB Atlas Search.
            
            Don’t miss the chance to learn about Atlas Search and get your questions answered with live-coded solutions!`,
            isRead: false,
            sentAt: Date.now() - utilService.getRandomInt(0, 200000000),
            from: 'mongodbteam@mongodb.com',
            to: 'liraz@gmail.com',
            type: 'Promotion',
            IsStarred: false,
            isTrash: true,
        },
        {
            id: utilService.makeId(),
            subject: 'Huge chunks of Nutella = very delicious cookies.',
            body: `I know I have a bunch of cookie recipes on my site, but it is fun to mix things up every now and then, and these malted nutella cookies are the perfect example of this. 
 
            They have a malted chocolate chip cookie base, and are filled with melty pockets of nutella and chocolate. A dream, if you ask me.`,
            isRead: false,
            sentAt: Date.now() - utilService.getRandomInt(0, 200000000),
            from: 'erin@cloudykitchen.com',
            to: 'liraz@gmail.com',
            type: 'Promotion',
            IsStarred: false,
            isTrash: false,
        },
        {
            id: utilService.makeId(),
            subject: 'nimated Gradient Text, GSAP Stop Motion, and SVG Paper Art.',
            body: `Animated Gradient Text, GSAP Stop Motion, and SVG Paper Art
            This week's CodePen community highlights include a speedy CSS tip for creating animated gradient text from Jhey Tompkins, a stop animation demo powered by GSAP by huxhu, and a beautiful winter scene crafted from SVG in papercut style by Lia Tsernant.
            
            Plus, Greg Robleto shares all 31 Pens he created for #divtober, Ksenia Kondrashova creates text scenes in Three.js, and on our latest podcast, Chris & Dee get into the details of migrating a Ruby on Rails GraphQL API to a Go GraphQL API.`,
            isRead: true,
            sentAt: Date.now() - utilService.getRandomInt(0, 200000000),
            from: 'CodePen@cloudykitchen.com',
            to: 'liraz@gmail.com',
            type: 'Promotion',
            IsStarred: false,
            isTrash: false,
        },
        {
            id: utilService.makeId(),
            subject: 'Last chance to rock the Language Challenge Liraz Ganon, don\'t miss out!',
            body: `Hi Liraz Ganon,

            Can you achieve greatness in a short amount of time? 
            
            We often underestimate what we can achieve when we have limited time. You have 10 days, which is more than enough to improve. Your rewards are waiting—let’s finish strong! `,
            isRead: false,
            sentAt: Date.now() - utilService.getRandomInt(0, 20000000),
            from: 'linkedin@cloudykitchen.com',
            to: 'liraz@gmail.com',
            type: 'Social',
            IsStarred: false,
            isTrash: false,
        },
        {
            id: utilService.makeId(),
            subject: 'Recommended: IELTS Writing Section Skills Mastery',
            body: `Recommendations for you.
            We combed our catalog and found courses that we think match your interests. Browse our recommendations below, and start learning something new today!`,
            isRead: false,
            sentAt: Date.now() - utilService.getRandomInt(0, 200000000),
            from: 'linkedin@cloudykitchen.com',
            to: 'coursera@gmail.com',
            type: 'Promotion',
            IsStarred: false,
            isTrash: false,
        },
        {
            id: utilService.makeId(),
            subject: 'Welcome to Walmart!',
            body: `
            Let us do the shopping
            Let us do the shopping
            Our associates are trained to be picky! Order your grocery favorites and more, and we'll have your items ready for curbside pickup or delivery to your door.
            
                   Get the weekly scoop on hot items, great savings, and more.
            
            Subscribe
            We're here to help!
            Use the app to access these popular services
                    
            
            Questions? Visit our Help Center
            Twitter	Pinterest	Facebook	Youtube	Instagram
            Walmart protects your security and privacy. We will never ask for personal information (such as passwords or credit card numbers) in an email. If you receive such a request, please do not respond. Learn more about online safety and see our Privacy Policy.
            
            Please do not reply to this email. This mailbox is not monitored.
            
            © 2020 Walmart. All rights reserved.
            
            `,
            isRead: false,
            sentAt: Date.now() - utilService.getRandomInt(0, 200000000),
            from: 'walmart@walmart.com',
            to: 'liraz@gmail.com',
            type: 'Promotion',
            IsStarred: false,
            isTrash: false,
        },
        {
            id: utilService.makeId(),
            subject: 'Yaron and 56 others made changes in your shared folders',
            body: `follow specific folders and get focused updates
            Follow folders to get more detailed insights, reported instantly or once per day. Choose a folder to follow
            `,
            isRead: false,
            sentAt: Date.now() - utilService.getRandomInt(0, 200000000),
            from: 'dropbox@dropbox.com',
            to: 'liraz@gmail.com',
            type: 'Social',
            IsStarred: false,
            isTrash: false,
        },
        {
            id: utilService.makeId(),
            subject: 'Your logo is ready for download',
            body: `Your logo is waiting!
            Hi Liraz,
            
            Thank you for using BrandCrowd to create your logo.
            
            We've saved a copy of your logo within your account. To complete downloading your logo click here.`,
            isRead: true,
            sentAt: Date.now() - utilService.getRandomInt(0, 200000000),
            from: 'brandcrowd@hello.brandcrowd.com',
            to: 'liraz@gmail.com',
            type: 'Promotion',
            IsStarred: false,
            isTrash: false,
        },
        {
            id: utilService.makeId(),
            subject: 'Liraz, subscribers like you get better deals',
            body: `Please do not reply to this email as we cannot read or reply to your contact.	
            Important information: The up to 15% discount is valid from 09/11/2022 00:00 (GMT) to 10/11/2022 23:59 (GMT). Valid on pick-ups between 09/11/2022 and 28/02/2023. Terms and conditions apply. *Denotes a discount of up to and including 15%. Discounts may vary depending on product restrictions. If no discount is displayed there is none available for that selected rental. Discounts will be visible within the rental details section of your search results. This offer cannot be used in conjunction with any other offer or existing bookings. Offers are subject to availability and may be subject to change or withdrawn without prior notification.	
            Full Sale terms and conditions can be found here.	
            You can unsubscribe from the car hire marketing database at any time by clicking here.`,
            isRead: false,
            sentAt: Date.now() - utilService.getRandomInt(0, 20000000),
            from: 'arguscarhire@email.arguscarhire.com',
            to: 'liraz@gmail.com',
            type: 'Social',
            IsStarred: true,
            isTrash: true,
        },
        {
            id: utilService.makeId(),
            subject: 'Atlas Search Webinar',
            body: `Hi Liraz,

            Join us on Wednesday November 16th for our Intro to Atlas Search webinar. We’ll search through different data types, including text, numbers, dates, and geoJSON while exploring a variety of search capabilities to learn how you can work with a single API when building on MongoDB Atlas Search.
            
            Don’t miss the chance to learn about Atlas Search and get your questions answered with live-coded solutions!`,
            isRead: false,
            sentAt: Date.now() - utilService.getRandomInt(0, 200000000),
            from: 'mongodbteam@mongodb.com',
            to: 'liraz@gmail.com',
            type: 'Promotion',
            IsStarred: false,
            isTrash: false,
        },
        {
            id: utilService.makeId(),
            subject: 'Huge chunks of Nutella = very delicious cookies.',
            body: `I know I have a bunch of cookie recipes on my site, but it is fun to mix things up every now and then, and these malted nutella cookies are the perfect example of this. 
 
            They have a malted chocolate chip cookie base, and are filled with melty pockets of nutella and chocolate. A dream, if you ask me.`,
            isRead: false,
            sentAt: Date.now() - utilService.getRandomInt(0, 200000000),
            from: 'erin@cloudykitchen.com',
            to: 'liraz@gmail.com',
            type: 'Promotion',
            IsStarred: false,
            isTrash: false,
        },
        {
            id: utilService.makeId(),
            subject: 'nimated Gradient Text, GSAP Stop Motion, and SVG Paper Art.',
            body: `Animated Gradient Text, GSAP Stop Motion, and SVG Paper Art
            This week's CodePen community highlights include a speedy CSS tip for creating animated gradient text from Jhey Tompkins, a stop animation demo powered by GSAP by huxhu, and a beautiful winter scene crafted from SVG in papercut style by Lia Tsernant.
            
            Plus, Greg Robleto shares all 31 Pens he created for #divtober, Ksenia Kondrashova creates text scenes in Three.js, and on our latest podcast, Chris & Dee get into the details of migrating a Ruby on Rails GraphQL API to a Go GraphQL API.`,
            isRead: true,
            sentAt: Date.now() - utilService.getRandomInt(0, 200000000),
            from: 'CodePen@cloudykitchen.com',
            to: 'liraz@gmail.com',
            type: 'Promotion',
            IsStarred: false,
            isTrash: false,
        },
        {
            id: utilService.makeId(),
            subject: 'Last chance to rock the Language Challenge Liraz Ganon, don\'t miss out!',
            body: `Hi Liraz Ganon,

            Can you achieve greatness in a short amount of time? 
            
            We often underestimate what we can achieve when we have limited time. You have 10 days, which is more than enough to improve. Your rewards are waiting—let’s finish strong! `,
            isRead: false,
            sentAt: Date.now() - utilService.getRandomInt(0, 200000000),
            from: 'linkedin@cloudykitchen.com',
            to: 'liraz@gmail.com',
            type: 'Social',
            IsStarred: false,
            isTrash: false,
        },
        {
            id: utilService.makeId(),
            subject: 'Recommended: IELTS Writing Section Skills Mastery',
            body: `Recommendations for you.
            We combed our catalog and found courses that we think match your interests. Browse our recommendations below, and start learning something new today!`,
            isRead: false,
            sentAt: Date.now() - utilService.getRandomInt(0, 200000000),
            from: 'linkedin@cloudykitchen.com',
            to: 'coursera@gmail.com',
            type: 'Promotion',
            IsStarred: false,
            isTrash: false,
        },
        {
            id: utilService.makeId(),
            subject: 'Welcome to Walmart!',
            body: `
            Let us do the shopping
            Let us do the shopping
            Our associates are trained to be picky! Order your grocery favorites and more, and we'll have your items ready for curbside pickup or delivery to your door.
            
                   Get the weekly scoop on hot items, great savings, and more.
            
            Subscribe
            We're here to help!
            Use the app to access these popular services
                    
            
            Questions? Visit our Help Center
            Twitter	Pinterest	Facebook	Youtube	Instagram
            Walmart protects your security and privacy. We will never ask for personal information (such as passwords or credit card numbers) in an email. If you receive such a request, please do not respond. Learn more about online safety and see our Privacy Policy.
            
            Please do not reply to this email. This mailbox is not monitored.
            
            © 2020 Walmart. All rights reserved.
            
            `,
            isRead: false,
            sentAt: Date.now() - utilService.getRandomInt(0, 20000000),
            from: 'walmart@walmart.com',
            to: 'liraz@gmail.com',
            type: 'Promotion',
            IsStarred: false,
            isTrash: false,
        },
        {
            id: utilService.makeId(),
            subject: 'Yaron and 56 others made changes in your shared folders',
            body: `follow specific folders and get focused updates
            Follow folders to get more detailed insights, reported instantly or once per day. Choose a folder to follow
            `,
            isRead: false,
            sentAt: Date.now() - utilService.getRandomInt(0, 200000000),
            from: 'dropbox@dropbox.com',
            to: 'liraz@gmail.com',
            type: 'Social',
            IsStarred: false,
            isTrash: false,
        },

        {
            id: utilService.makeId(),
            subject: 'Shir Musery replied to your comment',
            body: 'Thanks for your support Liraz',
            isRead: false,
            sentAt: Date.now() - utilService.getRandomInt(0, 200000000),
            from: 'messages-noreply@linkedin.com',
            to: 'nadav@gmail.com',
            type: 'Social',
            IsStarred: false,
            isTrash: false,
        },
        {
            id: utilService.makeId(),
            subject: 'Yaniv Weinshtein RSVPed to Who\'s in Control? on Wed, November 16',
            body: '11 helpers are going to this Meetup',
            isRead: false,
            sentAt: Date.now() - utilService.getRandomInt(0, 200000000),
            from: 'info@meetup.com',
            to: 'nadav@gmail.com',
            type: 'Promotion',
            IsStarred: false,
            isTrash: false,
        },
        {
            id: utilService.makeId(),
            subject: 'The fastest way to get feedback on your code',
            body: `The best way to get feedback.
            Quick, quality feedback is one of the key ingredients of top-performing teams.
            With CodeSandbox, you get a live development environment for every PR. Besides shortening the code review cycle, this makes it easier than ever to get feedback from designers, managers and marketers`,
            isRead: true,
            sentAt: Date.now() - utilService.getRandomInt(0, 200000000),
            from: 'CodeSandbox@meetup.com',
            to: 'nadav@gmail.com',
            type: 'Promotion',
            IsStarred: false,
            isTrash: false,
        },
        {
            id: utilService.makeId(),
            subject: 'Your logo is ready for download',
            body: `Your logo is waiting!
            Hi Liraz,
            
            Thank you for using BrandCrowd to create your logo.
            
            We've saved a copy of your logo within your account. To complete downloading your logo click here.`,
            isRead: true,
            sentAt: Date.now() - utilService.getRandomInt(0, 200000000),
            from: 'brandcrowd@hello.brandcrowd.com',
            to: 'nadav@gmail.com',
            type: 'Promotion',
            IsStarred: false,
            isTrash: false,
        },
        {
            id: utilService.makeId(),
            subject: 'Liraz, subscribers like you get better deals',
            body: `Please do not reply to this email as we cannot read or reply to your contact.	
            Important information: The up to 15% discount is valid from 09/11/2022 00:00 (GMT) to 10/11/2022 23:59 (GMT). Valid on pick-ups between 09/11/2022 and 28/02/2023. Terms and conditions apply. *Denotes a discount of up to and including 15%. Discounts may vary depending on product restrictions. If no discount is displayed there is none available for that selected rental. Discounts will be visible within the rental details section of your search results. This offer cannot be used in conjunction with any other offer or existing bookings. Offers are subject to availability and may be subject to change or withdrawn without prior notification.	
            Full Sale terms and conditions can be found here.	
            You can unsubscribe from the car hire marketing database at any time by clicking here.`,
            isRead: false,
            sentAt: Date.now() - utilService.getRandomInt(0, 20000000),
            from: 'arguscarhire@email.arguscarhire.com',
            to: 'nadav@gmail.com',
            type: 'Social',
            IsStarred: true,
            isTrash: true,
        },
        {
            id: utilService.makeId(),
            subject: 'Atlas Search Webinar',
            body: `Hi Liraz,

            Join us on Wednesday November 16th for our Intro to Atlas Search webinar. We’ll search through different data types, including text, numbers, dates, and geoJSON while exploring a variety of search capabilities to learn how you can work with a single API when building on MongoDB Atlas Search.
            
            Don’t miss the chance to learn about Atlas Search and get your questions answered with live-coded solutions!`,
            isRead: false,
            sentAt: Date.now() - utilService.getRandomInt(0, 200000000),
            from: 'mongodbteam@mongodb.com',
            to: 'nadav@gmail.com',
            type: 'Promotion',
            IsStarred: false,
            isTrash: false,
        },
        {
            id: utilService.makeId(),
            subject: 'Huge chunks of Nutella = very delicious cookies.',
            body: `I know I have a bunch of cookie recipes on my site, but it is fun to mix things up every now and then, and these malted nutella cookies are the perfect example of this. 
 
            They have a malted chocolate chip cookie base, and are filled with melty pockets of nutella and chocolate. A dream, if you ask me.`,
            isRead: false,
            sentAt: Date.now() - utilService.getRandomInt(0, 200000000),
            from: 'erin@cloudykitchen.com',
            to: 'nadav@gmail.com',
            type: 'Promotion',
            IsStarred: false,
            isTrash: false,
        },
        {
            id: utilService.makeId(),
            subject: 'nimated Gradient Text, GSAP Stop Motion, and SVG Paper Art.',
            body: `Animated Gradient Text, GSAP Stop Motion, and SVG Paper Art
            This week's CodePen community highlights include a speedy CSS tip for creating animated gradient text from Jhey Tompkins, a stop animation demo powered by GSAP by huxhu, and a beautiful winter scene crafted from SVG in papercut style by Lia Tsernant.
            
            Plus, Greg Robleto shares all 31 Pens he created for #divtober, Ksenia Kondrashova creates text scenes in Three.js, and on our latest podcast, Chris & Dee get into the details of migrating a Ruby on Rails GraphQL API to a Go GraphQL API.`,
            isRead: true,
            sentAt: Date.now() - utilService.getRandomInt(0, 200000000),
            from: 'CodePen@cloudykitchen.com',
            to: 'nadav@gmail.com',
            type: 'Promotion',
            IsStarred: false,
            isTrash: false,
        },
        {
            id: utilService.makeId(),
            subject: 'Last chance to rock the Language Challenge Liraz Ganon, don\'t miss out!',
            body: `Hi Liraz Ganon,

            Can you achieve greatness in a short amount of time? 
            
            We often underestimate what we can achieve when we have limited time. You have 10 days, which is more than enough to improve. Your rewards are waiting—let’s finish strong! `,
            isRead: false,
            sentAt: Date.now() - utilService.getRandomInt(0, 200000000),
            from: 'linkedin@cloudykitchen.com',
            to: 'nadav@gmail.com',
            type: 'Social',
            IsStarred: false,
            isTrash: false,
        },
        {
            id: utilService.makeId(),
            subject: 'Recommended: IELTS Writing Section Skills Mastery',
            body: `Recommendations for you.
            We combed our catalog and found courses that we think match your interests. Browse our recommendations below, and start learning something new today!`,
            isRead: false,
            sentAt: Date.now() - utilService.getRandomInt(0, 20000000),
            from: 'linkedin@cloudykitchen.com',
            to: 'coursera@gmail.com',
            type: 'Promotion',
            IsStarred: false,
            isTrash: false,
        },
        {
            id: utilService.makeId(),
            subject: 'Welcome to Walmart!',
            body: `
            Let us do the shopping
            Let us do the shopping
            Our associates are trained to be picky! Order your grocery favorites and more, and we'll have your items ready for curbside pickup or delivery to your door.
            
                   Get the weekly scoop on hot items, great savings, and more.
            
            Subscribe
            We're here to help!
            Use the app to access these popular services
                    
            
            Questions? Visit our Help Center
            Twitter	Pinterest	Facebook	Youtube	Instagram
            Walmart protects your security and privacy. We will never ask for personal information (such as passwords or credit card numbers) in an email. If you receive such a request, please do not respond. Learn more about online safety and see our Privacy Policy.
            
            Please do not reply to this email. This mailbox is not monitored.
            
            © 2020 Walmart. All rights reserved.
            
            `,
            isRead: false,
            sentAt: Date.now() - utilService.getRandomInt(0, 200000000),
            from: 'walmart@walmart.com',
            to: 'nadav@gmail.com',
            type: 'Promotion',
            IsStarred: false,
            isTrash: false,
        },
        {
            id: utilService.makeId(),
            subject: 'Yaron and 56 others made changes in your shared folders',
            body: `follow specific folders and get focused updates
            Follow folders to get more detailed insights, reported instantly or once per day. Choose a folder to follow
            `,
            isRead: false,
            sentAt: Date.now() - utilService.getRandomInt(0, 200000000),
            from: 'dropbox@dropbox.com',
            to: 'nadav@gmail.com',
            type: 'Social',
            IsStarred: false,
            isTrash: false,
        },
        {
            id: utilService.makeId(),
            subject: 'Your logo is ready for download',
            body: `Your logo is waiting!
            Hi Liraz,
            
            Thank you for using BrandCrowd to create your logo.
            
            We've saved a copy of your logo within your account. To complete downloading your logo click here.`,
            isRead: true,
            sentAt: Date.now() - utilService.getRandomInt(0, 200000000),
            from: 'brandcrowd@hello.brandcrowd.com',
            to: 'nadav@gmail.com',
            type: 'Promotion',
            IsStarred: false,
            isTrash: false,
        },
        {
            id: utilService.makeId(),
            subject: 'Liraz, subscribers like you get better deals',
            body: `Please do not reply to this email as we cannot read or reply to your contact.	
            Important information: The up to 15% discount is valid from 09/11/2022 00:00 (GMT) to 10/11/2022 23:59 (GMT). Valid on pick-ups between 09/11/2022 and 28/02/2023. Terms and conditions apply. *Denotes a discount of up to and including 15%. Discounts may vary depending on product restrictions. If no discount is displayed there is none available for that selected rental. Discounts will be visible within the rental details section of your search results. This offer cannot be used in conjunction with any other offer or existing bookings. Offers are subject to availability and may be subject to change or withdrawn without prior notification.	
            Full Sale terms and conditions can be found here.	
            You can unsubscribe from the car hire marketing database at any time by clicking here.`,
            isRead: false,
            sentAt: Date.now() - utilService.getRandomInt(0, 20000000),
            from: 'arguscarhire@email.arguscarhire.com',
            to: 'nadav@gmail.com',
            type: 'Social',
            IsStarred: true,
            isTrash: true,
        },
        {
            id: utilService.makeId(),
            subject: 'Atlas Search Webinar',
            body: `Hi Liraz,

            Join us on Wednesday November 16th for our Intro to Atlas Search webinar. We’ll search through different data types, including text, numbers, dates, and geoJSON while exploring a variety of search capabilities to learn how you can work with a single API when building on MongoDB Atlas Search.
            
            Don’t miss the chance to learn about Atlas Search and get your questions answered with live-coded solutions!`,
            isRead: false,
            sentAt: Date.now() - utilService.getRandomInt(0, 200000000),
            from: 'mongodbteam@mongodb.com',
            to: 'nadav@gmail.com',
            type: 'Promotion',
            IsStarred: false,
            isTrash: false,
        },
        {
            id: utilService.makeId(),
            subject: 'Huge chunks of Nutella = very delicious cookies.',
            body: `I know I have a bunch of cookie recipes on my site, but it is fun to mix things up every now and then, and these malted nutella cookies are the perfect example of this. 
 
            They have a malted chocolate chip cookie base, and are filled with melty pockets of nutella and chocolate. A dream, if you ask me.`,
            isRead: false,
            sentAt: Date.now() - utilService.getRandomInt(0, 200000000),
            from: 'erin@cloudykitchen.com',
            to: 'nadav@gmail.com',
            type: 'Promotion',
            IsStarred: true,
            isTrash: false,
        },
        {
            id: utilService.makeId(),
            subject: 'nimated Gradient Text, GSAP Stop Motion, and SVG Paper Art.',
            body: `Animated Gradient Text, GSAP Stop Motion, and SVG Paper Art
            This week's CodePen community highlights include a speedy CSS tip for creating animated gradient text from Jhey Tompkins, a stop animation demo powered by GSAP by huxhu, and a beautiful winter scene crafted from SVG in papercut style by Lia Tsernant.
            
            Plus, Greg Robleto shares all 31 Pens he created for #divtober, Ksenia Kondrashova creates text scenes in Three.js, and on our latest podcast, Chris & Dee get into the details of migrating a Ruby on Rails GraphQL API to a Go GraphQL API.`,
            isRead: true,
            sentAt: Date.now() - utilService.getRandomInt(0, 200000000),
            from: 'CodePen@cloudykitchen.com',
            to: 'nadav@gmail.com',
            type: 'Promotion',
            IsStarred: true,
            isTrash: false,
        },
        {
            id: utilService.makeId(),
            subject: 'Last chance to rock the Language Challenge Liraz Ganon, don\'t miss out!',
            body: `Hi Liraz Ganon,

            Can you achieve greatness in a short amount of time? 
            
            We often underestimate what we can achieve when we have limited time. You have 10 days, which is more than enough to improve. Your rewards are waiting—let’s finish strong! `,
            isRead: false,
            sentAt: Date.now() - utilService.getRandomInt(0, 200000000),
            from: 'linkedin@cloudykitchen.com',
            to: 'nadav@gmail.com',
            type: 'Social',
            IsStarred: false,
            isTrash: false,
        },
        {
            id: utilService.makeId(),
            subject: 'Recommended: IELTS Writing Section Skills Mastery',
            body: `Recommendations for you.
            We combed our catalog and found courses that we think match your interests. Browse our recommendations below, and start learning something new today!`,
            isRead: false,
            sentAt: Date.now() - utilService.getRandomInt(0, 200000000),
            from: 'linkedin@cloudykitchen.com',
            to: 'coursera@gmail.com',
            type: 'Promotion',
            IsStarred: true,
            isTrash: false,
        },
        {
            id: utilService.makeId(),
            subject: 'Welcome to Walmart!',
            body: `
            Let us do the shopping
            Let us do the shopping
            Our associates are trained to be picky! Order your grocery favorites and more, and we'll have your items ready for curbside pickup or delivery to your door.
            
                   Get the weekly scoop on hot items, great savings, and more.
            
            Subscribe
            We're here to help!
            Use the app to access these popular services
                    
            
            Questions? Visit our Help Center
            Twitter	Pinterest	Facebook	Youtube	Instagram
            Walmart protects your security and privacy. We will never ask for personal information (such as passwords or credit card numbers) in an email. If you receive such a request, please do not respond. Learn more about online safety and see our Privacy Policy.
            
            Please do not reply to this email. This mailbox is not monitored.
            
            © 2020 Walmart. All rights reserved.
            
            `,
            isRead: false,
            sentAt: Date.now() - utilService.getRandomInt(0, 200000000),
            from: 'walmart@walmart.com',
            to: 'nadav@gmail.com',
            type: 'Promotion',
            IsStarred: false,
            isTrash: false,
        },
        {
            id: utilService.makeId(),
            subject: 'Yaron and 56 others made changes in your shared folders',
            body: `follow specific folders and get focused updates
            Follow folders to get more detailed insights, reported instantly or once per day. Choose a folder to follow
            `,
            isRead: false,
            sentAt: Date.now() - utilService.getRandomInt(0, 20000000),
            from: 'dropbox@dropbox.com',
            to: 'nadav@gmail.com',
            type: 'Social',
            IsStarred: false,
            isTrash: false,
        },
        {
            id: utilService.makeId(),
            subject: 'Welcome to turbologo.com',
            body: `   
    Turbologo helps to create a high-quality logo without a designer. We have a huge collection of fonts and icons.

    More than 3 million happy customers have already used our service to create a logo. We also provide:

    Business card, letterhead, envelope and blank design for business customers
    Icon for your web-site (favicon)
    Covers for social networks. Ready-to-use covers for Facebook, Twitter,
            `,
            isRead: false,
            sentAt: Date.now() - utilService.getRandomInt(0, 200000000),
            from: 'support@turbologo.com',
            to: 'liraz@gmail.com',
            type: 'Promotion',
            IsStarred: false,
            isTrash: false,
        },
        {
            id: utilService.makeId(),
            subject: 'Welcome to turbologo.com',
            body:  `   
            Turbologo helps to create a high-quality logo without a designer. We have a huge collection of fonts and icons.
        
            More than 3 million happy customers have already used our service to create a logo. We also provide:
        
            Business card, letterhead, envelope and blank design for business customers
            Icon for your web-site (favicon)
            Covers for social networks. Ready-to-use covers for Facebook, Twitter,
                    `,
            isRead: false,
            sentAt: Date.now() - utilService.getRandomInt(0, 200000000),
            from: 'dropbox@dropbox.com',
            to: 'nadav@gmail.com',
            type: 'Social',
            IsStarred: false,
            isTrash: false,
        },
        {
            id: utilService.makeId(),
            subject: 'Plate up with up to €15 off',
            body:  `   
            
            Cure your cravings with up to €15 off.
            Find affordable treats with Uber Eats. Terms & fees apply. Add the promo code before you checkout to claim your meal on us:
                    `,
            isRead: false,
            sentAt: Date.now() - utilService.getRandomInt(0, 200000000),
            from: 'uber@uber.com',
            to: 'nadav@gmail.com',
            type: 'Social',
            IsStarred: false,
            isTrash: false,
        },
        {
            id: utilService.makeId(),
            subject: 'Plate up with up to €15 off',
            body:  `   
            
            Cure your cravings with up to €15 off.
            Find affordable treats with Uber Eats. Terms & fees apply. Add the promo code before you checkout to claim your meal on us:
                    `,
            isRead: false,
            sentAt: Date.now() - utilService.getRandomInt(0, 200000000),
            from: 'uber@uber.com',
            to: 'liraz@gmail.com',
            type: 'Social',
            IsStarred: false,
            isTrash: false,
        },
        {
            id: utilService.makeId(),
            subject: 'Top brands are here',
            body:  `   
            Top items & deals
            Cure your cravings with up to €15 off.
            Find affordable treats with Uber Eats. Terms & fees apply. Add the promo code before you checkout to claim your meal on us:
                    `,
            isRead: false,
            sentAt: Date.now() - utilService.getRandomInt(0, 200000000),
            from: 'aliexpress@aliexpress.com',
            to: 'liraz@gmail.com',
            type: 'Promotion',
            IsStarred: false,
            isTrash: false,
        },
        {
            id: utilService.makeId(),
            subject: 'Top brands are here',
            body:  `   
            Top items & deals
            Cure your cravings with up to €15 off.
            Find affordable treats with Uber Eats. Terms & fees apply. Add the promo code before you checkout to claim your meal on us:
                    `,
            isRead: false,
            sentAt: Date.now() - utilService.getRandomInt(0, 20000000),
            from: 'aliexpress@aliexpress.com',
            to: 'nadav@gmail.com',
            type: 'Promotion',
            IsStarred: false,
            isTrash: false,
        },
        {
            id: utilService.makeId(),
            subject: 'Hi Liraz can you help me with sprint 3?',
            body:  `   
            I can't print : "console.log(jQuery)"
                    `,
            isRead: false,
            sentAt: Date.now() - 100000,
            from: 'nadav@gmail.com',
            to: 'liraz@gmail.com',
            type: '',
            IsStarred: false,
            isTrash: false,
        },
        {
            id: utilService.makeId(),
            subject: 'Hey Nadav! no Problem 🧆',
            body:  `   
            You forgot to put jQuery in ''.
            have a nice day!
                    `,
            isRead: false,
            sentAt: Date.now() - 80000,
            from: 'liraz@gmail.com',
            to: 'nadav@gmail.com',
            type: 'Promotion',
            IsStarred: false,
            isTrash: false,
        },


    ]
}


