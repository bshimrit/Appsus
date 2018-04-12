import emailPreview from './email-preview.js'


export default {
    props: ['emails'],
    template:`
    <section class="email-list vertical">
        <h1>EmailList</h1>
        <ul>
            <li v-for="email in emails" :class="selected(email)">
                <router-link :to=detailEmailRoute(email) >
                    <email-preview :email="email" @click.native="selectedEmail(email)"></email-preview>
                </router-link>
                <hr>
            </li>
        </ul>
    </section>
    `,
    data(){
        return {
            emailSelected: null
        }
    },
    components:{
        emailPreview
    },
    methods: {
        detailEmailRoute(email){
            return "/email/details/" + email.id;
        },
        selectedEmail(email){
            this.emailSelected = email;
        },
        selected(email){
            var curEmail = (email ? email : this.emails[0]);
            var selectedEmail = this.emailSelected ? this.emailSelected : this.emails[0];
            return {selected: selectedEmail === curEmail};
        }
    }

}