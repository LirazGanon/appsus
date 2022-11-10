import { mailService } from "../services/mail.service.js"
import { showErrorMsg, showSuccessMsg } from '../../../services/event-bus.service.js'

export default {
    name: 'mail-compose',
    template:/*html*/ `
    <section class="mail-compose-wrapper">
    <section class="mail-compose-header">New Message</section>
	<section class="mail-compose">
    <form @submit.prevent="send">
    <span>
    From
    <input type="email" placeholder="Your-Mail" v-model="mailToEdit.from" />
	    </span>
	    <span>
        To
	      <input
	        type="email"
	        v-model="mailToEdit.to"
	        autofocus
	      />
	    </span>
	    <span class="subject">
	      Subject
	      <input type="text" class="subject" v-model="mailToEdit.subject" />
          </span>
          <textarea rows="15" cols="50" v-model="mailToEdit.body"></textarea>
          <button class="send">Send</button>
          </form>
          </section>
          </section>
          `,
    data() {
        return { 
            mailToEdit: mailService.getEmptyMail(),
        }
    },
    methods: {
        send(){
            mailService.save(this.mailToEdit)
                .then(mail => {
                    this.mailToEdit = mailService.getEmptyMail()
                    showSuccessMsg(`Mail sent (Mail id: ${mail.id})`)
                    this.$emit('mailSent', mail)
                })
                .catch(err => {
                    console.log('OOps:', err)
                    showErrorMsg(`Cannot send mail`)
                })
        }
 
    }
}