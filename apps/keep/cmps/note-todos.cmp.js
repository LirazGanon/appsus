import noteActions from './note-actions.cmp.js'

export default {
    props: ['note'],
    template: `
<section class="note">
    <h2>{{note.info.label}}</h2>
    
    <ul>
        <li v-for="todo in notDoneTodos" :v-if="todo.doneAt">
            <p :class="{done:todo.doneAt}">{{todo.txt}}</p>
        </li>
    </ul>
    <ul>
        <li v-for="todo in doneTodos" :v-if="todo.doneAt">
            <p :class="{done:todo.doneAt}">{{todo.txt}}</p>
        </li>
    </ul>
    <form @submit.prevent="addTodo">
        <input type="text" v-model="todo"/>
        <button>add</button>
    </form>
        <note-actions 
        @delete="deleteNote" />
       
        <!-- <pre>{{info}}</pre> -->

</section>
`,
    data() {
        return {
            todo: null
        }
    },
    methods: {
        deleteNote() {
            this.$emit('delete', this.note.id)
        },
        addTodo() {
            if (!this.todo) return
            this.$emit('add',this.note.id,this.todo)
            this.todo = ''
        }
    },
    computed: {
        doneTodos() {
            return this.note.info.todos.filter(todo => todo.doneAt)
        },
        notDoneTodos() {
            return this.note.info.todos.filter(todo => !todo.doneAt)
        },

    },
    components: {
        noteActions
    }
}