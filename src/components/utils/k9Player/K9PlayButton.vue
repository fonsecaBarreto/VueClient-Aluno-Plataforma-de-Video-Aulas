<template>
  <button id="k9-play-button">
   
    <font-awesome-icon :icon="paused?'play':'pause'"></font-awesome-icon>
  </button>
</template>

<script>
export default {
  props:{paused:{type:Boolean, default:false}}
}
</script>

<style scoped>
  .k9controls #k9-play-button{
    outline: none; border: none; background-color: transparent;
    height: 30px;width: 36px;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 1em;
    
    color: rgb(243, 243, 243);
    text-shadow: 0px 0px 5px #000;
    cursor: pointer;
  }
  .k9controls #k9-play-button:hover{
    color: rgb(255, 255, 255);
  }
</style>