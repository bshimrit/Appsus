import emailPreview from './email-preview.js'


export default {
    props: ['emails', 'selectedEmail'],
    template:`
    <section v-if="emails.length" class="email-list">
        <ul class="email-container scroll-y">
            <li v-for="email in emails" :class="checkSelected(email)" class="pointer">
                    <email-preview :class="checkUnread(email)" @click.native="emitSelected(email)" :email="email"></email-preview>
                <hr class="hr">
            </li>
        </ul>
    </section>
    `,
    // <router-link :to="detailEmailRoute(email)"></router-link>
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
        detailEmailRoute(email){
            return "/email/details/" + email.id;
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