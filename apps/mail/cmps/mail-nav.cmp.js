import { eventBus } from "../../../services/event-bus.service.js"

export default {
    name: 'mail-nav',
    props:['unread'],
    template:/*html*/ `
        <section class="app-nav" :class="navState">
    
        <button @click="composed" class="composed">
        <i class="fa-solid fa-pencil"></i>
        <span>
        Compose
        </span>
        </button>
        <ul class="clean-list">
            <li @click=" this.$router.push('/mail');filter('')" :class="{selected:!selected}" class="nav-item" >
                <i class="fa-solid fa-inbox" ></i>
                <span>
                Inbox
                </span>
                <span class="unread-count">{{unread}}</span>
            </li>
            <li @click="filter('starred')" :class="{selected: selected ==='starred'}" class="nav-item">
            <i class="fa-regular fa-star"></i>
            <span>
            Starred
            </span>
            </li>
            <li @click="filter('unread')" :class="{selected: selected ==='unread'}" class="nav-item">
            <i class="fa-solid fa-circle"></i>
            <span>
            Unread
            </span>
            </li >
            <li @click="filter('sent')" :class="{selected: selected ==='sent'}" class="nav-item">
            <i class="fa-regular fa-paper-plane"></i>
            <span>
            Sent
            </span>
            </li>
            <li @click="filter('draft')" :class="{selected: selected ==='draft'}" class="nav-item">
            <i class="fa-regular fa-file"></i>
            <span> 
            Draft
            </span>
            </li>
            <li @click="filter('trash')" :class="{selected: selected ==='trash'}" class="nav-item">
            <i class="fa-solid fa-trash-can"></i>
            <span>
            Trash
            </span>
            </li>
        </ul>
        </section>
    `,
    data() {
        return{
            selected:'',
            expanded: false
        }

    },
    mounted() {
        eventBus.on('expandNav', this.expandNav)
    },
    methods: {
        filter(val){
            this.$router.push('/mail')
            this.selected=val
            this.$emit('filterBy', val)
        },
        composed(){
            this.$router.push('/mail')
            this.$emit('setCompose')
        },
        expandNav() {
            this.expanded = !this.expanded
        }
    },
    computed: {
        navState(){
            return {active:this.expanded}
        }
    }
}