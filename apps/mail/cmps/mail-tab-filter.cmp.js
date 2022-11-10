export default {
    name: 'mail-tab-filter',
    props: ['unread'],
    template:/*html*/ `
        <section class="mail-tab-filter">
         <button v-for="(filter,idx) in filterBy" class="filter-btn" :key="idx" 
         @click="setFilter(filter)">{{ filter }} {{unread[filter]}} </button>
        </section>
    `,
    data() {
        return {
            filterBy: [
                'Primary',
                'Promotion',
                'Social'
            ],
        }
    },
    methods: {
        setFilter(filter) {
            if (filter === 'Primary') filter = ''
            this.$emit('tabFilter', filter)
        },
    }
}