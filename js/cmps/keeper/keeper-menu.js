export default {
    props:['menuOpen'],
    template: `
    <section>
        <div class="flex flex-column compose-btn">
            <ul class="keeper-menu flex flex-column menu-btn pointer" v-if="open">
                <li class="fa clear-btn base-btn" @click="emitAdd('noteType')"></li>
                <li class="fa clear-btn base-btn"@click="emitAdd('listType')"></li>
                <li class="fa clear-btn base-btn" @click="emitAdd('reminderType')"></li>
            </ul>
            <button @click="open = !open" class="fa clear-btn base-btn"></button>
        </div>
    </section>`,
    data(){
        return {
            open: this.menuOpen
        }

    },
    methods:{
        emitAdd(type){
            this.$emit('addKeep',type)
        }
    } 
        
}