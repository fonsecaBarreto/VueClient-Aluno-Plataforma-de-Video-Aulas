<template>
<div class="k9video-container bd-red">
 
  <div class="k9video-vp" @click="play()">
    <div class="vp-mapping vp-left-mapping" @dblclick="backwards(10)">
      
      <transition name="showup">
        <div class="vp-mapping-presentation" v-if="backwards_presentation">
          <font-awesome-icon icon="chevron-left"></font-awesome-icon> 
          <font-awesome-icon icon="chevron-left"></font-awesome-icon> 
        </div>
      </transition>
    </div>
    <div class="vp-mapping">
         <transition name="showup">
        <div class="vp-mapping-presentation" v-if="play_presentation">
          <font-awesome-icon icon="play"></font-awesome-icon> 
        
        </div>
      </transition>
    </div>
    <div class="vp-mapping vp-right-mapping" @dblclick="forward(15)">

    <transition name="showup">
      <div class="vp-mapping-presentation" v-if="forward_presentation">

        <font-awesome-icon icon="chevron-right"></font-awesome-icon> 
        <font-awesome-icon icon="chevron-right"></font-awesome-icon> 
      </div>
       </transition>

    </div>
    <video class="k9video unselectable"  ref="video" :src="videoSourceResult" :muted="muted" controlsList="nodownload">
    </video>
  </div> 
  <div class="k9controls bd-green" ref="seekbar">
   
    <k9-pg-bar :progress="getProgressRate || 0"  @click.native = 'grabSeekbar'></k9-pg-bar>
   
    <div class="h-100 px-2 px-md-3 px-lg-4 w-100 d-flex flex-row justify-content-start align-items-center">
      <k9-play-button @click.native="play()"  v-show="paused == true" :paused="true" class="mr-2"></k9-play-button>
      <k9-play-button @click.native="play()" v-show="paused == false" ></k9-play-button>
      
        <button @click="speedConfig = !speedConfig; dimConfig = false" class="k9button ml-2 small">
           <k9-right-ov v-if="speedConfig">
             <span>Speed</span>
              <a href="" class="text-white k9configopt text-left small py-1 " v-for="(v) in speeds" :key="v"
              @click.prevent="changeSpeed(v)">
                {{v}}x
              </a>
            
           </k9-right-ov>
           <span class="small">{{speed}}x</span>
       
        </button>
      
      <div class="ml-3 d-flex  align-items-center text-white small" >
        <span>{{getCurrentTime}} : {{getDuration}}</span>
      </div>
    
      <div class="mr-o ml-auto d-flex flex-row">
          
        <button  class="k9button ml-2" @click="muted=!muted">
          <font-awesome-icon :icon="muted?'volume-mute':'volume-up'"></font-awesome-icon>
        </button>
        
        <button @click="dimConfig = !dimConfig; speedConfig = false" class="k9button ml-2" v-if="resolutions.length">
           <k9-right-ov v-if="dimConfig">
             <span>Resolution</span>
              <a href="" class="text-white k9configopt text-left small py-1 px-2" v-for="(v,i) in resolutions" :key="i"
              @click.prevent="changeResolution(i)"> {{v}}
              </a>
           </k9-right-ov>
          <font-awesome-icon icon="wave-square" >
          </font-awesome-icon>
            <span v-if="resolutions.length" class="small ml-1">{{resolutions[resolutionIndex]}}</span>
        </button>


        <button @click="fullscreen()" class="k9button ml-2">
          <font-awesome-icon icon="expand"></font-awesome-icon>
        </button>

      </div>

    </div>
    
    
  </div>
</div>
</template>

