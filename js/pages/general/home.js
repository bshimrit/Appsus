export default {
    template:`
    <section class="font-bold container flex space-between">
    <div class="flex flex-column align-center" >
        <router-link to="/email">
            <img class="shake" src="img/Email.png" />
        </router-link>
        <div>missEmail</div>
    </div>
    <div class="flex flex-column align-center" >
        <router-link to="/place">
            <img class="shake" src="img/Map.png" />
        </router-link>
        <div> missPlace </div>
    </div>
    <div class="flex flex-column align-center" >
        <router-link to="/keeper">
            <img class="shake" src="img/Task.png" />
        </router-link>
        <div>missKeeper</div>
    </div>
    </section>
    `
}