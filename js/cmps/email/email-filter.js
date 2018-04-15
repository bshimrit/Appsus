
export default {
    data(){
        return {
            filter:{text:'',emailStatus:'All'}
        }
    },
    methods: {
        emitFilter(){
            this.$emit('filtered',this.filter);
        },
        searchEmail: _.debounce(function (e) {
                this.emitFilter();
        }, 500),
    },
    template: `
        <section class="ctrl-bar email-filter">
            <input class="input is-primary" type="text" v-model="filter.text" @input="searchEmail" placeholder="Search"/>
            <div class="radio-group"> 
                <input id="all" type="radio" v-model="filter.emailStatus" value="All" name="emailStatus" @change="emitFilter">
                <label for="all">All</label>
                <input id="read" type="radio" v-model="filter.emailStatus" value="Read" name="emailStatus" @change="emitFilter">
                <label for="read">Read</label>
                <input id="unread" type="radio" v-model="filter.emailStatus" value="Unread" name="emailStatus" @change="emitFilter">
                <label for="unread">Unread</label>
            </div>
        </section>
        `,
    components:{
    }
    
}