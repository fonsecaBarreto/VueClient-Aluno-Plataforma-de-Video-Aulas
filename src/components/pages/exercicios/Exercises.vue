<template>
  <div id="exercises-screen">
    <div class="exercises-flow" >
      <div class="flex-column jus-center aln-center  w-100 mb-3 " ref="exercisecontainer">
     
        <div class="player-container bd-red">
          <vue-core-video-player  :src="videosourceresult" :autoplay="false"></vue-core-video-player>
        </div>
          <div class="flex-row aln-center jus-start w-100">
          <a v-if="aula.attachment != null && aula.attachment.files[0].url != ''  && aula.attachment.files[0].url != null"
            :href="aula.attachment.files[0].url" class="anexo"> 
            <font-awesome-icon icon="paperclip"></font-awesome-icon>
            {{aula.attachment.files[0].name}}
          </a>
        </div> 
      </div>
      <exercise-row v-for="(e,i) in aula.exercises" :key="i" :data="e" @updatereply="updatereply"></exercise-row>
    </div>


    <interaction-component :id="aula.id" :interactions="aula.interactions"></interaction-component>
 
  </div>
</template>

<script>
import ExerciseRow from "./ExerciseRow"
import 'video.js/dist/video-js.css'
import { videoPlayer } from 'vue-video-player'
import "vue-video-player/src/custom-theme.css"




import {mapGetters} from "vuex"


import SenderForm from "../../pages/feed/SenderForm" 
import Interaction from "../../pages/feed/Interaction" 
const AULA = {
  id:null,
  exercises:[],
  description:null,
  picture:null,
  attachment:null,
  video:"https://mathewslins-website-uploads.s3-sa-east-1.amazonaws.com/aulas/Como+estudar+01.mp4",
  interactions:[],
  videosource: {
    location:[
      {src:null, resolution:"720p"},
      {src:null, resolution:"480p"},
      {src:null, resolution:"360p"},
      {src:null, resolution:"144p"},
    ]
  }
}


 
import InteractionComponent from "./InteractionComponent"
export default {
  components:{ExerciseRow,videoPlayer,SenderForm,Interaction,InteractionComponent},
  created() {window.addEventListener('resize', this.handleResize);},
  destroyed() {window.removeEventListener('resize', this.handleResize);},
  data(){
    return {
      aula:{ ...AULA},
    }
  },
    computed:{
      videosourceresult(){
        var result =this.aula.video
        /* if(this.aula.videosource.location[0].src!=null){
          result  = this.aula.videosource.location ;
          result = result.map(r=>{
            return {...r, type:undefined}
          })
           
        } */
        return [{src:result,resolution:"720p"}]
      },
      ...mapGetters(["get_screenWidth"]),
      result_exercises(){var exercises = this.exercises;return exercises || []},
  },
  methods:{
    updatereply(data){
      var exercise = this.aula.exercises.find(e=>e.id==data.exercise)
      exercise.reply = data;
    }
  },
  async mounted(){
    var {data,err} = await this.$store.dispatch("loadModuleExercises",this.$route.params.path);
    if(data) {
      this.$store.commit("set_module_title",data.name)
      this.aula = {...AULA,...data};
      console.log(this.aula)
      this.aula.exercises = data.children ? data.children : [];

      this.$store.commit("set_module_description",this.aula.description)

      if(data.attachment != null )
        this.aula.attachment = data.attachment; 
      this.$store.dispatch("loadInteraction",{module:data.id})
      .then(resp=>{
        this.aula.interactions= resp;
      })
    } 

  }
}
</script>

<style scoped>
  
  #exercises-screen{
    padding-bottom: 200px;
  }
  .video-onloading{
    position: relative;
  }
  .video-onloading:after{
    content: "";
    position: absolute;
    left: 0;right: 0;top: 0;
    width: 100%;
    height: 100%;
    background-color: rgb(0, 0, 0);
    background-image: url("../../../assets/loading.svg");
    background-repeat: no-repeat;
    background-size: 120px;
    background-position: center;
    z-index: 1;

  }
  .video-player-box{
    width: 100%;
    background-color: black;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .anexo{
    font-size: .94em;
    padding: 2px 22px;
    background-color: white;
    border: solid 1px #ccc;
    border-radius: 2px;
    margin-left: 0;margin-right: auto;margin-top: 6px;
  }

  .exercises-flow{
    width: 100%;
    height: 100%;
    display: grid;
    grid-template-columns: repeat(1, 1fr);
    grid-template-rows: auto;
    row-gap: 3px;
    padding: 0px 0px 32px 0px;
    max-width: 100%;
    overflow: hidden;
  }
   
</style>