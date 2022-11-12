import { mailService } from "../services/mail.service.js"
import { showErrorMsg, showSuccessMsg } from '../../../services/event-bus.service.js'

export default {
    props:['mail'],
    name: 'mail-compose',
    template:/*html*/ `
    <section class="mail-compose-wrapper">
    <section class="mail-compose-header flex justify-between">
    <h3>New Message</h3>
    <i class="fa-solid fa-xmark" @click="composeClose"></i>
    </section>
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
            interval: null
        }
    },
    mounted(){
        if(this.mail){
            this.mailToEdit = this.mail
        }
        this.save()
    },
    unmounted(){

    },
    methods: {
        send(){
            this.mailToEdit.isDraft = false
            this.mailToEdit.isRead = false
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
            },
            save(){
                console.log(this.mail)
                this.mailToEdit.isDraft = true
                this.mailToEdit.isRead = true
                mailService.save(this.mailToEdit)
                    .then(mail => {
                        this.mailToEdit = mail
                        showSuccessMsg(`Mail saved as draft (Mail id: ${mail.id})`)
                        this.$emit('mailSaved', mail)
                    })
                    .catch(err => {
                        console.log('OOps:', err)
                        showErrorMsg(`Cannot save mail`)
                    })
                },
            
            composeClose(){
                this.$emit('composeClose')
            }
 
    }
}