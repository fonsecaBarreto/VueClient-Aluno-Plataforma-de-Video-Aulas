<template>
  <div class="aula-item" :class="{'onhold':data==null}" >

    <div v-if="data != null" class="aula-row">
      <div class="name" >{{data.name}}</div>
    <span  v-if="data.exercisesNotRevised > 0" class="flex-row notification mr-3">
        {{data.exercisesNotRevised}} new!
      </span> 

         <span class="text-muted mr-2">
          
         {{data.exercisesReplied}} / {{data.exercisesAmount}}
        </span> 
    </div>
  </div>
</template>

<script>
export default {
  props:{data:Object}

}
</script>

<style scoped>
 
  .aula-item{
    width: 100%;
    min-height: 42px;
  }

  .aula-row{
    cursor: pointer;
    width: 100%;
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    align-items: center;
    border-bottom: solid 1px #ddd;
    height:40px;
    position: relative;
    overflow: hidden;
  }
  .aula-row:after{
    content: "";
    position: absolute;
    top: 0;left:0px;
    height: 100%;
    width: 10px;
    background-color: rgb(240, 240, 240);
    border: solid 1px #ddd;
    transition: all .2s;
  }
  .aula-item:hover .aula-row:after{
    transition: all .25s;
    background-color: #0575E6;
     border: solid 1px #ddd;
  }
  .aula-item:active .aula-row:after{
    width: 100%;
      background-color: #0575E6;
     width: 10px;
  }
  .name{
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
  .aula-item:hover .name{
    color: black;
  }
  .onhold{
    background-color: #ddd;
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
</style>