<template>
  <div class="exercises" >
     <span class="module-description" >
       {{description}}
    </span>
   
    <div class="exercises-flow" >

     <div class="flex-column jus-center aln-center  w-100 mb-3" ref="exercisecontainer">


      <video-player v-if="video"
    
        class="video-player-box"
        ref="videoPlayer"
        :options="{...playerOptions,
          width: (get_screenWidth > 960 ) ? (get_screenWidth > 1224 ) ? (get_screenWidth > 1400 ) ? ewidth :960 : 700 : get_screenWidth,
          height: (get_screenWidth > 960 ) ? (get_screenWidth > 1224 ) ? (get_screenWidth > 1400 ) ? ewidth * .56 :960 * .56 : 700 * .56 : get_screenWidth * .56,
          poster:picture != null ? picture.lg : null
        }"
        :playsinline="false"
        customEventName="customstatechangedeventname">
      </video-player> 
     </div>
 
      <exercise-row v-for="(e,i) in result_exercises" :key="i" :data="e" @updatereply="updatereply"></exercise-row>
    </div>
  </div>
</template>

<script>
import ExerciseRow from "./ExerciseRow"
import 'video.js/dist/video-js.css'
import { videoPlayer } from 'vue-video-player'
import {mapGetters} from "vuex"
export default {
  components:{ExerciseRow,videoPlayer},
  created() {
    window.addEventListener('resize', this.handleResize);

  },
  destroyed() {window.removeEventListener('resize', this.handleResize);},

  data(){
    return {
      ewidth:null,
      exercises:null,
      description:null,
      video:null,
      picture:null,
      playerOptions: {
        height:'448',
        width:'800',
        muted: false,
        language: 'en',
        playbackRates: [0.75, 1.0, 1.5, 2.0],
        sources: [{
          type: "video/mp4",
          src: this.video || null
        }],
        poster: this.picture || "https://www.kindpng.com/picc/m/84-847409_sponge-bob-png-spongebob-squarepants-png-transparent-png.png",
      }
    }
  },
  methods:{
    handleResize() {
      var ee = this.$refs.exercisecontainer.clientWidth;
    
      this.ewidth = ee
    
    },
    updatereply(data){
      var exercise = this.exercises.find(e=>e.id==data.exercise)
      exercise.reply = data;
    }
  },
  watch:{
    video(nv){
      this.playerOptions.sources[0].src=nv
    }
  },
  computed:{
    ...mapGetters(["get_screenWidth"]),
     // listen event
    player() {
        return this.$refs.videoPlayer.player
      },
    result_exercises(){

      var exercises = this.exercises;
      return exercises || []
    },
    path(){return this.$route.params.path}
  },
  async mounted(){
    this.handleResize();
    if(this.modules == null){
      const {data,err} = await this.$store.dispatch("loadModuleExercises",this.path);
   
      if(data) {
        console.log(data)
        this.$store.commit("set_module_title",data.name)
        this.exercises = data.children;
        this.description = data.description;
        this.video = data.video;
        this.picture = data.picture
      }
    }
  }
}
</script>

<style scoped>

  .module-description{
    color: #555;
    margin-top: 6px;
    text-align: left;
    width: 100%;
    font-size: 1em;
    text-align: left;
    width: 100%;
    line-height: 1.1em;
    white-space: normal;
    display: flex;
  }
  .exercises-flow{
    width: 100%;
    height: 100%;
    display: grid;
    grid-template-columns: repeat(1, 1fr);
    grid-template-rows: auto;
    row-gap: 3px;
    padding: 32px 8px 50vh 8px;
    max-width: 100%;
    overflow: hidden;
    
  }
   @media only screen and (max-width:960px){
    .exercises-flow{
      padding: 22px 0;
    }
  }
</style>