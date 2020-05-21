<template>
  <div class="exercise-item" :class="{'onhold':data==null,expanded}"  >
    <div v-if="data" class="exercise-row" :class="{'correct':data.reply && data.reply.solved == true, 'incorrect':data.reply && data.reply.solved == false}">
       <div class="expand-button " @click="toggle()"> 
         <font-awesome-icon :icon=" expanded ?'chevron-down' : 'chevron-right'"/>
      </div>
      <transition name="roll" >
        <span class="enunciation" v-if="!expanded"> {{data.enunciation}} </span>
    
        <span class="tip" v-if="expanded && data.tip">
            <font-awesome-icon icon="question-circle" class="questionmark"></font-awesome-icon>
           {{data.tip}} </span>

         
      </transition>
      <span class="mr-3" v-if="data.reply"> 
         <span>
            {{data.reply.solved == true ? "" : data.reply.solved == false ? "" : "Aguardando correção"}}
         </span>
         <font-awesome-icon :icon="data.reply.solved ==true ?'check-circle' :  data.reply.solved == false ? 'times-circle' : 'pause-circle'" class="mr-1"></font-awesome-icon>
       </span>
    </div>
    <transition name="roll">
      <div v-if="data && expanded" class="exercise-row-body px-3 ">
        <span class="full-enunciation "> {{data.enunciation}} </span>
        <div class="inputs-container  " :class="{disabled}">
          <div class="" v-if="data.type == 1">
            <div class="radio-group pl-4">
                <div  v-for="(k,i) in data.options" :key="i"> 
                    <input type="radio" :value="i" name="radio" v-model="answer.option" > <label for="radio"
                    >{{k}} </label>
                </div>
            </div>
          </div>
          <div v-else class="p-0">
            <textarea  class="input-box " v-model="answer.text"></textarea>
          </div>
        </div>
     
       <div class="feedback-container" v-if="(data.reply && data.reply.closed == true)">
       
        <span v-if="data.reply.feedback">
           <span class="text-muted mr-2"> Correção:</span>
         {{data.reply.feedback.text}}
        </span>
        <span v-if="data.resolution != null">
          <span class="text-muted mr-2">Resposta:</span>
          ({{data.options[data.resolution.answer]}})
        </span>
       </div>
        <div class="exercise-bottom py-2 " v-if="data.reply == null || ( data.reply && data.reply.closed != true)">
     
          <button-a v-if="disabled  && ( data.reply.closed != true)" class="px-4" danger @click.native="edit()" >
            <font-awesome-icon icon="edit"></font-awesome-icon>
            Editar</button-a>
          <button-a v-if="!disabled" class="px-4" project @click.native="send()">
            <font-awesome-icon icon="paper-plane"></font-awesome-icon>
            Enviar</button-a>
        </div>
      </div>
    </transition>
  </div>
</template>

<script>
const INITIAL_INPUTS = {
    id:null,
    text:null,
    option:null
}
import ButtonA from "../../utils/ButtonA"
export default {
  props:{data:Object},
  components:{ButtonA},
  data(){
    return{
      expanded:false,
      answer:{...INITIAL_INPUTS},
      loading:false,
      disabled:false,
    }
  },
  watch:{
    data:{
      immediate: true,
      handler(data){
        this.disabled = (data && data.reply) ? true : false;
        this.answer = (data && data.reply) ? {...data.reply.answer, id:data.id} : (data) ? {...INITIAL_INPUTS, id: data.id} : {...INITIAL_INPUTS}
      }
    }
  },
  methods:{
    edit(){
      this.disabled = false;
    },
    sucesso(){
      this.$swal( {
        title: "Enviado com sucesso!",
        text: "Aguarde o correção",
        icon: "success",
        buttons: false,
        timer: 1800,
      })
    },
    toggle(){this.expanded = !this.expanded},
    async send(){
      const {data,err} = await this.$store.dispatch("sendAnswer",{...this.answer,type:this.data.type});
      if(!err && data){
         this.sucesso()
         this.disabled = true
         this.$emit("updatereply",data)
      } 
     
    }
  

  }
}
</script>

