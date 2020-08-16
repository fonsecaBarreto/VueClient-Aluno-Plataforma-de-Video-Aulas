import axios from 'axios'

export const Modulo = {
  state:{
    modules:[],
    module_title:null,
    module_description:null,
    ranking:[],
    selfRanking:null
  },getters:{
    get_selfRanking:state=>state.selfRanking,
    get_ranking:state=>state.ranking,
    get_module_title: state=>state.module_title,
    get_module_description: state=>state.module_description,
    get_modules: state=>state.modules,
  },mutations:{
    set_selfRanking:(state,v)=>state.selfRanking=v,
    set_ranking:(state,v)=>state.ranking=v,
    set_module_title: (state,v)=> state.module_title=v,
    set_module_description: (state,v)=> state.module_description=v,
    set_modules: (state,v)=> state.modules=v
  },actions:{
    async loadRanking({commit}){
      try{
        const {data} = await axios.get(`/students/ranking`);
        commit("set_ranking",data.ranking)
        commit("set_selfRanking",data.user)
      }catch(err){return err.response.data.errors || err.response}
    },
    async reviewExercise(c,id){
      try{ await axios.put("/exercisesreplies/review/"+id)
      }catch(err){return err.response}
    },
    async sendAnswer(c,answer){
      try{
        const {id,option,text,type} = {...answer}
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
      }catch(err){console.log(err)}
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