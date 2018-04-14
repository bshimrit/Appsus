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
    <section class="email-container scroll-y">
        <div class="font-bold">
            <p>From: {{email.name}}</p>
            <p>Subject: {{email.subject}}</p>
        </div>
        <hr>
        <p>{{email.body}}</p>
 
    </section>
    `
}