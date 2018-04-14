import eventBus, {USR_MSG_DISPLAY} from '../../services/general/event-bus.service.js'

export default {
    template:`
    <section class="container">
        <div class="team-member">
            <img class="mx-auto rounded-circle" src="img/avatar.jpg" alt="">
        </div>
        <div class="col-sm-8 flex-align-center">
            <div class="font-bold">
                <h4>Shimrit Snapir</h4>
                <p class="text-muted">Master of none</p>
            </div>
            <p class="large text-muted  about-description">I am an Industrial engineer who quickly discovered my real passion is development.
                I have a 10+ year exprience in software development, implementation and product management.
                I have recently joined the web development community and looking forward to making the best of this fresh start, 
                while putting my experience to use in this new and exciting world.
            </p>    
        </div>
  </section>
    `,
    
}