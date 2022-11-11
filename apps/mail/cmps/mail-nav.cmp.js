export default {
    name: 'mail-nav',
    props:['unread'],
    template:/*html*/ `
        <section class="app-nav">
        <section class="logo-container flex" >
        <i class="fa-solid fa-bars"></i>
        <img src="assets/img/mail-logo.png" class="mail-logo" />
         <p>Amail</p>
        </section>
        <button @click="composed" class="composed"><i class="fa-solid fa-pencil"></i>&nbsp Compose</button>
        <ul class="clean-list">
            <li @click="filter('')" :class="{selected:!selected}" class="flex justify-between">
            <span>
            <i class="fa-solid fa-inbox" ></i>
            &nbsp
            Inbox
            </span>
            <span class="unread-count">{{unread}}</span>
            </li>
            <li @click="filter('starred')" :class="{selected: selected ==='starred'}">
            <i class="fa-regular fa-star"></i>
            &nbsp
            Starred
            </li>
            <li @click="filter('unread')" :class="{selected: selected ==='unread'}">
            <i class="fa-solid fa-circle"></i>
            &nbsp
            Unread
            </li >
            <li @click="filter('sent')" :class="{selected: selected ==='sent'}">
            <i class="fa-regular fa-paper-plane"></i>
            &nbsp
            Sent
            </li>
        </ul>
        </section>
    `,
    data() {
        return{
            selected:''
        }

    },
    methods: {
        filter(val){
            console.log(val)
            this.selected=val
            this.$emit('filterBy', val)
        },
        composed(){
            this.$emit('setCompose')
        }
    }
}