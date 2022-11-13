import appsPicker from './apps-picker.cmp.js'
import pallettePicker from './pallette-picker.cmp.js'

export default {
  template:/*html*/ `
    <header class="app-header home-header flex">
    <span class="end-icons">
    <img src="assets/img/svg/help.svg" @click="goAbout" alt="" />
    <img src="assets/img/svg/setting.svg" alt="" @click.stop="themePicker=!themePicker"/>
    <span class="apps-wrapper flex align-center" @click.stop="toggleShowApps">
    <img src="assets/img/svg/apps.svg" alt="" @click="goToApp" />
    <apps-picker :class="{'opacity-1':appsIsShowing}">
    </span>
    <span class="user-wrapper home" @click="toggleUsers">
    <span>
    <img src="assets/img/liraz.jpg" class="user-img liraz" :class="{in:currUser==='liraz',out:currUser==='nadav'}" alt="">
    <img src="assets/img/nadav.png" class="user-img nadav" :class="{out:currUser==='liraz',in:currUser==='nadav'}" alt="">
    </span>
    <img src="assets/img/svg/ring.svg" class="user-img-ring" alt="" />
    </span>
    </span>
    </section>
    <section  class="apps-screen" @click="toggleShowApps" :class="{'opacity-1':appsIsShowing}">
    </section>
    <section v-if="themePicker" class="theme-screen" @click="themePicker=!themePicker"></section>
    <pallette-picker v-if="themePicker" @click="themePicker=!themePicker" />
    </header>
    `,
  data() {
    return {
      appsIsShowing: false,
      themePicker: false,
      currUser:'liraz'
    }
  },
  methods: {
    goAbout() {
      this.$router.push('/about')
    },
    toggleShowApps() {
      this.appsIsShowing = !this.appsIsShowing
    },
    toggleUsers(){
      console.log( this.currUser)
     this.currUser = this.currUser ==='liraz'? 'nadav': 'liraz'
    }
  },
  components: {
    appsPicker,
    pallettePicker
  }
}

