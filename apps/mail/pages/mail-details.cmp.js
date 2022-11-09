
import { mailService } from "../services/mail.service.js"
import { showErrorMsg } from "../../../services/event-bus.service.js"

export default {
    template:/*html*/`
	<section v-if="mail" class="mail-details">
	  <router-link :to="'/mail/' + nextMailId">Next Mail</router-link>
	
	  <hr />
	  <h2>{{ mail.subject }}</h2>
	  <h2>time: {{ formattedTime }}</h2>
	  <h3>from: {{ mail.from }}</h3>
	  <h3>to: {{ mail.to }}</h3>
	  <p>body: {{ mail.body }}</p>
	  <hr />
	
	  <router-link to="/mail">Back</router-link>
	</section>
	<h3 v-else>Loading...</h3>
	`, 
    data() {
        return {
            mail: null,
            imgValid: true,
            nextMailId: null
        }
    },
    created() {
        this.loadMail()
    },
    methods: {
        loadMail() {
            mailService.get(this.mailId)
                .then(mail => {
                    this.mail = mail
                    this.markAsRead()
                    mailService.getNextMailId(mail.id)
                        .then(nextMailId => this.nextMailId = nextMailId)
                })
                .catch(err => showErrorMsg('Cannot load mail'))
        },
        markAsRead(){
            this.mail.isRead = true
            console.log(this.mail)
            mailService.save(this.mail)
            .then(() => {
                showSuccessMsg(`Mail ${mailId} deleted`)
            })
            .catch(err =>{
                console.log('OOPS', err)
                showErrorMsg('Cannot remove mail')
            })
        }
    },
    computed: {
        mailId() {
            return this.$route.params.id
        },
        formattedTime(){
            return new Intl.DateTimeFormat('en-US').format(this.mail.sentAt)
        }
 
    },
    watch: {
        mailId() {
            console.log('Mail Id changed')
            this.loadMail()
        }
    }
}