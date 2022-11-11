import { utilService } from "../../../services/util.service.js"

export default {
    props:['state'],
    template: `
<section >
    <form @submit.prevent="addNote" class="add-note">
        <input
         v-model="note.info.label" 
         :type="search" 
         placeholder="My Todos..."
         />
         <form class="add-note new-todo" @submit.stop.prevent="addTodo" :class="animate" >
             <input 
             v-if="note.info.todos" 
             v-for="todo in note.info.todos" 
             v-model="todo.txt"
             type="text" 
             />
             <button class="btn-add-todo"><i class="fa-solid fa-plus"></i></button>
             <input v-model="todo.txt" :type="search" placeholder="Finish Homework" ref="todo"/>
        </form>
        <button><i class="fa-solid fa-plus"></i></button>
    </form>
    <div>
    </div>
</section>
`,
    data() {
        return {
            note: {
                type: 'note-todos',
                isPinned: false,
                info: {
                    label: '',
                    todos: [

                    ]
                },
                style: {
                    backgroundColor: '#cb75f0'
                }
            },
            todo:
            {
                txt: '',
                doneAt: null,
                id: utilService.makeId()
            }
        }
    },
    mounted() {
        this.$refs.todo.focus()
    },
    methods: {
        addTodo() {
            if (!this.todo.txt) return
            this.note.info.todos.push(this.clone(this.todo))

            this.todo = {
                txt: '',
                doneAt: null,
                id: utilService.makeId()
            }

            this.$refs.todo.focus()
        },
        clone(newNote = this.note) {
            return JSON.parse(JSON.stringify(newNote))
        },
        addNote() {
            const note = JSON.parse(JSON.stringify(this.note))
            this.$emit('addNote', note)
        }
    },
    computed: {
        animate() {
            return { 'animate__animated animate__slideInDown': this.state }
        }
    },
    components: {
    }
}