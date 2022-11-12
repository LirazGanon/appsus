
import { mailService } from "../services/mail.service.js"
import { showErrorMsg, showSuccessMsg } from "../../../services/event-bus.service.js"

export default {
    template:/*html*/`
	<section v-if="mail" class="mail-details">
	  <section class="mail-details-header">
	    <p>{{mailIdx}} of {{mailCount}}</p>
	    <router-link :to="'/mail/'  + prevMailId" :class="{disable:!prevMailId}"
	      ><i class="fa-solid fa-angle-left"></i
	    ></router-link>
	    <router-link :to="'/mail/' + nextMailId"
	      ><i class="fa-solid fa-angle-right"></i
	    ></router-link>
	  </section>
	  <hr />
	  <span class="mail-details-top flex justify-between align-center">
	    <span class="title flex align-center">
	      <h2>{{ mail.subject }}</h2>
	      <p>{{mail.type}}</p>
	    </span>
	    <h3>{{ formattedTime }}</h3>
	  </span>
	
	  <span class="from flex align-center">
	    <img src="assets/img/unnamed.png" alt="" />
	    <span>
	      <span class="sender flex align-center">
	        <h3>{{senderName}}</h3>
	        <p>&lt;{{ mail.from }}></p>
	      </span>
	      <p>Me <i class="fa-solid fa-caret-down"></i></p>
	    </span>
	  </span>
	
	  <pre> {{ mail.body }}</pre>
	  <hr />
	</section>
	<section v-else class="skeleton-wrapper">
	  <div v-for="n in 2" class="card-preview is-loading">
	    <div class="image"></div>
	    <div class="content">
	      <h2></h2>
	      <p></p>
	    </div>
	  </div>
	</section>
	`,
    data() {
        return {
            mail: null,
            nextMailId: null,
            prevMailId: null,
            mailIdx: null,
            mailCount: null
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
                        .then(nextMailId =>{
                            this.nextMailId = nextMailId.nextId
                            this.mailIdx = nextMailId.idx
                            this.mailCount = nextMailId.mailLength
                        } )
                    mailService.getPrevMailId(mail.id)
                        .then(prevMailId =>{
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
            })
            .catch(err =>{
                console.log('OOPS', err)
                showErrorMsg('Cannot read mail')
            })
        }
    },
    computed: {
        mailId() {
            if (!this.$route.params.id) return undefined
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
        senderName(){
            const str = this.mail.from  
            const strs = str.split('@') 
            return strs[0]
        },

    },
    watch: {
        mailId() {
            if(this.mailId === undefined) return
            this.loadMail()
        }
    }
}