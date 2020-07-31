<template>
    <div class="user-avatar" :class="{first,second,third}">
      <div class="vp">
        <img :src="src" alt=""> 
      </div>
    </div>
</template>

<script>
export default {
  props:{picture:String,first:Boolean,second:Boolean,third:Boolean},
  data(){
    return {
      src:require("../../../assets/nouser.svg")
    }
  },watch:{
    picture:{
      immediate:true,
      handler(newval){
        
        this.src = newval != "" ? newval :this.src ;
      }
    }
  }
}
</script>

<style scoped>
  .user-avatar{
    width: 42px;
    height: 42px;
    position: relative;
    border-radius: 50%;
    display: flex;
    justify-content: center;
    align-items: center;
    box-sizing: border-box;
    box-shadow: 0px 2px 2px #0006;
    background-color:white!important;
  }
  .user-avatar .vp{
    width: 38px;
    height: 38px;
    border-radius: 50%;
    position: relative;
    overflow: hidden;
    background-color:white!important;
  }
  .user-avatar .vp::after{
    content: "";
    position: absolute;
    width: 100%;height: 100%;
    top: 0;left: 0;
    border-radius: 50%;
    box-shadow: inset  0px 0px 4px #0004;
  }

  .user-avatar .vp>img{
    position: absolute;
    top:0;bottom: 0;right: 0;left: 0;margin: auto;
    object-fit: cover;
    height: 100%;
  }

</style>