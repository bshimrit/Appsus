import emailService from '../../services/email.service.js'

import emailList from '../../cmps/email/email-list.js'
import emailFilter from '../../cmps/email/email-filter.js'
import progressBar from '../../cmps/progress-bar.js'

export default {
    template:`
    <section class="email">
        <router-link to="/email/compose">Compose</router-link>
        <!-- <router-link :to=detailEmailRoute()>Close</router-link> -->
        <progressBar></progressBar>
        <div class="flex flex-column">
            <email-filter @filtered="setFilter"></email-filter>
            <section class="flex">
                <email-list :emails="emails" @deleteEmail="deleteEmail" @selected="updateRead"></email-list>
                <router-view @sendEmail="sendEmail"></router-view>
            </section>
        </div>
    </section>`,
    data() {
        return {
            emails: [],
            filter: 'All',
            selectedEmail: null
        }
    },
    created() {
        emailService.query()
            .then(emails => this.emails = emails)
    },
    components:{
        emailList,
        emailFilter,
        progressBar
    },
    methods: {
        detailEmailRoute(idx){
            var emailId = this.emails[idx ? idx : 0].id;
            if (this.emails.length) return "/email/details/" + emailId;
        },
        deleteEmail(emailId){
            var idx = this.emails.findIndex(email =>  email.id === emailId );
            emailService.deleteEmail(this.emails[idx].id)
                .then(res => {
                    emailService.query()
                    .then(emails => this.emails = emails)        
                    this.$router.push("/email/details/" + this.detailEmailRoute(idx < this.emails.length - 1 ? idx + 1 : 0));
                })
        },
        setFilter(filter) {
            this.filter = filter;
            emailService.query(filter)
            .then(emails => this.emails = emails)
        },
        updateRead(email){
            this.selectedEmail = email;
            emailService.setRead(email.id);
        },
        sendEmail(email){
            emailService.sendEmail(email)
            .then(res => {
                emailService.query()
                .then(emails => this.emails = emails)
                this.$router.push(this.detailEmailRoute());    
            })
        }
    }
}