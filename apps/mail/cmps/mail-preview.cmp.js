export default {
    props: ['mail'],
    template:/*html*/ `
        <article class="mail-preview flex" :class="{read:mail.isRead}">
            <h2>{{ shortedSubject }}</h2>
            <h3>{{ shortedBody}} </h3>
            <h3>{{ formattedTime}} </h3>
        </article>
    `,
    computed: {
        formattedTime() {
            return new Intl.DateTimeFormat('en-US').format(this.mail.sentAt)
        },
        shortedSubject() {
            const str = this.mail.subject
            const n = 25
            return (str.length > n) ? str.slice(0, n-1) + '...'  : str; 
        },
        shortedBody() {
            const str = this.mail.body
            const n = 50
            return (str.length > n) ? str.slice(0, n-1)  : str; 
        }
    }
}