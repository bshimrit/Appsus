import emailPreview from './email-preview.js'


export default {
    props: ['emails', 'selectedEmail'],
    template:`
    <section class="email-list vertical">
        <h1>EmailList</h1>
        <ul>
            <li v-for="email in emails" :class="[checkSelected(email), checkUnread(email)]">
                <router-link :to="detailEmailRoute(email)" @click.native="emitSelected(email)">
                    <email-preview :email="email"></email-preview>
                </router-link>
                <button @click.stop="emitDelete(email)">delete</button>
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
        },
        emitSelected(email){
            this.$emit('selected', email)
        },
        checkSelected(email){
            return {selected: this.selectedEmail.id === email.id };
        },
        checkUnread(email){
            return {unread: !email.isRead};
        }
    
    }

}