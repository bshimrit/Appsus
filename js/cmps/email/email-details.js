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
            immediate: true,
            handler (newId) {
                if (newId != ''){
                    emailService.getEmailById(newId)
                        .then(selectedemail => {
                            this.email = selectedemail;
                    });
                }
            }
        }


    },
    methods: {
    },
    template: `
    <section class="emailDetails">
        <h1>EmailDetails</h1>
        <!-- <p >{{id}}</p> -->
        <p>{{email.subject}}</p>
        <p>{{email.body}}</p>
 
    </section>
    `
}