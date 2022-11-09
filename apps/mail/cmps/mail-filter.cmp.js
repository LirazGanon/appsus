export default {
    name:'mail-filter',
    template:/*html*/ `
        <section class="mail-filter">
            <input 
                @input="filter"
                v-model="filterBy.subject" 
                type="text" 
                placeholder="Search" />
                 <!--  <label>
                    Min speed:
                 <input type="range" @input="filter" v-model.number="filterBy.minSpeed"
                        min="0" max="500" />
                        <span>{{filterBy.minSpeed}}</span>
                </label> -->
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
    watch: {
        filterBy:{
            handler(){
                console.log('Something changed')
            },
            deep: true
        }
    }
}