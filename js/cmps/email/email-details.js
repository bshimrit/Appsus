import emailService from '../../services/email.service.js'

export default {
    props: { id: '' },
    data() {
        return {
            email: {}
        }
    },
    watch: {
        id: {
            // immediate: true,
            handler (newId) {
                console.log('inside watch in email details')
                emailService.getEmailById(newId)
                    .then(selectedemail => {
                        this.email = selectedemail;
                    });
            }
        }


    },
    methods: {
    },
    template: `
    <section class="email-details">
        <h1>EmailDetails</h1>
        <!-- <p >{{id}}</p> -->
        <p>{{email.subject}}</p>
 
    </section>
    `
}