export default {
    template:`
    <section class="place-search">
        <form class="flex" @submit.prevent="searchAddress">
                <label>
                    <input class="input is-primary" type="text" v-model="searchValue" placeholder="Search address" />
                </label>
                <button class="button is-primary" type="submit">Search</button>
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