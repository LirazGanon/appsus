import { mailService } from "../apps/mail/services/mail.service.js"
import { showErrorMsg, showSuccessMsg } from '../services/event-bus.service.js'

import mailFilter from '../apps/mail/cmps/mail-filter.cmp.js'
import mailList from '../apps/mail/cmps/mail-list.cmp.js'

export default {
    name:'mail-preview',
    template:/*html*/ `
	<section class="mail-app">
	  <img src="assets/img/mail-logo.png" alt="" />
	  <mail-filter @filter="setFilter" />
	  <router-link to="/email/edit">Send a new mail</router-link>
	  <mail-list @remove="removeMail" :mails="mailsToShow" />
	</section>
	`,
    data(){
        return { 
            mails: [],
            filterBy: {
                subject : '',
                from: ''
            },
        }
    },
    created(){
        mailService.query()
            .then(mails => {
                this.mails = mails
            })
    },
    methods: {
        removeMail(mailId){
            mailService.remove(mailId)
                .then(() => {
                    const idx = this.mails.findIndex(mail => mail.id === mailId)
                    this.mails.splice(idx, 1)
                    showSuccessMsg(`Mail ${mailId} deleted`)
                })
                .catch(err =>{
                    console.log('OOPS', err)
                    showErrorMsg('Cannot remove mail')
                })

        },
        setFilter(filterBy){
            this.filterBy = filterBy
        }
    },
    computed: {
        mailsToShow(){
            const regex = new RegExp(this.filterBy.subject, 'i')
            var mails = this.mails.filter(mail => regex.test(mail.subject))
            // mails = mails.filter(mail => mail.maxSpeed > this.filterBy.minSpeed)
            return mails
            
        }
    },
    components: {
        mailFilter,
        mailList,
    }
}
