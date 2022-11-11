
import { mailService } from "../services/mail.service.js"
import { showErrorMsg, showSuccessMsg } from "../../../services/event-bus.service.js"

export default {
    template:/*html*/`
	<section v-if="mail" class="mail-details">
    <section class="mail-details-header">
    <router-link :to="'/mail/'  + prevMailId"  :class="{disable:!prevMailId}"><i class="fa-solid fa-angle-left"></i></router-link>
    <router-link :to="'/mail/' + nextMailId"><i class="fa-solid fa-angle-right"></i></router-link>
    </section>
	  <hr />
      <span class="mail-details-top flex justify-between align-center" >
      <span class="title flex align-center">
      <h2>{{ mail.subject }}</h2>
      <p>{{mail.type}}</p>
      </span>
      <h3>{{ formattedTime }}</h3>
      </span>
      <span class="from flex align-center">
     <img src="assets/img/unnamed.png" alt="">
	  <h3> {{ mail.from }}</h3>
      </span>
	  <h3>to: {{ mail.to }}</h3>
	  <p>body: {{ mail.body }}</p>
	  <hr />
	
	  
	</section>
	<h3 v-else>Loading...</h3>
	`, 
    data() {
        return {
            mail: null,
            nextMailId: null,
            prevMailId: null
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
                    mailService.getPrevMailId(mail.id)
                        .then(prevMailId =>{
                        console.log(prevMailId)
                            this.prevMailId = prevMailId
                        } )
                    }
                )
                .catch(err => showErrorMsg('Cannot load mail'))
        },
        markAsRead(){
            this.mail.isRead = true
            mailService.save(this.mail)
            .then(() => {
                showSuccessMsg(`Mail ${this.mailId} read`)
            })
            .catch(err =>{
                console.log('OOPS', err)
                showErrorMsg('Cannot read mail')
            })
        }
    },
    computed: {
        mailId() {
            return this.$route.params.id
        },
        formattedTime(){
            const options = {
                year: 'numeric', month: 'numeric', day: 'numeric',
                hour: 'numeric', minute: 'numeric', 
                hour12: false,
                timeZone: 'America/Los_Angeles'
              };
              return new Intl.DateTimeFormat('en-US', options).format(this.mail.sentAt)
        },

    },
    watch: {
        mailId() {
            console.log('Mail Id changed')
            this.loadMail()
        }
    }
}