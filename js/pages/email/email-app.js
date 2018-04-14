import emailService from '../../services/email.service.js'

import emailList from '../../cmps/email/email-list.js'
import emailFilter from '../../cmps/email/email-filter.js'
import progressBar from '../../cmps/progress-bar.js'

export default {
    template:`
    <section class="container">
        <div class="flex email">
            <div class="left-side">
                <email-filter @filtered="setFilter"></email-filter>
                <email-list :emails="emails" :selectedEmail="selectedEmail" @deleteEmail="deleteEmail" @selected="updateRead"></email-list>
            </div>
            <div class="right-side">
                <div class="ctrl-bar">
                    <span class="font-bold">Read emails:</span>
                    <progressBar></progressBar>
                </div>
                <router-view @sendEmail="sendEmail" @cancelEmail="cancelEmail" class="email-container"></router-view>
            </div>
        </div>
        <div>
            <router-link @click.native="isCompose = !isCompose" v-if="!isCompose" class="compose-btn fa clear-btn base-btn" to="/email/compose"></router-link>
        </div>
    </section>`,
    data() {
        return {
            emails: [],
            filter: null,
            selectedEmail: null,
            isCompose: false
        }
    },
    created() {
        emailService.query()
            .then(emails => {
                this.emails = emails
                this.selectedEmail = this.emails[0];
                this.updateRead();
            })
        },
        components:{
            emailList,
            emailFilter,
            progressBar
        },
        methods: {
            detailEmailRoute(){
                if (this.selectedEmail){
                this.$router.push("/email/details/" + this.selectedEmail.id);
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
                        this.selectedEmail = this.emails.length ? this.emails[(idx !== 0 ? idx - 1 : 0)] : null;
                        this.updateRead();
                    })        
                })
        },
        setFilter(filter) {
            this.filter = filter;
            emailService.query(this.filter)
            .then(emails => {
                this.emails = emails;
                this.selectedEmail = this.emails[0];
                this.updateRead();
            })
        },
        updateRead(email){
            if (email) this.selectedEmail = email;
            if (this.selectedEmail){
                emailService.setRead(this.selectedEmail.id)
                .then(() => {
                    this.selectedEmail.isRead = true;
                    this.detailEmailRoute();
                })
            } else {
                this.detailEmailRoute();
            }
        },
        sendEmail(email){
            emailService.sendEmail(email)
            .then(res => {
                emailService.query()
                .then(emails => {
                    this.emails = emails
                    this.isCompose = !this.isCompose;
                    if (!this.selectedEmail) this.selectedEmail = this.emails[0];
                    this.detailEmailRoute();
                })
            })
        },
        cancelEmail(){
            this.isCompose = !this.isCompose;
            this.detailEmailRoute();
        }
    }
}