export default {
    name: 'mail-nav',
    template:/*html*/ `
        <section class="app-nav">
        <section class="logo-container flex" >
        <i class="fa-solid fa-bars"></i>
        <img src="assets/img/mail-logo.png" class="mail-logo" />
         <p>Amail</p>
        </section>
        <button @click="composed" class="composed"><i class="fa-solid fa-pencil"></i>&nbsp Compose</button>
        <ul class="clean-list">
            <li>
            <i class="fa-solid fa-inbox"></i>
            &nbsp
            Inbox
            </li>
            <li>
            <i class="fa-regular fa-star"></i>
            &nbsp
            Starred
            </li>
            <li>
            <i class="fa-solid fa-circle"></i>
            &nbsp
            Unread
            </li>
        </ul>
        </section>
    `,
    data() {
        return {
          
        }
    },
    methods: {
        composed(){
            this.$emit('setCompose')
        }
    }
}