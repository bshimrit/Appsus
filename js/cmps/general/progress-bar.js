export default {
    props: ['progressValue'] ,
    template: `
        <section class="progress-bar">
            <progress class="progress is-primary" :value="progressValue" :max="100"></progress>
            <div class="progress-value"><slot></slot></div>
        </section>
    `
}



