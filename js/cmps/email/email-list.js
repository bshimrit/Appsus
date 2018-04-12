import emailPreview from './email-preview.js'


export default {
    props: ['emails'],
    template:`
    <section class="email-list vertical">
        <h1>EmailList</h1>
        <ul>
            <li v-for="email in emails">
                <router-link :to="detailEmailRoute(email)">
                    <email-preview :email="email"></email-preview>
                    <button @click.stop="emitDelete(email)">delete</button>
                </router-link>
                <hr>
            </li>
        </ul>
    </section>
    `,
    data(){
        return {
        }
    },
    computed: {
    },
    components:{
        emailPreview
    },
    methods: {
        detailEmailRoute(mail){
            return "/email/details/" + mail.id;
        },
        emitDelete(email) {
            this.$emit('deleteEmail', email.id);
        }
    
    }

}