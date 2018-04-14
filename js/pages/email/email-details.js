import emailService from '../../services/email/email.service.js'

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
        closeDetails() {
            this.$emit('closeDetails');
        }
    },
    template: `
    <section class="email-container scroll-y">
        <div class="font-bold flex space-between">
            <div>
                <p>From: {{email.name}}</p>
                <p>Subject: {{email.subject}}</p>
            </div>
            <button class="close-detail-btn button is-primary" @click.prevent="closeDetails">x</button>
        </div>
        <hr>
        <p>{{email.body}}</p>
 
    </section>
    `
}