<style scoped>
.feedback-container{
    padding:12px 22px 22px 22px;
 
}
.exercise-bottom{
  width: 100%;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  padding-right: 22px;
}
.input-box{
  width: 100%;
  height: 170px;
  padding: 12px 16px;
  border-radius: 2px;
}
.radio-group{
   margin-top: 18px;
}
.questionmark{
  font-size: .9em;
  color: #666;
}
.exercise-row-body{
  min-height: 160px;
  background-color: white;
  padding: 16px 0 0 0;
  position: relative;
  border-bottom: solid 1px #ddd;
  
}
.expand-button{
  height: 32px;
  width: 64px;
  margin-left: 0;margin-right: auto;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: .8em;
  cursor: pointer;
}
.exercise-item{
  width: 100%;
  min-height: 36px;
  box-shadow: 0px 2px 6px #00000008;
  
}
.exercise-item.expanded{
    margin-bottom: 32px;
}
.exercise-row{
  z-index: 1;
  width: 100%;
  height:36px;
  font-size: 1em;
  text-align: left;
  line-height: 1em;

  white-space: normal;
  overflow: hidden;
  text-overflow: ellipsis;
  display: flex;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 1;
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  border-bottom: solid 1px #ddd;
  position: relative;
  background-color: white;
}
.exercise-row:after{
  content: "";
  position: absolute;
  top: 0;left:0;
  height: 100%;
  width: 10px;
  background-color: #ddd;
}
.exercise-row.incorrect:after{
  background-color: rgb(189, 45, 45);
}
.exercise-row.correct:after{
  background-color: rgb(77, 219, 134) !important;
}
.enunciation{
  flex:1;
  width: 100%;
  text-align: left;
  font-size: 1em;
  line-height: 1em;
  height: 1em;
  white-space: normal;
  overflow: hidden;
  text-overflow: ellipsis;
  display: flex;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 1;
  color: #333;
  
}
.full-enunciation{
  flex:1;
  width: 100%;
  text-align: left;
  font-size: 1.2em;
  line-height: 1.3em;
  height: unset;
  white-space: pre-wrap;
  overflow: hidden;
  text-overflow: ellipsis;
  display: flex;
  color: #333;
   
}
.tip{
  flex:1;
  width: 100%;
  text-align: left;
  font-size: 1em;
  line-height: 1em;
  white-space: normal;
  overflow: hidden;
  text-overflow: ellipsis;
  display: flex;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 1;
  color: #333;
}
.inputs-container{
  position: relative;
  padding: 16px 22px 4px 0px;
} 
.inputs-container.disabled:after{
  content: "";
  position: absolute;
  top: 0;left:0;
  width: 100%;
  height: 100%;
background: rgb(121,121,121);
background: -moz-linear-gradient(0deg, rgba(121,121,121,0.06206232492997199) 0%, rgba(255,255,255,0) 100%);
background: -webkit-linear-gradient(0deg, rgba(121,121,121,0.06206232492997199) 0%, rgba(255,255,255,0) 100%);
background: linear-gradient(0deg, rgba(121,121,121,0.06206232492997199) 0%, rgba(255,255,255,0) 100%);
filter: progid:DXImageTransform.Microsoft.gradient(startColorstr="#797979",endColorstr="#ffffff",GradientType=1);
  z-index: 1;
}

 .onhold{
    background-color: #ddd;
  }
  /*  */
  .roll-enter-active, .roll-leave-active {
    transition: all .25s;
    transform: translateY(0);
  }
  .roll-enter, .roll-leave-to /* .fade-leave-active em versões anteriores a 2.1.8 */ {
    transition: all .25s;
    opacity: 0;
    transform: translateY(-32px);
  
  }

</style>