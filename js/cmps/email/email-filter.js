export default {
    data(){
        return {
            filter:{text:'',emailStatus:'All'}
        }
    },
    methods: {
        emitFilter(){
            this.$emit('filtered',this.filter);
        }
    },
    template: `
        <section class="container book-filter">
            <label>
                Search
                <input type="text" v-model="filter.text" @input="emitFilter" />
            </label>
            <div> 
                <label>
                    Status
                    <label >
                        <input type="radio" v-model="filter.emailStatus" value="All" name="emailStatus" @change="emitFilter">
                        All
                    </label>
                    <label >
                        <input type="radio" v-model="filter.emailStatus" value="Read" name="emailStatus" @change="emitFilter">
                        Read
                    </label>
                    <label >
                        <input type="radio" v-model="filter.emailStatus" value="Unread" name="emailStatus" @change="emitFilter">
                        Unread
                    </label>
                </label> 
            </div>
        </section>
        `
}