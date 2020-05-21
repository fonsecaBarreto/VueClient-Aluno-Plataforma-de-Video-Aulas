import axios from 'axios'

export const Modulo = {
  state:{
    modules:null,
    module_title:null,
    ranking:null
  },getters:{
    get_ranking:state=>state.ranking,
    get_module_title: state=>state.module_title,
    get_modules: state=>state.modules,
  },mutations:{
    set_ranking:(state,v)=>state.ranking=v,
    set_module_title: (state,v)=> state.module_title=v,
    set_modules: (state,v)=> state.modules=v
  },actions:{
    async loadRanking({commit}){
      try{
        const {data} = await axios.get(`/students/ranking`);
        commit("set_ranking",data)
      }catch(err){return err.response.data.errors || err.response}
    },
    async sendAnswer({commit},answer){
      try{
        const {id,option,text,type} = {...answer}
        console.log(id,option,text,type)
        if(type == 1){ 
            const {data} = await axios.post(`/exercisesreplies/send/${id}`,{answer:{option}})
            return{err:null, data}
        }else{
            const {data} = await axios.post(`/exercisesreplies/send/${id}`,{answer:{text}});
            return{err:null, data}
        }
      }catch(err){return{err:err.response.data.errors || err.response,data:null}}
    },
    async loadModules({commit}){
      try{
        const {data} = await axios.get(`/modules/prime`);
        commit("set_modules",data)
      }catch(err){return err.response.data.errors || err.response}
    },
    async loadModulesChilds(c,path){
      try{
        const {data} = await axios.get(`/modules/indexModuleChilds/${path}`);
        return{data,err:null}
      }catch(err){return {data:null, err: (err.response.data.errors || err.response) }}
    },
    async loadModuleExercises(c,path){
      try{
        const {data} = await axios.get(`/modules/exercises/${path}`);
        return{data,err:null}
      }catch(err){return {data:null, err: (err.response.data.errors || err.response) }}
    }
  }
}