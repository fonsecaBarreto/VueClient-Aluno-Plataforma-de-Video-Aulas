<template>
  <div class="pg-bar" >
    <div class="pg-bar-content" :style="{width:`${progress}%`}"></div>
  </div>
</template>

<script>
export default {
  props:{progress:Number}
}
</script>

<style>
  .pg-bar{
    width: 100%;
    height: 7px;
    background-color:rgba(0,0,0,.3);
  
    cursor: pointer;
  }
  .pg-bar-content{
    width: 30%;
    height: 100%;
    background-color: red;
    
  }
</style>