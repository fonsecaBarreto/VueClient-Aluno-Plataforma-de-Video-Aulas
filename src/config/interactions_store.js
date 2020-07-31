import axios from 'axios'
export const Interactions = {
  state:{fresh:[]},
  getters:{
    get_fresh:(state)=>state.fresh,
    get_hot:(state)=>state.hot
  },
  mutations:{
    set_fresh:(state,v)=>state.fresh= v,
    set_hot:(state,v)=>state.hot= v
  },
  actions:{
    async voteInteraction({commit,state},{id,from}){
      try{  
        const {data} = await axios.put("/interactions/vote/"+id);
         if(from =="fresh"){
          var indice = 0;
          var novo = state.fresh.map((i,ii)=>{
            if(i.id == id){indice = ii}
            return i
          });
          novo.splice(indice,1,...data)
         commit("set_fresh",novo) 
        }
        return {data,err:null}
      }catch(err){ return {data:null,err:err.response}}
    },
    async deleteInteraction({commit,state},{id,from="fresh"}){
      try{  
        await axios.delete("/interactions/"+id)
        if(from =="fresh"){
          const spliced = state.fresh.filter(i=>(i.id != id));
          commit("set_fresh",spliced)
        }
      }catch(err){ return err.response}
    },
    async sendInteraction({commit,state},{content,parentId,from,module}){
      try{
        const {data} = await axios.post(`/interactions`,{content,parentId,module});
        if(from == "fresh" && data[0].parentId == null){
          commit("set_fresh",[...data,...state.fresh,])
        }
        return{data,err:null} 
      }catch(err){return {data:null,err:err.response}}
    },

    async loadFresh({commit}){
      try{ const {data} = await axios.get("/interactions/fresh");commit("set_fresh",data)
      }catch(err){return err.response}
    },
    async loadInteraction(c,{path,module}){
      try{
        var url = path == null ? `/interactions` : `/interactions/${path}`
        url = module == null ? url : `${url}?m=${module}`
        const {data} = await axios.get(url)
        return data
      }catch(err){return err.response}
    }
  }
}