import Vue from "vue"
import Vuex from "vuex"
import axios from 'axios'
import {API_URL} from "../global.js"
axios.defaults.baseURL=API_URL;
import {Aluno} from './aluno_store'
import {Modulo} from './modules_store'
Vue.use(Vuex)
export default new Vuex.Store({
  modules:{Aluno,Modulo},
  state:{
    menu:false,
    loading:false,
    screenWidth:0,
  },getters:{
    get_screenWidth:(state,v)=>state.screenWidth,
    get_menu:(state)=>state.menu,
    get_loading:(state)=>state.loading,
  },mutations:{
    set_screenWidth:(state,v)=>state.screenWidth=v,
    set_menu:(state,v)=>state.menu=v,
    set_loading:(state,v)=>state.loading=v
  },
  actions:{
    toggleMenu({commit,state}){
      commit("set_menu",!state.menu)
    }
    ,async uploadImage (c,{formData,params=""}){
      try{
        const {data} = await axios.post(`/profilepic${params}`,formData,{'Content-Type': 'multipart/form-data' }) 
        return {data,err:null}; 
      }catch(err){return {data:null,err:err.response.data || err.response}}

    },
  }
 
})