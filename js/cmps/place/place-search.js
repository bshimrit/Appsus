export default {
    template:`
    <section class="place-search">
        <form class="flex" @submit.prevent="searchAddress">
                <label>
                    <input type="text" v-model="searchValue" placeholder="Search address" />
                </label>
                <button class="clear-btn1" type="submit">Search</button>
            </form>
    </section>
    `,
    data(){
        return {
            searchValue: ''
        }
    },
    methods:{
        searchAddress(){
            this.$emit('searchLocation',this.searchValue);
        }
    }   
}