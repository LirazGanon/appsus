import mailPreview from './mail-preview.cmp.js'

export default {
    props:['mails'],
    template:/*html*/ `
        <section class="mail-list">
            <ul class="flex flex-column clean-list">
                <li v-for="mail in mails" :key="mail.id">
                    <mail-preview :mail="mail"  @viewMail="view" @remove="removeMail"/>
                </li>
            </ul>
        </section>
    `,
    methods: {
        removeMail(mailId){
            this.$emit('remove', mailId)
        }, view(mailId){
            this.$emit('viewMail', mailId)
        },
    },
    components: {
        mailPreview,
    }
}