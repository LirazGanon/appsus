import { eventBus } from "../../../services/event-bus.service.js"

export default {
    props: ['mail'],
    name:'mail-preview',
    template:/*html*/ `
        <article @click="view(mail.id)" class="mail-preview flex align-center" :class="{read:mail.isRead}">
        <input type="checkbox" name="check-email" class="fade" @click.stop @input="checked(mail)" :checked="mail.isChecked">

        <i v-if="!mail.IsStarred" class="fa-regular fa-star fade" @click.stop="setStarred(mail)" ></i>
        <i v-else class="fa-solid fa-star starred" @click.stop="setStarred(mail)"></i>
     
        <h3 class="clean-space sender text-overflow" :class="{'un-bold black':mail.isRead}" >{{ senderName }}</h3>
        <section class="content">
            <h3 class="title clean-space" :class="{'un-bold black':mail.isRead}"  >{{ mail.subject }}</h3>
            <h3 class="desc clean-space">{{ mail.body}} </h3>
        </section>
        <h3 class="clean-space sentAt" :class="{'un-bold':mail.isRead}" >{{ formattedTime}} </h3>

            <section class="actions" :class="{read:mail.isRead}">
            <button v-if="mail.isTrash || mail.isDraft" @click.stop="removeMail(mail.id)" title="Permanently delete"><i class="fa-solid fa-trash-can red-trash"></i></button>
            <button v-else @click.stop="toggleTrash(mail)" title="Send to trash"><i class="fa-regular fa-trash-can"></i></button>
            <button v-if="mail.isRead" @click.stop="toggleRead(mail)" title="Mark as unread"><i class="fa-regular fa-envelope"></i></button>
            <button v-else @click.stop="toggleRead(mail)" title="Mark as read"><i class="fa-regular fa-envelope-open"></i></button>
            <button @click.stop="createNote" title="Send mail to note"><i class="fa-regular fa-paper-plane"></i></button>
        </section>
        </article>
    `,methods: {
        view(mailId){
            if(this.mail.isDraft) {
                console.log(this.mail)
                this.$emit('compose', this.mail)
                return
            }
            this.$emit('viewMail', mailId)
        },
        removeMail(mailId){
            this.$emit('remove', mailId)
        },
        checked(mail){
            this.$emit('check', mail)
        },
        toggleRead(mail){
            this.$emit('read', mail)
        },
        toggleTrash(mail){
            this.$emit('trash', mail)
        },
        setStarred(mail){
            this.$emit('starred', mail)
        },
        createNote(){
            eventBus.emit('addMail', this.mail)
            setTimeout(() => {
                this.$router.push('/note')
            }, 1000);
        }
    },
    computed: {
        formattedTime() {
            const timeStamp = this.mail.sentAt
            var today = new Date()
            var sent = new Date(timeStamp)
            let options = { day: "numeric", month: "short" }
            if(today.setHours(0,0,0,0) === sent.setHours(0,0,0,0)){ 
                const date = new Date(timeStamp);
                return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: false }) 
            }
            else{
                return new Date(timeStamp).toLocaleDateString("en-US", options);
            }
            // if ((Date.now() - timeStamp) > 24*60*60*1000){
            //     let options = { day: "numeric", month: "short" }
            //     return new Date(timeStamp).toLocaleDateString("en-US", options);
            // }
            // const date = new Date(timeStamp);
            // return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: false })
        },
        shortedSubject() {
            const str = this.mail.subject
            const n = 25
            return (str.length > n) ? str.slice(0, n-1) + '...'  : str; 
        },
        shortedBody() {
            const str = this.mail.body
            const n = 50
            return (str.length > n) ? str.slice(0, n-1)  : str; 
        },
        senderName(){
            const str = this.mail.from  
            const strs = str.split('@') 
            return strs[0]
        },
    }
}