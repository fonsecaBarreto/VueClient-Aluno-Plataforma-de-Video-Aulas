<template>
 <div id="interactions-feed">
   <div class="feed-panel" v-if="interaction">
    <interaction-thumb 
      :entry="interaction" noChildsCount 
       @aftervote="updateIt"
     ></interaction-thumb>



    <sender-form class="mt-4" from="fresh" 
    :parentId="interaction.id" @novo="concatInteraction"
     ></sender-form>
   </div>
    <div class="interaction-comments" v-if='interaction.childs.length > 0'>
      <div class="feed-panel">
        <interaction-thumb sub :showViews="false" v-for="i in interaction.childs" :key='i.id' :entry="i" ></interaction-thumb>
      </div>
    </div>
  
 </div>
</template>

<script>
import Interaction from "./Interaction"
import SenderForm from "./SenderForm"
const INITIAL_INTERACTION = {
  id:null,
  childs:[]
} 
export default {
  components:{InteractionThumb:Interaction,SenderForm},
  data(){
    return{
      interaction:{...INITIAL_INTERACTION}
    }
  },
  computed:{
    id(){return this.$route.params.path}
  },
  methods:{
    updateIt(data){
      if(data != null) this.interaction = {...data[0],childs:this.interaction.childs}; 
    },
    concatInteraction(data){
      this.interaction.childs = [...data,...this.interaction.childs]
    },

  },
  watch: {
    id:{
      immediate: true,
      handler(val) {
        if(val != null){
           this.$store.dispatch("loadInteraction",{path:val})
           .then(data=>{
             this.interaction = data[0]})
        }
      }
    }
  
  }

}
</script>

<style>

  .interaction-comments{
    margin-top: 12px;
    display: grid;
    row-gap: 8px;


  }
</style>