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
  state:{},
  actions:{
    async uploadImage (c,{formData,params=""}){
      try{
        const {data} = await axios.post(`/profilepic${params}`,formData,{'Content-Type': 'multipart/form-data' }) 
        return {data,err:null}; 
      }catch(err){return {data:null,err:err.response.data || err.response}}

    },
  }
 
})