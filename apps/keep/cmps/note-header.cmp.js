import { eventBus } from "../../../services/event-bus.service.js"
import appsPicker from '../../../cmps/apps-picker.cmp.js'
import pallettePicker from '../../../cmps/pallette-picker.cmp.js'

export default {
    name: 'note-header',
    props: [''],
    template:/*html*/ `
        <section class="app-header note-header flex justify-between align-center">

        <section class="logo-search flex align-center">
        <section class="logo-container flex">
        <button @click="expandNav">
        <img src="assets/img/svg/menu-bar.svg" />
        </button>
            <img src="assets/img/note-logo.png" class="note-logo"alt="" />
            <p>ote</p>
        </section>
            <label>
            <span><i class="fa-solid fa-magnifying-glass"></i></span>
             <input
                v-model="filterBy.title"
                @input="filter"
                type="search"
                placeholder="search..."/> 
            </label>
            </section>

                <span class=end-icons>
                <img src="assets/img/svg/help.svg" alt="" @click="goAbout">
                <img src="assets/img/svg/setting.svg" alt="" @click="themePicker=!themePicker"/>

                <span class="apps-wrapper flex align-center" @click.stop="toggleShowApps">
                <img src="assets/img/svg/apps.svg" alt="" />
                <apps-picker :class="{'opacity-1':appsIsShowing}">
                </span>
                <span class="user-wrapper">
                <img src="assets/img/nadav.png" class="user-img" alt="">
                  <img src="assets/img/svg/ring.svg" class="user-img-ring" alt="" />
                  <section  class="apps-screen" @click="toggleShowApps" :class="{'opacity-1':appsIsShowing}">
                </span>
        </section>
    <pallette-picker v-if="themePicker" @click="themePicker=!themePicker">

        </section>
    `,
    data() {
        return {
            appsIsShowing: false,
            filterBy: {
                title: ''
            },
            themePicker: false

        }
    },
    methods: {
        filter() {
            this.$emit('filterTitle', this.filterBy)
        },
        goToApp() {
            this.$router.push('/mail')

        },
        expandNav() {
            eventBus.emit('expandNav')
        },
        goAbout() {
            this.$router.push('/about')
        },
        toggleShowApps() {
            this.appsIsShowing = !this.appsIsShowing
        }
    },
    components: {
        appsPicker,
        pallettePicker
    }
}
