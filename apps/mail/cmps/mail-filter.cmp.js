export default {
    name:'mail-filter',
    template:/*html*/ `
        <section class="mail-filter">
            <input 
                @input="filter"
                v-model="filterBy.subject" 
                type="text" 
                placeholder="Search" />
        </section>
    `,
    data(){
        return { 
            filterBy: {
                subject: '',
                minSpeed: 0
            }
        }
    },
    methods : {
        filter(){
            this.$emit('filter', this.filterBy)
        }
    },
   
}