<template>
  <div id="exercises-screen">
    <div :class="{'exercise-screen-loading':loading}"></div>
    <div class="exercise-screen-content" v-if="aula != null">
      <div class="exercises-flow" >
          <k9-video-player :src="videosourceresult" ></k9-video-player>
          <control-row :previous="()=>moveto(aula.before)" :next="()=>moveto(aula.after)" ></control-row>
          <attachment-row :attachment="aula.attachment" ></attachment-row> 
         
         <div v-if="aula.audiogroup != null" class="mt-3">
            <span class=" ex-header unselectable ">
              <font-awesome-icon icon="headphones-alt" class="mr-2"></font-awesome-icon> Listen up - {{aula.audiogroup.title}}</span>
              <div class="d-flex flex-column mt-3">

                  <audio-row v-for="(a,i) in aula.audiogroup.content.audioentities" :key="i" :entity="a"></audio-row>
              </div>
         </div>
     
        <div class='mt-3'>
          <span class="ex-header unselectable ">
            <font-awesome-icon icon="sign-language" class="mr-2"></font-awesome-icon> Hands on!</span>
            <div class="d-flex flex-column mt-3">
               <exercise-row v-for="(e,i) in aula.exercises" :key="i" :data="e" @updatereply="updatereply" class="mt-1"></exercise-row>
            </div>
        </div>

        <interaction-component :id="aula.id" :interactions="aula.interactions" class="mt-3"></interaction-component>
     
     
      </div>
    </div>
  </div>
</template>

<script>
import ExerciseRow from "./ExerciseRow"
import 'video.js/dist/video-js.css'
import {mapGetters} from "vuex"
import SenderForm from "../../pages/feed/SenderForm" 
import Interaction from "../../pages/feed/Interaction" 
import K9VideoPlayer from "../../utils/k9Player/K9VideoPlayer"
import AttachmentRow from "./AttachmentRow"
import InteractionComponent from "./InteractionComponent"
import ControlRow from './ControlRow'
import AudioRow from './AudioRow'
const AULA = {
  id:null, name:null,description:null,picture:null, attachment:null,video:null,
  exercises:[],interactions:[],
  videosource: {
    location:[]
  },
  audiogroup:{
    audioentities: []
  },
  before:null, after:null
}
export default {
  components:{ControlRow,AudioRow,ExerciseRow,SenderForm,Interaction,InteractionComponent,K9VideoPlayer,AttachmentRow},
  data(){
    return { 
      aula:null,
      loading:true 
      }
    },
  computed:{
    videosourceresult(){
      const resolutions=["144p","360p","480p","720p"]
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
      async handler(){
        this.loading = true
        var {data,err} = await this.$store.dispatch("loadModuleExercises",this.$route.params.path);
        if(data) {
          this.$store.commit("set_module_title",data.name)
          this.$store.commit("set_module_description",data.description)
          this.aula = {...AULA, ...data};
          if(this.aula.videosource == null) this.aula.videosource = {...AULA.videosource}
          this.aula.exercises = data.children ? data.children : [];
          if(data.attachment != null ) this.aula.attachment = data.attachment; 
          this.aula.after = data.after
          this.aula.before = data.before
          this.loading =false

          this.$store.dispatch("loadInteraction",{module:data.id}).then(resp=>{this.aula.interactions= resp;})
        } 
      }
    }
  },
  async mounted(){
    
  }
}
</script>

<style scoped>

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

  #exercises-screen{
    padding-bottom: 180px;
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
    row-gap: 6px;
   
  }
 
   
</style>