<script>
import K9PlayButton from "./K9PlayButton"
import K9PgBar from "./k9PgBar"
import K9RightOv from "./K9RightOv"
import { mapGetters } from 'vuex'
export default {
  props:{src:Array},
  components:{K9PlayButton,K9PgBar,K9RightOv},
  data(){
    return{
      paused:true,
      time:0,
      duration:0,
      progress:0,
      seekbarWidth: 0,   
      speed:1,
      speedConfig:false,
      dimConfig:false,
      speeds:["0.75","1.00","1.25","1.50"],
      resolutions:[],
      resolutionIndex:0,
      muted:false,
      forward_presentation:false,
      backwards_presentation:false,
      play_presentation: true
    }
  },
  methods:{
    forward(secs){
      this.forward_presentation = true
      if(this.paused) this.play();
      if(this.vid.currentTime + secs >= this.duration){
        this.time = this.vid.currentTime = this.duration
      }else{
        this.time = this.vid.currentTime = this.vid.currentTime + secs;
      }
      setTimeout(()=>{
        this.forward_presentation = false
      }, 360)
    },
    backwards(secs){
      this.backwards_presentation = true
      if(this.paused) this.play();
      if(this.vid.currentTime - secs <= 0){
        this.time = this.vid.currentTime = 0
      }else{
        this.time = this.vid.currentTime = this.vid.currentTime - secs;
      }
      
       setTimeout(()=>{
        this.backwards_presentation = false
      }, 360)
    },
    changeSpeed(v){this.speed= Number(v)},
    changeResolution(i){ this.resolutionIndex= Number(i)},
    fullscreen(){this.vid.requestFullscreen()},
    play(){
      this.paused = !this.paused
      
      setTimeout(()=>{
        this.play_presentation = this.paused
      }, 281)

      this.speedConfig = false;
      this.dimConfig = false;
      if(!this.paused){
        this.vid.play()
        this.loop() 
      }else{
     
        this.vid.pause()
      }  
    },
    loop: function() {
   
        if (this.paused) return;
        this.time = this.vid.currentTime;
        requestAnimationFrame(() => {
          this.loop();
        });
      },
    convertSecondsToTime: function(time) {
      let seconds = Math.floor(time % 60);
      if (seconds < 10) seconds = '0' + seconds;
      let minutes = Math.floor(time / 60 % 60);
      return `${minutes}:${seconds}`
    },
    grabSeekbar: function(event) {
      this.time = this.vid.currentTime = (event.layerX ) / this.seekbarWidth * this.duration;
    },
    reLayoutSeekbar: function() {
      this.seekbarWidth = this.seekbar.clientWidth; 
    },
  },
  computed:{
    ...mapGetters([ 'get_screenWidth' ]),
    videoSourceResult(){
      var result = null
      if(this.src.length){
        result = this.src[this.resolutionIndex].src
      }
      return result
    },
    getProgressRate: function() {
      return (this.time / this.duration) * 100;
    },
    getCurrentTime: function() {
      return this.convertSecondsToTime(this.time)
    },
    
    getDuration: function() {
      return this.convertSecondsToTime(this.duration);
    },
  },
  watch:{
    resolutionIndex(){
      this.paused = true
    },
    speed(){this.vid.playbackRate = this.speed},
    src:{
      immediate:true,
      handler (videos) { 
        if(videos.length){
          this.resolutions = videos.map((r)=>r.resolution)
          this.paused = true;
          this.time= 0
          this.resolutionIndex= this.get_screenWidth > 960 ? 0 : this.get_screenWidth > 640 ? 1 : 2
        }
      }
    }
  },
  mounted(){
    this.seekbar = this.$refs.seekbar
    this.vid = this.$refs.video;
    this.vid.addEventListener('loadedmetadata', () => { 
      this.vid.currentTime =this.time
      this.duration = this.vid.duration; 
    });
    this.vid.addEventListener('ended', () => {
      this.paused = true;
    });
    window.addEventListener('resize', this.reLayoutSeekbar);
    this.reLayoutSeekbar() 

  }
} 


</script>

<style scoped>
.vp-mapping-presentation{
  width: 76px;
  height: 76px;
  background-color: #0004;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;

  box-shadow: 0px 0px 12px #0002;
   font-size: 1.8em;
}
  .vp-mapping{
    position: absolute;
    top:0;bottom: 0;
    margin: auto;
    width: 24%;
    height: 100%;
    z-index: 6;
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    left: 0;right:0;
    color: white;
   
    
  }
  .vp-left-mapping{
    width: 38%;
 
    left:0;
    right: auto;
  }
  .vp-right-mapping{
    width: 38%;
    
    right: 0;
    left: auto;
  }
  .k9button{
    position: relative;
    outline: none; border: none; background-color: transparent;
    height: 28px;
    display: flex;
    align-items: center;justify-content: center;
    font-size: 1em;
    color: rgb(200, 200, 225);
    text-shadow: 0px 1px 4px #000;
    cursor: pointer;
  }
  .k9button:hover{
    color: rgb(255, 255, 255);
  }
  .k9video-container{
    height: fit-content;
    width: 100%;
    display: -webkit-box;      /* OLD - iOS 6-, Safari 3.1-6 */
    display: -moz-box;         /* OLD - Firefox 19- (buggy but mostly works) */
    display: -ms-flexbox;      /* TWEENER - IE 10 */
    display: -webkit-flex;     /* NEW - Chrome */
    display: flex;  
    flex-direction: column;
    border-radius: 4px;
    overflow: hidden;
    box-shadow: 0px 4px 3px #0003;
    
  }
  .k9video-vp{
    position: relative;
    width: 100%; padding-bottom:  46%;
    overflow: hidden;
 
    background-color: #111;
  }
  .k9video-container .k9controls{
    height: 46px;
    width: 100%;
    background-color: #221E3D;
    display: flex;
    flex-direction: column;
    align-items: center;
    position: relative;
  }
 

  @media only screen and (max-width: 756px){
    .k9video-vp{
      padding-bottom: 56%;
    }
  }
  .k9video-vp .k9video{
    height: 100%;
    position: absolute;
    top:0;bottom:0;left: 0;right:0;
    margin: auto;  
  }
</style>