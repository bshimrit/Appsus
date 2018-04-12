export default {
    props: ['email'],
    template:`
    <section class="email-preview" :class="{unread: !email.isRead}" >
            <p>From: {{email.name}} Sent at: {{email.sentAt}}</p>
            <p> Subject: {{email.subject}} </p>
        </ul>
    </section>
    `
}