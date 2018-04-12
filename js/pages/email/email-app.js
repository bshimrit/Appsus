import emailService from '../../services/email.service.js'
import eventBus, { EMAIL_READ } from '../../services/event-bus.service.js'

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
                <email-list :emails="emails" :selectedEmail="selectedEmail" @deleteEmail="deleteEmail" @selected="updateRead"></email-list>
                <router-view @sendEmail="sendEmail"></router-view>
            </section>
        </div>
    </section>`,
    data() {
        return {
            emails: [],
            filter: null,
            selectedEmail: null
        }
    },
    created() {
        emailService.query()
            .then(emails => {
                this.emails = emails
                this.selectedEmail = this.emails[0];
                this.detailEmailRoute();
                this.updateRead(this.selectedEmail);
            })
    },
    components:{
        emailList,
        emailFilter,
        progressBar,
        eventBus
    },
    methods: {
        detailEmailRoute(){
            if (this.selectedEmail){
                this.$router.push("/email/details/" + this.selectedEmail.id);
                this.updateRead(this.selectedEmail);
            } else {
                this.$router.push("/email");
            }
        },
        deleteEmail(emailId){
            var idx = this.emails.findIndex(email =>  email.id === emailId );
            emailService.deleteEmail(this.emails[idx].id)
                .then(res => {
                    emailService.query()
                    .then(emails => {
                        this.emails = emails;
                        this.selectedEmail = this.emails[(idx !== 0 ? idx - 1 : 0)];
                        this.detailEmailRoute();
                    })        
                })
        },
        setFilter(filter) {
            this.filter = filter;
            emailService.query(this.filter)
            .then(emails => {
                this.emails = emails;
                this.selectedEmail = this.emails[0];
                this.detailEmailRoute();
            })
        },
        updateRead(email){
            if (email)
                this.selectedEmail = email;
            emailService.setRead(email.id)
            .then(() => {
                emailService.query(this.filter)
                
            .then(emails => {
                this.emails = emails
                eventBus.$emit(EMAIL_READ, {read:emailService.countReadEmails(this.emails),all:this.emails.length});})
            })

        },
        sendEmail(email){
            emailService.sendEmail(email)
            .then(res => {
                emailService.query()
                .then(emails => {
                    this.emails = emails
                    if (!this.selectedEmail) this.selectedEmail = this.emails[0];
                    this.detailEmailRoute();
                })
            })
        }
    }
}