
export default {
    name:'note-todo',
    props: ['note'],
    template: `
<section>
    <h2>{{note.info.label}}</h2>
    
    <ul>
        <li class="flex" v-for="todo in notDoneTodos" :v-if="todo.doneAt" @click="setDone(todo.id)">
            <p :class="{done:todo.doneAt}">{{todo.txt}}</p>
            <button @click="deleteTodo">x</button>
        </li>
    </ul>
    <pre>{{ newNote }}</pre>
    <ul>
        <li class="flex" v-for="todo in doneTodos" :v-if="todo.doneAt">
            <p :class="{done:todo.doneAt}">{{todo.txt}}</p>
            <input type="checkbox" />
            <button @click="deleteTodo">x</button>
        </li>
    </ul>
    <form @submit.prevent="addTodo" v-model="todo.txt">
        <input type="text" v-model="todo"/>
        <button>add</button>
    </form>
    
       

</section>
`,
    data() {
        return {
            
            todo: {
                txt: '',
                doneAt: null,
            }
            
        }
    },
    methods: {
        updateEmit(note){
            this.$emit('updated', note)
        },
        addTodo() {
            const newNote = this.clone()
            if (!this.todo.txt) return

            // this.newNote
            // this.$emit('add',this.note.id,this.todo)
            this.updateEmit(newNote)
            this.todo = ''
        },
        deleteTodo(todoId) {
            this.$emit('deleteTodo', this.note.id, todoId)
        },
        setDone(todoId) {
            console.log('todoId:', this.note.id, todoId)
            this.$emit('todoDone', this.note.id, todoId)
        },
        clone(){
            return JSON.parse(JSON.stringify(this.note))
        }
    },
    computed: {
        doneTodos() {
            return this.note.info.todos.filter(todo => todo.doneAt)
        },
        notDoneTodos() {
            return this.note.info.todos.filter(todo => !todo.doneAt)
        },
        currNote() {
            return this.newNote
        }

    },
    components: {

    },
    watch: {
        currNote() {
            console.log(this.newNote);
        }
    }
}