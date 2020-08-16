<template>
  <div class="d-flex flex-column mb-2">
    <span class="audio-text">{{audio.text}}</span>
    <audio :src="audio.location" controls controlsList="nodownload" class="w-100 audioel"></audio>
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
      audio:{ ...INITIAL_AUDIO }
    }
  },
  watch:{
    entity:{
      immediate:true,
      handler(val){
        if(val == null) return this.audio = { ...INITIAL_AUDIO }
        this.audio = { ...INITIAL_AUDIO,...val}
      }
    }
  }
}
</script>

<style>
.audio-text{
  color: #222;
  padding-left: 20px;
  line-height: 1em;
  font-size: 1.2em;
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