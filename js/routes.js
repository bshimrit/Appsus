import home from './pages/general/home.js'
import about from './pages/general/about.js'
import emailApp from './pages/email/email-app.js'
import emailCompose from './pages/email/email-compose.js'
import emailDetails from './pages/email/email-details.js'
import placeApp from './pages/place/place-app.js'
import placeEdit from './pages/place/place-edit.js'
import keeperApp from './pages/keeper/keeper-app.js'


const routes = [
    {path: '/', component: home},
    {path: '/about', component: about},
    {path: '/email', component: emailApp,
      children: [
        {path: 'details/:id', components: {default: emailDetails},props: {default: true} },
        {path: 'compose', component: emailCompose}
      ]
    },
    {path: '/place', component: placeApp,
      children: [
        {path: 'edit/:id', components: {default: placeEdit},props: {default: true}},
      ]
    },
    {path: '/keeper', component: keeperApp},
  ];

Vue.use(VueRouter);
var myRouter = new VueRouter({routes})

export default myRouter;