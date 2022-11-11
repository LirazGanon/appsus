export default {
    name: 'note-header',
    props: [''],
    template:/*html*/ `
        <section class="app-header note-header flex justify-between align-center">

        <section class="logo-container flex">
        <i class="fa-solid fa-bars"></i>
            <img src="assets/img/note-logo.png" class="note-logo"alt="" />
            <p>ote</p>
        </section>
        <section class="note-creator">

            <input 
                type="text" 
                placeholder="nadav input here" />
        </section>
                <span class=end-icons>
                <img src="../assets/img/svg/help.svg" alt="">
                <img src="../assets/img/svg/setting.svg" alt="">
                <img src="../assets/img/svg/apps.svg" alt="" @click="goToApp">
                <img src="../assets/img/svg/ring.svg" alt="">
                </span>
        </section>
    `,
    data() {
        return {
     
        }
    },
    methods: {
        filter() {
            this.$emit('','')
        },
        goToApp(){
            this.$router.push('/mail')
        }
    },
    func() {
        this.$emit('')
    }
}
