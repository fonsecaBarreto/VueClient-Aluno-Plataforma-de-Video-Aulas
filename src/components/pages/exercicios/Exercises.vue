<template>
  <div id="exercises-screen">
    <div :class="{'exercise-screen-loading':loading}"></div>
    <div class="exercise-screen-content" v-if="aula != null">
      <div class="exercises-flow" >

        <k9-video-player :src="videosourcesResult" v-if="aula.videosource" ></k9-video-player>

        <control-row class="mb-3" :previous="()=>moveto(aula.before)" :next="()=>moveto(aula.after)" 
          :previousButton="aula.before? true: false" :nextButton="aula.after? true: false" ></control-row>
        <attachment-row :attachment="aula.attachment" ></attachment-row> 

        <colapse-component v-if="aula.audiogroup != null" :colapseState="aula.videosource ? false : true" icon="headphones-alt" 
         title="Listen up" :description ="aula.audiogroup.description">
          <div class="audio-flow d-flex flex-column pt-2 mb-3 pr-2">
            <audio-row v-for="(a,i) in aula.audiogroup.content.audioentities" :key="i" :entity="a"></audio-row>
          </div>
        </colapse-component>

        <colapse-component v-if="aula.exercises != null"  :colapseState="aula.videosource ? false : true" icon="sign-language"
         title="Hands on!"  description ="Faça atividades e reforce oque aprendeu">
          <div class="d-flex flex-column pt-2 mb-3">
            <exercise-row v-for="(e,i) in aula.exercises" :key="i" :data="e" @updatereply="updatereply" class="mt-1"></exercise-row>
          </div>
        </colapse-component>

        <colapse-component :colapseState="true" title="O que achou dessa aula? Comente!">
          <interaction-component class="pt-3 mb-3" :id="aula.id" :interactions="aula.interactions" ></interaction-component>
        </colapse-component>

     
      </div>
    </div>
  </div>
</template>

<script>
import ExerciseRow from "./ExerciseRow"
import {mapGetters} from "vuex"
import SenderForm from "../../pages/feed/SenderForm" 
import Interaction from "../../pages/feed/Interaction" 
import K9VideoPlayer from "../../utils/k9Player/K9VideoPlayer"
import AttachmentRow from "./AttachmentRow"
import InteractionComponent from "./InteractionComponent"
import ControlRow from './ControlRow'
import AudioRow from './AudioRow'
import ColapseComponent from './ColapseComponent'
const AULA = {
  id:null, name:null,description:null,picture:null, attachment:null,video:null,before:null, after:null,
  exercises:[],interactions:[],
  videosource: {
    location:[]
  },

}
export default {
  components:{ColapseComponent,ControlRow,AudioRow,ExerciseRow,SenderForm,Interaction,InteractionComponent,K9VideoPlayer,AttachmentRow},
  data(){
    return { 
      aula:null,
      loading:true 
      }
    },
  computed:{
    videosourcesResult(){
     
      var result = this.aula.video != null ?  [{src:this.aula.video,resolution:"720p"}] : [];

        if(this.aula.videosource.location.length > 0 ){ 
          result = this.aula.videosource.location.map((r,i)=>{
            return {src:r.src,resolution:r.resolution}
          })  
        } 
      return result
    },
    result_exercises(){var exercises = this.exercises;return exercises || []},
    path(){return this.$route.params.path}
  },
  methods:{
    moveto(to){
      this.$router.push(`/modules/${this.$route.params.module}/${to.path}`)
    },
    updatereply(data){
      var exercise = this.aula.exercises.find(e=>e.id==data.exercise)
      exercise.reply = data;
    }
  },
  watch:{
    path:{
      immediate:true,
      async handler(val){
        console.log("alterando",val)
        if(val == null) return 
        this.loading = true;
        this.aula = { ...AULA}
        this.aula.exercises = []
        this.aula.interactions = []
        this.aula.videosource= {location:[]}
        this.aula.audiogroup = null
        var {data,err} = await this.$store.dispatch("loadModuleExercises",this.$route.params.path);
        if(data) {
          this.$store.commit("set_module_title",data.name)
          this.$store.commit("set_module_description",data.description)
          this.aula = { ...this.aula, ...data };
          this.aula.exercises = data.children || []
          this.aula.attachment = data.attachment || []
          this.aula.after =  data.after || null
          this.aula.before = data.before || null
          this.loading =false
          this.$store.dispatch("loadInteraction",{module:data.id})
            .then(resp=>{this.aula.interactions= resp;})
            .catch(err=>console.log("não foi possivel baixar interações"))
        } 
      }
    }
  },

}
</script>

<style scoped>
.audio-flow{
  max-height: 360px;
  overflow-y: auto;
}
  #exercises-screen{
    padding-bottom: 180px;
  }
.ex-header{
  font-size: 1.1em;
  position: relative;
  color: rgb(17, 16, 95); 
  position: relative;
  width: 100%;
  display: flex;
  align-items: center;
}
.ex-header::after{
  content: ""; position: absolute;bottom:0;left: 0;
  width: 100%;
  height: 1px;
  background-color: rgb(17, 16, 95,.8); 
 
}
.exercise-screen-loading{
  position: absolute;top: 0;left: 0;
  width: 100%;height: 100%;
  background-color: rgba(248, 247, 247, 1);
  background-image: url("../../../assets/loading.svg");
  background-repeat: no-repeat;
  background-size: 180px;
  background-position: center 300px;
  z-index: 99999;
}

  .exercises-flow{
    width: 100%;
    height: 100%;
    display: grid;
    grid-template-columns: repeat(1, 1fr);
    grid-template-rows: auto;
    row-gap: 8px;
    padding: 0px 0px 32px 0px;
    max-width: 100%;
    row-gap: 4px;
   
  }
 
   
</style>