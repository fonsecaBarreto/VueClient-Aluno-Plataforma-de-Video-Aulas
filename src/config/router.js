import Vue from "vue"
import VueRouter from "vue-router"
Vue.use(VueRouter)
import MainTemplate from "../components/templates/Main"

import Login from "../components/pages/login/LoginScreen"
import modulos from "../components/pages/modulos/ModulosScreen"
import Aulas from "../components/pages/aulas/Aulas"
import Exercises from "../components/pages/exercicios/Exercises"
import MinhaConta from "../components/pages/minhaconta/MinhaConta"
import Ranking from "../components/pages/ranking/Ranking"
import Feed from "../components/pages/feed/Feed";
import InteractionCollection from "../components/pages/feed/InteractionCollection"
import Support from '../components/pages/support/Support'
import Projectnotify from '../components/utils/ProjectNotify'
const NotFound = resolve =>{
  require.ensure(["../components/pages/Error/NotFound"],()=>{
    resolve(require("../components/pages/Error/NotFound"))
  })
}
/* const ManutenceScreen = resolve =>{
  require.ensure(["../components/pages/manutence/Manutence"],()=>{
    resolve(require("../components/pages/manutence/Manutence"))
  })
} */
const routes = [


  { name:"Support",path:"/support",components:{templatelayout:MainTemplate,content:Support}},
  { name:"Feed",path:"/interactions/:path",components:{templatelayout:MainTemplate,content:InteractionCollection}},
  { name:"Feed",path:"/interactions",components:{templatelayout:MainTemplate,content:Feed}},
  { path:"/ranking",components:{templatelayout:MainTemplate,content:Ranking}},
  { name:"Minha Conta", path:"/profile",components:{templatelayout:MainTemplate,content:MinhaConta}},
  { path:"/modules/:module/:path",components:{templatelayout:MainTemplate,content:Exercises}},
  { path:"/modules/:module",components:{templatelayout:MainTemplate,content:Aulas}},
  { name:"Módulos", path:"/modules",components:{templatelayout:MainTemplate,content:modulos, popup:Projectnotify}},
/*   { name:"Manutence", path:"/manutence",components:{templatelayout:ManutenceScreen,content:null}},
*/
  {path:"/login",components:{templatelayout:Login,content:null}},
  {path:"/logout",beforeEnter:logout},
  {path:"/",redirect:"/modules"},
  {path:"*",components:{templatelayout:NotFound,content:null}},
]
import store from './store'
const publicPages = ["/","/login"];

async function guardRotine(to,from,next){

  /* if(to.path != "/manutence")
    return next ("/manutence"); */
  if(store.getters["get_loading"] == false) store.commit("set_loading",true)
  if(store.getters["get_menu"] == true) store.commit("set_menu",false);

  store.commit("set_module_title",null)
  store.commit("set_module_description",null)
  if(!publicPages.includes(to.path)){
    const err = await store.dispatch("verifyToken");
    if(err != undefined) return next("/login");  
  }

  next() 
  
}
async function logout(to,from,next){
  await store.dispatch("clearStorage");
  window.location.href="/"
}
const router = new VueRouter({
  routes,
  mode:"history",
  scrollBehavior (to, from, savedPosition) { return { x: 0, y: 0 }}
});
router.afterEach(() => {
  if(store.getters["get_loading"] == true) store.commit("set_loading",false)
})

router.beforeEach(guardRotine)
export default router