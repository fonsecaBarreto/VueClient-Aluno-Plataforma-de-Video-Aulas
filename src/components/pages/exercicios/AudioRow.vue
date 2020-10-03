<template>
  <div class="audio-row unselected bd-green" @click="play()">
    <div class="d-flex justift-content-start align-items-center">

      <font-awesome-icon icon="play" class="play-audio"></font-awesome-icon>
      
      <span class="audio-text">{{audio.text}}</span>
    </div>
    <audio ref="audiocontrol" :src="audio.location"  controlsList="nodownload" class="w-100 audioel"></audio>
    <div class="audio-track" :style="{width:`${getProgressRate}%`}"></div>
  </div>
</template>

<script>
const INITIAL_AUDIO = {
  author:null,
  text: null,
  location:null
}
export default {
  props:{ entity:Object },
  data () {
    return{
      audio:{ ...INITIAL_AUDIO },
      paused: true,
      currentTime:0,
      duration:0
    }
  },
  computed:{
    getProgressRate: function() {
      return (this.currentTime / this.duration) * 100;
    },
  },
  methods:{
    play(){
      this.audiocontrol.currentTime = 0
      this.paused = false
      this.audiocontrol.play(); this.loop() 
    },
    loop: function() {
        if (this.paused) return;
        this.currentTime = this.audiocontrol.currentTime;
        requestAnimationFrame(() => {
          this.loop();
        });
      },
  },
  watch:{
    entity:{
      immediate:true,
      handler(val){
        if(val == null) return this.audio = { ...INITIAL_AUDIO }
        this.audio = { ...INITIAL_AUDIO,...val}
      }
    }
  },mounted(){
    this.audiocontrol = this.$refs.audiocontrol
    this.audiocontrol.addEventListener('loadedmetadata', () => { 
      this.duration = this.audiocontrol.duration; 
      this.currentTime=0;
      this.paused = true
    });
    this.audiocontrol.addEventListener('ended', () => {
      this.currentTime=0;
      this.paused = true
    });
  }
}
</script>

<style scoped>



.play-hover{
  color: red;
}
.audio-row{
  padding: 8px 16px;
  border: solid 1px #eee;
  border-radius: 6px;
  margin-bottom: 2px;
  cursor: pointer;
  color: rgb(18, 38, 107);
  position: relative;
  z-index: 1;
  box-sizing: border-box;
}
.play-audio{
  cursor: pointer;
  font-size: .8em;
}

.audio-row:hover{
  box-shadow: inset 0px 0px 2px rgb(7, 28, 75,.5);
}
.audio-row:active{
  background-color: rgb(252, 212, 212);
}
.audio-row:active .play-audio{
  color: rgb(196, 4, 4);
 
}

.audio-row .audio-track{
  position: absolute;
  top:0;left: 0;width: 0;height: 100%;
  background-color: rgba(224, 226, 253, 0.8);
  z-index: -1;
}
.audio-text{
  padding-left: 20px;
  line-height: 1em;
  font-size: 1em;
  margin-bottom: 3px;
}
.audioel{
   border: none;outline: none;
   height: 36px;
   padding-left: 0;
}
.audioel:hover{
   border: none;outline: none;
}
.audioel:focus{
  border: none;outline: none;
}
</style>