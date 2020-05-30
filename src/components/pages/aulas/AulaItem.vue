<template>
  <div class="aula-item" :class="{'onhold':data==null}" >
    <div v-if="data != null" class="aula-row">
      <div class="name" >
        {{data.name}}</div>
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
    min-height: 36px;
  }

  .aula-row{
    cursor: pointer;
    width: 100%;
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    align-items: center;
    border-bottom: solid 1px #ddd;
 height:36px;
    position: relative;

  }
  .aula-row:after{
    content: "";
    position: absolute;
    top: 0;left:0;
    height: 100%;
    width: 10px;
    background-color: #ddd;
    transition: background-color .2s;
  }
  .aula-item:hover .aula-row:after{
    transition: all .5s;
    background-color: rgb(255, 255, 255);
    width: 100%;
    z-index: -1;
  }
  .aula-item:active .aula-row:after{
    width: 100%;
    border: black;
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
</style>