import { eventBus } from "../../../services/event-bus.service.js"

export default {
    name: 'mail-header',
    props: [''],
    template:/*html*/ `
	<section class="app-header flex justify-between align-center">
	  
    <section class="logo-search flex align-center">
    
        <section class="logo-container flex">
        <button @click="expandNav">
            <img src="assets/img/svg/menu-bar.svg" />
        </button>
            <img src="assets/img/mail-logo.png" class="mail-logo" />
            <p>jQmail</p>
	  </section>
	  
    <label>
    <span><i class="fa-solid fa-magnifying-glass"></i></span>
        <input
        @input="filter"
        v-model="filterBy.subject"
        type="text"
        placeholder="Search"
        />
    </label>
    </section>
	  <span class="end-icons">
	    <img src="assets/img/svg/help.svg" alt="" />
	    <img src="assets/img/svg/setting.svg" alt="" />
	    <img src="assets/img/svg/apps.svg" alt="" @click="goToApp" />
      <span class="user-wrapper">
      <img src="assets/img/liraz.jpg" class="user-img" alt="">
	    <img src="assets/img/svg/ring.svg" class="user-img-ring" alt="" />
      </span>
	  </span>
	</section>
	`,
    data() {
        return {
            filterBy: {
                subject: '',
                minSpeed: 0
            }
        }
    },
    methods: {
        filter() {
            this.$emit('filter', this.filterBy)
        },
        goToApp() {
            this.$router.push('/note')
        },
        expandNav() {
            eventBus.emit('expandNav')
        }
    },
    func() {
        this.$emit('')
    }
}
