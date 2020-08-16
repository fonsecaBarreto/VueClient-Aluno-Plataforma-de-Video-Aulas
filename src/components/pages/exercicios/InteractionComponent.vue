<template>
  <div class="exercises-interaction-flowc bd-red">
    <div class="hheader">
     <span class="eifh-toggle" @click="toggle()">
        <font-awesome-icon :icon="expand ?'chevron-down':'chevron-right'"></font-awesome-icon>
      </span> 
      <span > O que achou dessa aula? Comente! </span>
      </div>
     <!--  <transition name="roll" > -->
      <div v-if="expand" class="bbody bd-red">

        <sender-form :from="null" :module="id" @novo="novaInteracao" @sending="freezeit"></sender-form>
        <div class="flex-column mt-3" :class="{'bbody-loading':freeze}">
          <div class="mb-2 bg-white p-2"  v-for="a in interactionsresult" :key="a.id">

            <Interaction  :entry="a" :showViews="false" 
            @deleted="spliceDeleted" @aftervote="updateIt" ></Interaction>
          </div>
        </div>
      </div>
      <!-- </transition> -->
  </div>
</template>

<script>
import SenderForm from "../../pages/feed/SenderForm" 
import Interaction from "../../pages/feed/Interaction" 
export default {
  props:{id:Number,interactions:Array},
  components:{SenderForm,Interaction},
  data(){
    return{
      expand:true,
      interactionsresult:[],
      freeze:false
    }
  },methods:{
    updateIt(data){
      console.log(data)
      var indice = 0;
      var novo = this.interactionsresult.map((i,ii)=>{
        if(i.id == data[0].id){indice = ii}
      return i});
      this.interactionsresult .splice(indice,1,...data)
    },
    spliceDeleted(id){
      this.interactionsresult = this.interactionsresult.filter(i=>i.id != id)
    },  
    freezeit(){
      this.freeze = true
    },
    novaInteracao(val){
     this.interactionsresult=[...val,...this.interactionsresult]
     this.freeze=false;
    },
    toggle(){
      this.expand = !this.expand
    }
  },watch:{
    interactions:{
      immediate:true,
      handler(nv){
        this.interactionsresult=[...this.interactions]
      }
    }
  }
}
</script>

<style scoped>
  .bbody{
    width: 100%;
    padding: 16px 22px;
    position: relative;
  }
  .bbody .bbody-loading{
    position: relative;
  }
  .bbody .bbody-loading:after{
    content: "";
    position: absolute;
    top:0;left: 0;
    width: 100%;
    height: 100%;
    background-color: rgb(248, 248, 248,.8);
    background-image: url("../../../assets/loading-alt.svg");
    background-repeat: no-repeat;
    background-size: 120px;
    background-position: center 200px;
   z-index: 9999;
  }
  .hheader{
    width: 100%;
    height: fit-content;
    display: flex;
    justify-content: start;
    align-items: center;
    font-size: 1.1em;
    color: rgb(17, 16, 95); ;
  }
  .hheader
  .eifh-toggle{
    cursor: pointer;
    width: 32px;
    height: 32px;
    font-size: .8em;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .exercises-interaction-flow{
    width: 100%;
    margin: auto;
  }
</style>