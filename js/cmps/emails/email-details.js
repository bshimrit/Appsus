import emailService from '../../services/email.service.js'

export default {
    props: {id:''},
    data(){
        return {
            email:{}
        }
    },
    watch: {
        id: function (newId) {
            emailService.getEmailById(newId)
        .then(selectedemail => {
          this.email = selectedemail;
        });
        }
    },
    methods:{
        emitDelete(){
            this.$emit('deleteEmail',this.email.id);
        }
    },
    template:`
    <section class="email-details">
        <h1>EmailDetails</h1>
        <!-- <p >{{id}}</p> -->
        <p>{{email.subject}}</p>
        <button @click="emitDelete()">delete</button>
    </section>
    `
}