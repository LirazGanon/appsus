import { mailService } from "../services/mail.service.js"
import { showErrorMsg, showSuccessMsg } from '../../../services/event-bus.service.js'

import mailFilter from '../cmps/mail-filter.cmp.js'
import mailList from '../cmps/mail-list.cmp.js'

export default {
    name:'mail-app',
    template:/*html*/ `
	<section class="mail-app main-content">
	  <!-- <img src="assets/img/mail-logo.png" alt="" /> -->
	  <mail-filter @filter="setFilter" />
	  <router-link to="/mail/edit">Send a new mail</router-link>
	  <mail-list v-if="mails" @remove="removeMail" :mails="mailsToShow" @viewMail="showMail" @check="checkMail" @read="toggleRead"/>
	</section>
	`,
    data(){
        return { 
            mails: null,
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
        toggleRead(mail){
            mail.isRead = !mail.isRead
            mailService.save(mail)
            .then(() => {
                showSuccessMsg(`Mail ${mail.id} read`)
            })
            .catch(err =>{
                console.log('OOPS', err)
                showErrorMsg('Cannot read mail')
            })
        },

        setFilter(filterBy){
            this.filterBy = filterBy
        },
        showMail(mailId){
            this.$router.push('/mail/' + mailId)
        },
        checkMail(mail){
            mail.isChecked= !mail.isChecked
            mailService.save(mail)
            .then(() => {
                showSuccessMsg(`Mail ${mail.id} checked`)
            })
            .catch(err =>{
                console.log('OOPS', err)
                showErrorMsg('Cannot check mail')
            })
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
