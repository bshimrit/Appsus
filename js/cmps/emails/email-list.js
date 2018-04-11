import emailPreview from './email-preview.js'


export default {
    props: ['emails'],
    template:`
    <section class="email-list vertical">
        <h1>EmailList</h1>
        <ul>
            <li v-for="email in emails">
                <router-link :to=detailEmailRoute(email) >
                    <email-preview :email="email"></email-preview>
                </router-link>
                <hr>
            </li>
        </ul>
    </section>
    `,
    components:{
        emailPreview
    },
    methods: {
        detailEmailRoute(email){
            return "/email/details/" + email.id;
        },
        returnToEmail(){
        }
    }

}