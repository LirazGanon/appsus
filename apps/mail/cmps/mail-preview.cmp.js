export default {
    props: ['mail'],
    template: `
        <article class="mail-preview">
            <h2>{{ mail.subject }}</h2>
            <h3>{{ formattedTime}} </h3>
            <h3>{{ mail.from }} </h3>
        </article>
    `,
    computed: {
        formattedTime() {
            return new Intl.DateTimeFormat('en-US').format(this.mail.sentAt)
        }
    }
}