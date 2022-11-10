
export default {
    props: ['note'],
    template: `
<section>
    <h2>{{note.info.label}}</h2>
    
    <ul>
        <li class="flex" v-for="todo in notDoneTodos" :v-if="todo.doneAt" @click="setDone(todo.id)">
            <p :class="{done:todo.doneAt}">{{todo.txt}}</p>
            <button @click="deleteTodo(todo.id)">x</button>
        </li>
    </ul>
    <ul>
        <li class="flex" v-for="todo in doneTodos" :v-if="todo.doneAt">
            <p :class="{done:todo.doneAt}">{{todo.txt}}</p>
            <button @click="deleteTodo(todo.id)">x</button>
        </li>
    </ul>
    <form @submit.prevent="addTodo">
        <input type="text" v-model="todo"/>
        <button>add</button>
    </form>
    
       
        <!-- <pre>{{info}}</pre> -->

</section>
`,
    data() {
        return {
            todo: null
        }
    },
    methods: {

        addTodo() {
            if (!this.todo) return
            this.$emit('add',this.note.id,this.todo)
            this.todo = ''
        },
        deleteTodo(todoId){
            this.$emit('deleteTodo',this.note.id,todoId)
        },
        setDone(todoId){
            console.log('todoId:',this.note.id, todoId)
            this.$emit('todoDone',this.note.id,todoId)
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
        
    }
}