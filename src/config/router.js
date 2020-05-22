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
const routes = [
  {path:"/",redirect:"/modules"},
  { path:"/ranking",components:{templatelayout:MainTemplate,content:Ranking}},
  { name:"Minha Conta", path:"/profile",components:{templatelayout:MainTemplate,content:MinhaConta}},
  { path:"/modules/:module/:path",components:{templatelayout:MainTemplate,content:Exercises}},
  { path:"/modules/:module",components:{templatelayout:MainTemplate,content:Aulas}},
  { name:"Modulos", path:"/modules",components:{templatelayout:MainTemplate,content:modulos}},
  {path:"/login",components:{templatelayout:Login,content:null}},
  {path:"/logout",beforeEnter:logout},
]
import store from './store'
const publicPages = ["/","/login"]
async function guardRotine(to,from,next){
  if(store.getters["get_loading"] == false) store.commit("set_loading",true)
  if(store.getters["get_menu"] == true) store.commit("set_menu",false);
  if(!publicPages.includes(to.path)){
    const err = await store.dispatch("verifyToken");
    if(err) return next("/login");
  }next()
}
async function logout(to,from,next){
  await store.dispatch("clearStorage");
  next("/")
}
const scrollBehavior = ()=>{return{x:0,y:0}}
const router = new VueRouter({
  routes,
  mode:"history",
  scrollBehavior
});
router.afterEach(() => {
  if(store.getters["get_loading"] == true) store.commit("set_loading",false)
  window.scrollTo(0, 0)
})
router.beforeEach(guardRotine)
export default router