<template>
  <div class="aula-item" :class="{'onhold':data==null}" >
    <div v-if="data != null" class="aula-row unselectable">
      <font-awesome-icon icon="play-circle" class="aula-pbutton"></font-awesome-icon>
      <div class="name" >{{data.name}}</div>
      <span  v-if="data.exercisesNotRevised > 0" class="flex-row notification mr-3">
        {{data.exercisesNotRevised}} new!
      </span> 
      <span class="text-muted mr-2">{{data.exercisesReplied}} / {{data.exercisesAmount}} </span> 
    </div>
     <div v-else>
      <div class="loading-comp"></div>
    </div>
  </div>
</template>

<script>
export default {
  props:{data:Object}

}
</script>

<style scoped>
  .aula-pbutton{
    font-size: 1.2em;
    cursor: pointer;
  }
  .aula-item{
    width: 100%;
    min-height: 42px;
  
  }

  .aula-row{
    cursor: unset;
    width: 100%;
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    align-items: center;
    height:43px;
    position: relative;
    overflow: hidden;
    font-weight: 500;
    font-size: 1.1em;
    padding: 0 12px;
    border-radius: 5px;
    background-color: rgb(246, 246, 246,.8);
    border: solid 1px #e1e1e1;
  }
  .aula-row:hover{
    background-color: #23275028;
  }
  .aula-row:hover .aula-pbutton{
    color: rgb(160, 14, 33);
  }

  .name{
    font-family: "gothamBook", Arial, Helvetica, sans-serif !important;
    flex:1;
    margin-left: 22px;
    width: 100%;
    text-align: left;
    font-size: 1em;
    line-height: 1em;
    max-height: 1em;
    text-transform: uppercase;
    white-space: normal;
    overflow: hidden;
    text-overflow: ellipsis;
    display: flex;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 1;
    color: #333;
  }
  .onhold{
    background-color: rgb(255, 255, 255);
    border-radius: 4px;
    padding:8px
  }
  .notification{
    width: fit-content;
    background-color: rgb(131, 231, 153);
    color: white;
    text-shadow: 0px 2px 20px #0000;
    height: 24px;
    padding: 0 12px;
    border-radius: 20px;
    display: flex;
    align-items: center; justify-content: center;
    margin-left: 18px;
  }
  @media only screen and (max-width: 960px){
    .name{
      font-size: .86em;
    }
  }
  @media only screen and (max-width: 756px){
    .name{
      font-size: .72em;
    }
  }
</style>