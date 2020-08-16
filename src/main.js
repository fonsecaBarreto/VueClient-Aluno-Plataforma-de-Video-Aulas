import "bootstrap/dist/css/bootstrap.css"
import "./index.css"
import { library } from '@fortawesome/fontawesome-svg-core'
import { fas } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { faFacebook ,faInstagram, faYoutube } from '@fortawesome/free-brands-svg-icons'
import VueCoreVideoPlayer from 'vue-core-video-player'

Vue.use(VueCoreVideoPlayer )
library.add(faFacebook,faYoutube,faInstagram); library.add(fas)
library.add(fas)
Vue.component('font-awesome-icon', FontAwesomeIcon)
import VueSwal from 'vue-swal'
Vue.use(VueSwal)
import Vue from 'vue'
import App from './App.vue'
import store from "./config/store"
import router from "./config/router"
Vue.config.productionTip = false

new Vue({
  router,store,
  render: h => h(App),
}).$mount('#app')

Vue.filter("dateformat",
  (dataInput)=>{
    if(dataInput != null){
      const data = new Date(dataInput);
      const dataFormatada = data.toLocaleDateString('pt-BR', {timeZone: 'UTC'});
      return dataFormatada
    }return ""
  }
)
