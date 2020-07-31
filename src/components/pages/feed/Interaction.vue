<template>
<div class="interaction flex-column " :class="{sub,'onloading':freeze}">
  <div class="author flex-row">
    <span>{{interaction.student.name}}  -  
    <span class="info-smaller">
       {{interaction.student.email}}</span>
    </span>
    <drop-down class="mr-0 ml-auto" icon="ellipsis-h" v-if="get_user.email == interaction.student.email">
        <a href="" class="opt-button" @click.prevent="deletar()">Deletar</a>
    </drop-down>
  </div>  

  <div class="conteudo" v-html="interaction.content"></div>
  <div v-if="!sub" class="info flex-row aln-center ">
    
    <button class="love-button" @click="vote()">
      <font-awesome-icon icon="heart" class=""></font-awesome-icon>
      <span class="date ml-1">{{interaction.votes}}</span>
    </button>

    <span v-if="showViews" class="flex-row aln-center ml-3 ">
      <div class="date">{{interaction.views}} Visualizações</div>
    </span>
  
    <router-link v-if="!sub && !noChildsCount" :to="'/interactions/'+interaction.path" class="flex-row aln-center ml-3 ">
      <div class="date">Respostas</div>
    </router-link>

    <span class="flex-row aln-center mr-0 ml-auto">
      <font-awesome-icon icon="calendar" class="mr-1 info-smaller"></font-awesome-icon>
      <div class="date">{{interaction.created_at | dateformat}}</div>
    </span>
  </div>

 

</div>
</template>

<script>
const INITIAL = {
  id:null,
  content:"",
  created_at:"00/00/00",
  student:{name:"",email:""},
  votes:0,views:0,
  childs:0,
}
import Dropdown from "../../utils/Dropdown"
import {mapGetters} from "vuex"
export default {
  props:{entry:Object,sub:Boolean,
  noChildsCount:Boolean,
  showViews:{type:Boolean,default:true}},
  
  components:{DropDown:Dropdown},
  computed:{
    ...mapGetters(["get_user"])
  },
  data(){
    return {
      freeze:false,
      interaction:{...INITIAL,...this.entry}
    }
  },
  methods:{
    async vote(){
      console.log("voting")
      const {data,err} = await this.$store.dispatch("voteInteraction",{id:this.interaction.id,from:"fresh"})
      console.log("done voting")
      this.$emit("aftervote",data)
    },
    async deletar(){
      this.freeze = true
      const err = await this.$store.dispatch("deleteInteraction",{id:this.interaction.id});
      if(err == undefined) this.$emit("deleted",this.interaction.id)
      this.freeze = false
      
    }
  },
  watch:{
    entry(novo){
      this.interaction={...INITIAL,...novo}
    }
  }
}
</script >
<style scoped>

  .interaction{
    width: 100%;
    margin: auto;
    position: relative;
  }
  .interaction.onloading::after{
    content: "";
    position: absolute;
    top: -16px;left: -16px;
    width: calc(100% + 32px);
    height: calc(100% + 32px);
    background-color: rgba(248, 248, 248, 0.7);
    background-image: url("../../../assets/loading.svg");
    background-repeat: no-repeat;
    background-size: 120px;
    background-position: center;
    z-index: 9999;
  }
  .interaction.sub{
    border-bottom: solid 1px #eee;

  }
  .interaction .conteudo{
    flex:1;
    width: 100%;
    height: 100%;
    padding: 16px 10px;
    font-size: 1.2em;
    line-height: 1.2em;
    color: rgba(23, 40, 148, 0.75);
    font-weight: bold;
  }
  .interaction.sub .conteudo{
    flex:1;
    width: 100%;
    height: 100%;
    padding: 6px 10px 16px 10px;
    font-size: 1.1em;
    line-height: 1.2em;
    color: rgba(23, 40, 148, 0.75);
    font-weight: 550;
  }
  .interaction .info{
    height: 24px;
    color:#999;
    font-size: .8em;
  }
  .interaction .author{
    height: 24px;
    color:#666;
    font-size: .94em;
  }
  .interaction .options{
    cursor: pointer;
    width: 28px;height: 28px;
    border-radius: 50%;
    display: flex;
    justify-content: center;align-items: center;
  }
  .interaction .options:active{
    cursor: pointer;
    background-color: rgba(0,0,0,.08);
  }
  .info-smaller{font-size: .8em;font-weight: 500;color: #999;}
  /* lovebutton */
  .love-button{
    border:none;
    border-radius: 16px;
    padding:6px 22px;
    display: flex;
    justify-content: center;
    align-items: center;
    transition: all .1s;
    outline: none;
    color: #777;
    font-size: .9em;
  }
  .love-button:hover{
     outline: none;
    background-color: rgb(255, 255, 255);
    box-shadow: inset 0px 2px 6px #0001;
  }
  .love-button:active{
    color: red!important;
 
  }
</style>