import mailPreview from './mail-preview.cmp.js'

export default {
    props:['mails'],
    template:/*html*/ `
        <section class="mail-list">
            <ul class="flex flex-column">
                <li class="flex grow" v-for="mail in mails" :key="mail.id">
                <input type="checkbox" name="check-email">
                <i class="fa-regular fa-star"></i> 
                    <mail-preview :mail="mail"  @viewMail="view"/>
                    <section class="actions">
                        <router-link :to="'/mail/' + mail.id">Details</router-link> |
                        <button @click="remove(mail.id)">x</button>
                    </section>
                </li>
            </ul>
        </section>
    `,
    methods: {
        remove(mailId){
            this.$emit('remove', mailId)
        }, view(mailId){
            this.$emit('viewMail', mailId)
        },
    },
    components: {
        mailPreview,
    }
}