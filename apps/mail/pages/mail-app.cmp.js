import { mailService } from "../services/mail.service.js"
import { showErrorMsg, showSuccessMsg, eventBus } from '../../../services/event-bus.service.js'


import mailList from '../cmps/mail-list.cmp.js'
import tabFilter from '../cmps/mail-tab-filter.cmp.js'
import mailCompose from '../cmps/mail-compose.cmp.js'
import mailNav from '../cmps/mail-nav.cmp.js'
import mailHeader from '../cmps/mail-header.cmp.js'

export default {
    name: 'mail-app',
    template:/*html*/ `
    <mail-header  @filter="setFilter"/> 
    <section class="mail-app">
    <mail-nav @setCompose="isComposing = !isComposing" @filterBy='setTabFilter' :unread="unreadCount.Primary"/>
    <section class="main-content" v-if="!getParamsId">
     
        <tab-filter @tabFilter="setTabFilter" :unread="unreadCount" />
        <!--<router-link to="/mail/edit">Send a new mail</router-link>-->
        <mail-list
        v-if="mails"
        @remove="removeMail"
        :mails="mailsToShow"
        @viewMail="showMail"
        @check="checkMail"
        @read="toggleRead"
        @trash="toggleTrash"
        @starred="starred"
        @compose="setDraftCompose"
        />
        <mail-compose v-if="isComposing" @mailSent="addMail" @mailSaved="addDraftMail" @composeClose="isComposing=false" :mail="draftMail"/>
        </section>
    <router-view v-else/>

    </section>
	`,
    data() {
        return {
            draftMail: null,
            mails: null,
            filterBy: {
                subject: '',
                from: '',
                type: ''
            },
            unreadCount: {
                Primary: 0,
                Promotion: 0,
                Social: 0
            },
            isComposing: false
        }
    },
    created() {
        mailService.query()
            .then(mails => {
                this.mails = mails
                this.mails.forEach(mail => {
                    if (!mail.isRead) {
                        this.unreadCount.Primary += 1
                        this.unreadCount[mail.type] += 1
                    }
                })
            })
            
            eventBus.on('noteToMail',this.noteToMail)
    },
    
    methods: {
        removeMail(mailId) {
            mailService.remove(mailId)
                .then(() => {
                    const idx = this.mails.findIndex(mail => mail.id === mailId)
                    let mail = this.mails[idx]
                    if (!mail.isRead) {
                        this.unreadCount[mail.type] -= 1
                        this.unreadCount.Primary -= 1
                    }
                    this.mails.splice(idx, 1)
                    showSuccessMsg(`Mail ${mailId} deleted`)
                })
                .catch(err => {
                    console.log('OOPS', err)
                    showErrorMsg('Cannot remove mail')
                })
        },
        toggleRead(mail) {
            console.log('hi')
            mail.isRead = !mail.isRead
            this.updateReadCount(mail)
            mailService.save(mail)
                .then(() => {
                    showSuccessMsg(`Mail ${mail.id} read`)
                })
                .catch(err => {
                    console.log('OOPS', err)
                    showErrorMsg('Cannot read mail')
                })
        },
        toggleTrash(mail) {
            mail.isTrash = !mail.isTrash
            mailService.save(mail)
                .then(() => {
                    showSuccessMsg(`Mail ${mail.id} Trashed`)
                })
                .catch(err => {
                    console.log('OOPS', err)
                    showErrorMsg('Cannot trash mail')
                })
        },
        addMail(mail) {
            // this.mails.unshift(mail)
            this.isComposing = false
            this.updateReadCount(mail)
        },
        addDraftMail(mail) {
            if (mail.id === this.mails[0].id) return
            this.mails.unshift(mail)
        },
        updateReadCount(mail) {
            this.unreadCount[mail.type] += mail.isRead ? -1 : +1
            this.unreadCount.Primary += mail.isRead ? -1 : +1
        },
        setFilter(filterBy) {
            this.filterBy.subject = filterBy.subject
        },
        setTabFilter(filterBy) {
            this.filterBy.type = filterBy
        },
        filterAll(val) {
            this.filterBy[val] = true
        },
        showMail(mailId) {
            this.$router.push('/mail/' + mailId)
        },
        checkMail(mail) {
            mail.isChecked = !mail.isChecked
            mailService.save(mail)
                .then(() => {
                    showSuccessMsg(`Mail ${mail.id} checked`)
                })
                .catch(err => {
                    console.log('OOPS', err)
                    showErrorMsg('Cannot check mail')
                })
        },
        noteToMail(note){
            const mail = mailService.getEmptyMail()
            mail.subject = note.info.title
            if(note.info.txt){
                mail.body = note.info.txt
            }else if(note.info.url){
                mail.body = note.info.url
            }else if(note.info.todos){
                let todos = note.info.todos
                mail.body = todos.map(todo =>{
                    const options = {
                        year: 'numeric', month: 'numeric', day: 'numeric',
                        hour: 'numeric', minute: 'numeric', 
                        hour12: false,
                      };
                      const time = new Intl.DateTimeFormat('en-US', options).format(todo.doneAt)

                   return `✔ ${todo.txt} at ${time} `
                }).join('\n')
            }else {
                mail.body = ''
            }
            
            this.setDraftCompose(mail)
        },

        starred(mail) {

            mail.IsStarred = !mail.IsStarred
            mailService.save(mail)
                .then(() => {
                    showSuccessMsg(`Mail ${mail.id} checked`)
                })
                .catch(err => {
                    console.log('OOPS', err)
                    showErrorMsg('Cannot check mail')
                })
        },
        setDraftCompose(mail) {

            this.draftMail = mail
            this.isComposing = true
        }
    },
    computed: {
        mailsToShow() {
            const regex = new RegExp(this.filterBy.subject, 'i')
            let mails = this.mails.filter(mail => {
                return regex.test(mail.subject) ||
                    regex.test(mail.body) ||
                    regex.test(mail.from)
            })

            if (this.filterBy.type === 'trash') {
                mails = mails.filter(mail => mail.isTrash)
                return mails
            }
            if (this.filterBy.type === 'unread') mails = mails.filter(mail => !mail.isRead)
            else if (this.filterBy.type === 'sent') mails = mails.filter(mail => mail.from === 'your-mail@someting.com')
            else if (this.filterBy.type === 'draft') {
                mails = mails.filter(mail => mail.isDraft && !mail.isTrash)
                return mails
            }
            else if (this.filterBy.type === 'starred') mails = mails.filter(mail => mail.IsStarred)
            else mails = mails.filter(mail => mail.type.includes(this.filterBy.type))

            mails = mails.filter(mail => !mail.isTrash && !mail.isDraft)
            return mails

        },
        getParamsId() {
            return this.$route.params.id
        }
    },
    components: {
        mailList,
        tabFilter,
        mailCompose,
        mailNav,
        mailHeader
    }
}
