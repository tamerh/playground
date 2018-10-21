import Vue from 'nativescript-vue'
import App from './components/App'
import VueDevtools from 'nativescript-vue-devtools'


import FloatLabel from './components/FloatLabel';
import RadListView from 'nativescript-ui-listview/vue';

import BetDb from './store/BetDb.js';

export const dbService = new BetDb();

Vue.prototype.$db = dbService;
dbService.init(initVue);

if(TNS_ENV !== 'production') {
  Vue.use(VueDevtools)
}
// Prints Vue logs when --env.production is *NOT* set while building
Vue.config.silent = (TNS_ENV === 'production')

Vue.registerElement('RadSideDrawer', () => require('nativescript-ui-sidedrawer').RadSideDrawer);
//Vue.registerElement('RadListView', () => require('nativescript-ui-listview').RadListView);

//Vue.component('RadListView',RadListView);

// not working this way. Vue.use(RadListView);
Vue.component('FloatLabel', FloatLabel);

Vue.use(RadListView);

let vueApp = new Vue({
  render: h => h('frame', [h(App)])
})

function initVue(){
  console.log("Vue init girildi..")
  vueApp.$start()    
}