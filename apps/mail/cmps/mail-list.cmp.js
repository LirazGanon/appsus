import mailPreview from './mail-preview.cmp.js'

export default {
    props:['mails'],
    template:/*html*/ `
        <section class="mail-list">
            <ul class="flex flex-column clean-list">
                <li v-for="mail in mails" :key="mail.id">
                    <mail-preview :mail="mail"  @viewMail="view" @remove="removeMail" @check="checked" @read="toggleRead"/>
                </li>
            </ul>
        </section>
    `,
    methods: {
        removeMail(mail){
            this.$emit('remove', mail)
        }, view(mailId){
            this.$emit('viewMail', mailId)
        }, checked(mail){
            this.$emit('check', mail)
        }, toggleRead(mail){
            this.$emit('read', mail)
        }
    },
    components: {
        mailPreview,
    }
}