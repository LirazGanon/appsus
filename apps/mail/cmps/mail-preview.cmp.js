export default {
    props: ['mail'],
    name:'mail-preview',
    template:/*html*/ `
        <article @click="view(mail.id)" class="mail-preview flex align-center" :class="{read:mail.isRead}">
        <input type="checkbox" name="check-email">
        <i class="fa-regular fa-star"></i> 
            <h2 class="grow clean-space">{{ senderName }}</h2>
            <h2 class="grow2 clean-space">{{ shortedSubject }}</h2>
            <h3 class="grow3 clean-space text-overflow">{{ mail.body}} </h3>
            <h3 class="clean-space">{{ formattedTime}} </h3>
            <section class="actions">
            <button @click.stop="removeMail(mail.id)">x</button>
        </section>
        </article>
    `,methods: {
        view(mailId){
            this.$emit('viewMail', mailId)
        },
        removeMail(mailId){
            this.$emit('remove', mailId)
        }
    },
    computed: {
        formattedTime() {
            return new Intl.DateTimeFormat('en-US').format(this.mail.sentAt)
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
        }
    }
}