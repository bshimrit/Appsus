import emailService from '../../services/email.service.js'

import emailList from '../../cmps/emails/email-list.js'
// import emailFilter from '../../cmps/email/email-filter.js'

export default {
    template:`
    <section class="email">
        <router-link to="/email/compose">Compose</router-link>
        <router-link to="/email">Close</router-link>
        <section class="flex">
            <email-list :emails="emails"></email-list>
            <router-view></router-view>
        </section>

    </section>    `,
    data() {
        return {
            emails: []
        }
    },
    created() {
        emailService.query()
            .then(emails => {this.emails = emails})
    },
    components:{
        emailList
    }
}