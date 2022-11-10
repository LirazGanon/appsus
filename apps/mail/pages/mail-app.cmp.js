import { mailService } from "../services/mail.service.js"
import { showErrorMsg, showSuccessMsg } from '../../../services/event-bus.service.js'

import mailFilter from '../cmps/mail-filter.cmp.js'
import mailList from '../cmps/mail-list.cmp.js'
import tabFilter from '../cmps/mail-tab-filter.cmp.js'
import mailCompose from '../cmps/mail-compose.cmp.js'

export default {
    name: 'mail-app',
    template:/*html*/ `
	<section class="mail-app main-content">
	  <!-- <img src="assets/img/mail-logo.png" alt="" /> -->
	  <mail-filter @filter="setFilter" />
      <tab-filter @tabFilter="setTabFilter" :unread="unreadCount"/>
	   <!--<router-link to="/mail/edit">Send a new mail</router-link>-->
    <button @click="isComposing = !isComposing">Compose</button>
	  <mail-list v-if="mails" @remove="removeMail" :mails="mailsToShow" @viewMail="showMail" @check="checkMail" @read="toggleRead"/>
      <mail-compose v-if="isComposing" @mailSent=addMail />
	</section>
	`,
    data() {
        return {
            mails: null,
            filterBy: {
                subject: '',
                from: '',
                type: ''
            },
            unreadCount: {
                Primary: 0,
                Promotion: 0,
                Social: 0
            },
            isComposing: false
        }
    },
    created() {
        mailService.query()
            .then(mails => {
                this.mails = mails
                this.mails.forEach(mail => {
                    if (!mail.isRead) {
                        this.unreadCount.Primary += 1
                        this.unreadCount[mail.type] += 1
                    }
                })
            })
    },
    methods: {
        removeMail(mailId) {
            mailService.remove(mailId)
                .then(() => {
                    const idx = this.mails.findIndex(mail => mail.id === mailId)
                    let mail = this.mails[idx]
                    if (!mail.isRead){
                        this.unreadCount[mail.type] -= 1
                        this.unreadCount.Primary -= 1
                    }
                    this.mails.splice(idx, 1)
                    showSuccessMsg(`Mail ${mailId} deleted`)
                })
                .catch(err => {
                    console.log('OOPS', err)
                    showErrorMsg('Cannot remove mail')
                })
        },
        toggleRead(mail) {
            mail.isRead = !mail.isRead
            this.updateReadCount(mail)
            mailService.save(mail)
                .then(() => {
                    showSuccessMsg(`Mail ${mail.id} read`)
                })
                .catch(err => {
                    console.log('OOPS', err)
                    showErrorMsg('Cannot read mail')
                })
        },
        addMail(mail) {
            this.mails.unshift(mail)
            this.isComposing = false
            this.updateReadCount(mail)
        },
        updateReadCount(mail) {
            this.unreadCount[mail.type] += mail.isRead ? -1 : +1
            this.unreadCount.Primary += mail.isRead ? -1 : +1
        },
        setFilter(filterBy) {
            this.filterBy.subject = filterBy.subject
        },
        setTabFilter(filterBy) {
            this.filterBy.type = filterBy
        },
        showMail(mailId) {
            this.$router.push('/mail/' + mailId)
        },
        checkMail(mail) {
            mail.isChecked = !mail.isChecked
            mailService.save(mail)
                .then(() => {
                    showSuccessMsg(`Mail ${mail.id} checked`)
                })
                .catch(err => {
                    console.log('OOPS', err)
                    showErrorMsg('Cannot check mail')
                })
        }
    },
    computed: {
        mailsToShow() {
            const regex = new RegExp(this.filterBy.subject, 'i')
            let mails = this.mails.filter(mail => regex.test(mail.subject))
            console.log(this.filterBy.type)
            mails = mails.filter(mail => mail.type.includes(this.filterBy.type))
            // mails = mails.filter(mail => mail.maxSpeed > this.filterBy.minSpeed)
            return mails

        }
    },
    components: {
        mailFilter,
        mailList,
        tabFilter,
        mailCompose
    }
}
