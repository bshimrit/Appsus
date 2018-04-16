export default {
    props: ['keep','editMode'],
    template:`<section @click="emitSelected" class="flex flex-column justify-end align-start">
        <input type="text" class="font-bold" placeholder="Title" v-model="curKeep.title" />
        <input type="text" v-model="curKeep.notes[0]" />
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
    }
}