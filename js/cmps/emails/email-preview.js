export default {
    props: ['email'],
    template:`
    <section class="email-preview">
            <p>From: {{email.name}}</p>
            <p> Subject: {{email.subject}} </p>
        </ul>
    </section>
    `
}