export default {
    template:/*html*/ `
    <section class="apps-picker flex justify-center">
    <span><router-link to="/">
    <img class="picker-app" src="assets/img/a-logo.png" alt="" />
    </router-link>
</span>
    <span><router-link to="/mail">
        <img class="picker-app" src="assets/img/mail-logo.png" alt="" />
      </router-link>
  </span>
    <span><router-link to="/note">
        <img class="picker-app note-img" src="assets/img/note-logo.png" alt="" />
      </router-link></span>
  </section>
    `,  
}

