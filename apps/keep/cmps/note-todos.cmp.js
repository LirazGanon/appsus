import { eventBus } from "../../../services/event-bus.service.js"
import { utilService } from "../../../services/util.service.js"



export default {
    name: 'note-todo',
    props: ['note'],
    template: `
<section class="note">
    <h2>{{note.info.label}}</h2>

    <ul class="clean-list">
        <li class="todo-item flex" v-for="todo in notDoneTodos" :v-if="todo.doneAt" @click="setDone(todo.id)">
            <i class="fa-regular fa-square"></i>
            <input 
                :class="{done:todo.doneAt}"
                v-model="todo.txt" 
                @click.stop
                @change="updateTodo"/>
            <button @click="deleteTodo">
                <i class="fa-solid fa-xmark"></i>
            </button>
        </li>
    </ul>
    
    <ul class="clean-list">
        <li class="todo-item flex" v-for="todo in doneTodos" :v-if="todo.doneAt" @click="setDone(todo.id,false)">
            <i class="fa-regular fa-square-check"></i>
            <input
                :class="{done:todo.doneAt}"
                v-model="todo.txt"
                @click.stop
                @change="updateTodo"/>
            <button @click="deleteTodo(todo.id)">
                <i class="fa-solid fa-xmark"></i>
            </button>
        </li>
    </ul>
    <form @submit.prevent="addTodo" class="add-todo">
        <input type="text" v-model="todo.txt"/>
        <button><i class="fa-solid fa-plus"></i></button>
    </form>
    
       

</section>
`,
    data() {
        return {
            newNote: this.clone(),
            todo: {
                txt: '',
                doneAt: null,
                id: utilService.makeId()
            },
        }
    },
    methods: {
        updateEmit(note) {
            eventBus.emit('updated', note)

        },
        addTodo() {
            if (!this.todo.txt) return
            this.newNote.info.todos.push(this.clone(this.todo))

            this.updateEmit(this.clone(this.newNote))
            this.todo = {
                txt: '',
                doneAt: null,
                id: utilService.makeId()
            }
        },
        deleteTodo(todoId) {
            console.log(todoId);
            const idx = this.newNote.info.todos.findIndex(todo => todo.id === todoId)
            this.newNote.info.todos.splice(idx, 1)
            this.updateEmit(this.clone(this.newNote))

        },
        setDone(todoId, isDone = true) {
            const todo = this.newNote.info.todos.find(todo => todo.id === todoId)
            isDone ?
                todo.doneAt = Date.now() :
                todo.doneAt = null

            this.updateEmit(this.clone(this.newNote))

        },
        updateTodo() {
            this.updateEmit(this.clone(this.newNote))
        }
        ,
        clone(newNote = this.note) {
            return JSON.parse(JSON.stringify(newNote))
        },
        getEmptyTodo() {
            return
        },

    },
    computed: {
        doneTodos() {
            return this.newNote.info.todos.filter(todo => todo.doneAt)
        },
        notDoneTodos() {
            return this.newNote.info.todos.filter(todo => !todo.doneAt)
        },
        currNote() {
            return this.newNote
        },


    },
    components: {

    },
    watch: {
        currNote() {
            console.log(this.newNote);
        }
    }
}