
export default {
    template:`
    <section id="map" class="map">
        {{getMap}}
    </section>
    `
    ,
    computed: {
        getMap(){
            return this.emitMap();
        }
    },
    methods:{
        emitMap(){
            this.$emit('loadMap');
        }
    }
}