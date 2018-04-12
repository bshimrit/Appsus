import emailService from '../../services/email.service.js'

import emailList from '../../cmps/emails/email-list.js'
import emailFilter from '../../cmps/emails/email-filter.js'
// import emailFilter from '../../cmps/email/email-filter.js'

export default {
    template:`
    <section class="email">
        <router-link to="/email/compose">Compose</router-link>
        <!-- <router-link :to=detailEmailRoute()>Close</router-link> -->
        <div class="flex flex-column">
            <email-filter @filtered="setFilter"></email-filter>
            <section class="flex">
                <email-list :emails="emails"></email-list>
                <router-view @deleteEmail="deleteEmail"></router-view>
            </section>
        </div>
    </section>`,
    data() {
        return {
            emails: [],
            selectedEmail: {}
        }
    },
    created() {
        emailService.query()
            .then(emails => {this.emails = emails})
    },
    components:{
        emailList,
        emailFilter
    },
    methods: {
        detailEmailRoute(idx){
            if (this.emails.length) return "/email/details/" + this.emails[idx || 0].id;
        },
        deleteEmail(emailId){
            var idx = this.emails.findIndex(email => {
                return email.id === emailId});
            emailService.deleteEmail(emailId)
                .then(res => {
                    this.$router.push(this.detailEmailRoute(idx < this.emails.length - 1 ? idx + 1 : 0));
                })
        },
        setFilter(filter) {
            emailService.query(filter)
            .then(emails => this.emails = emails)
        }
    }
}