import axios from 'axios'
import {STORAGE_KEY} from "../global.js"
export const Aluno = {
  state:{
    user:null,
    accessToken:localStorage.getItem(STORAGE_KEY) || null,
  },getters:{
    get_user:state=>state.user,
    get_accessToken:state=>state.accessToken,
  },mutations:{
    set_user: (state,v)=> state.user=v,
    set_accessToken:(state,v)=> state.accessToken=v
  },actions:{
    async updateUser({commit,dispatch},{id,name,email,picture,password}){
      try{
        if(picture != null && picture.key == undefined){
          const {data,err} = await dispatch("uploadImage",{formData:picture,params:"?w=360&h=1"});
          if(!err && data ) picture = data;
        }
        const {data} = await axios.put(`/students/update`,{id,name,email,picture,password});
        localStorage.setItem(STORAGE_KEY,data.accessToken);
        commit(`set_accessToken`,data.accessToken);
        await dispatch("verifyToken") // get the users info
      }catch(err){return err.response.data.errors || err.response}
    },
    async updatePassword({commit},{password,newpassword, newpassword_repeat}){
      try{
         await axios.put(`/students/updatepassword/`,{password,newpassword, newpassword_repeat});
      }catch(err){return err.response.data.errors || err.response}
    },
    async obtainToken({commit,dispatch},credentials){ //signin
      try{
        const {email,password} = credentials
        const {data} = await axios.post(`/students/signin`,{email,password})
        localStorage.setItem(STORAGE_KEY,data.accessToken);
        commit(`set_accessToken`,data.accessToken);
        await dispatch("verifyToken") // get the users info
      }catch(err){return err.response.data.errors || "Erro do servidor"}
    },
    async verifyToken({state,dispatch,commit}){
      try{
        axios.defaults.headers.common["authorization"]=`bearer ${state.accessToken}`
        const {data} = await axios.post(`/students/auth`);
        return commit("set_user",data)
      }catch(err){
        await dispatch("clearStorage");
        return err.response}
    },
    async clearStorage({commit}){ // clear all
      delete axios.defaults.headers.common["authorization"];
      delete localStorage.removeItem(STORAGE_KEY);
      commit("set_user",null);
      commit("set_accessToken",null)
    },
  }
}