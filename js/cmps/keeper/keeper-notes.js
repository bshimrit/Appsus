export default {
    props: ['keep','editMode'],
    template:`<section @click="emitSelected" class="flex flex-column justify-end align-start">
        <input type="text" class="font-bold" placeholder="Title" v-model="curKeep.title" />
            <div contenteditable="editMode">{{curKeep.notes[0]}}</div>
        </section>
    
    `,
    data(){
        return {
            curKeep: this.keep
        }
    },
    methods:{
        emitSelected(){
            this.$emit('selected',this.keep);
        }
    }}