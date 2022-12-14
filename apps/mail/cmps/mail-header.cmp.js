import { eventBus } from "../../../services/event-bus.service.js"
import appsPicker from '../../../cmps/apps-picker.cmp.js'
import pallettePicker from '../../../cmps/pallette-picker.cmp.js'

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
	    <img src="assets/img/svg/help.svg" alt="" @click="goAbout" />
        <img src="assets/img/svg/setting.svg" alt="" @click="themePicker=!themePicker"/>

        <span class="apps-wrapper flex align-center" @click.stop="toggleShowApps">
        <img src="assets/img/svg/apps.svg" alt="" />
        <apps-picker :class="{'opacity-1':appsIsShowing}">
        </span>
        <span class="user-wrapper" @click="toggleUsers">
                <span>
                <img src="assets/img/liraz.jpg" class="user-img liraz" :class="{in:currUser==='liraz',out:currUser==='nadav'}" alt="">
                <img src="assets/img/nadav.png" class="user-img nadav" :class="{out:currUser==='liraz',in:currUser==='nadav'}" alt="">
                </span>
	    <img src="assets/img/svg/ring.svg" class="user-img-ring" alt="" />
      </span>
	  </span>
      <section  class="apps-screen" @click="toggleShowApps" :class="{'opacity-1':appsIsShowing}">
      
      </section>
      <section v-if="themePicker" class="theme-screen" @click="themePicker=!themePicker"></section>
      <pallette-picker v-if="themePicker" @click="themePicker=!themePicker" />
	</section>
	`,
    data() {
        return {
            appsIsShowing: false,
            filterBy: {
                subject: '',
                minSpeed: 0,
            },
            themePicker: false,
            currUser:'nadav',
            cuurMail:'nadav@gmail.com'

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
        },
        goAbout() {
            this.$router.push('/about')
        },
        toggleShowApps() {
            this.appsIsShowing = !this.appsIsShowing
        },
        toggleUsers(){
            this.currUser = this.currUser ==='liraz'? 'nadav': 'liraz'
            this.currMail = this.currUser ==='liraz'? 'liraz@gmail.com': 'nadav@gmail.com'
            this.$emit('userMail',this.currMail)
            
          }
    },
    func() {
        this.$emit('')
    },
    components: {
        appsPicker,
        pallettePicker
    }
}
