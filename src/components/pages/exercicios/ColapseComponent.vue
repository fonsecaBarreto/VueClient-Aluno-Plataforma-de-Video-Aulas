<template>
  <div class="colapse-component">
    <div class="colapse-header d-flex flex-row justify-content-start align-items-center ">
      
      <span class="colapse-arrow"
        @click="colapse=!colapse">
        <font-awesome-icon :icon="colapse ?'chevron-down':'chevron-right'">
        </font-awesome-icon>  
      </span>

      <span class=" d-flex justify-cotnent-start align-items-center unselectable" >
        <font-awesome-icon :icon="icon" class="mr-2" v-if="icon"></font-awesome-icon>
        <span v-if="title" class="title"> {{title}} </span>
        <span v-if="description" class="description">
            <span class="mx-2 text-muted small">-</span>
           {{description}} </span>
      </span>
    </div>
    <transition name="roll">
      <div class="colapse-body bd-blue" v-show="colapse">
        <slot></slot>
      </div>
    </transition>
  </div>
</template>

<script>
export default {
  props:{title:String,icon:String,description:String, colapseState:Boolean},
  data(){
    return {
      colapse:false
    }
  },
  watch:{
    colapseState:{
      immediate:true,
      handler(val){
        if(val)
          this.colapse = val
      }
    }
  }
}
</script>

<style scoped>
.colapse-component{
  margin-top: 4px;
}
  
  .roll-enter-active, .roll-leave-active {
    transition: all .25s;
    transform: translateY(0);
  }
  .roll-enter, .roll-leave-to /* .fade-leave-active em versões anteriores a 2.1.8 */ {
    transition: all .25s;
    opacity: 0;
    transform: translateY(-32px);
  
  }

  .colapse-header{
    border-bottom: solid 1px #ddd;
    font-weight: 600;
    box-shadow: 0px 10px 22px #00000006;
    background-color: #f4f4f422;
    border-radius: 2px;
    color: rgb(17, 16, 95); 
  }
  .colapse-header .colapse-arrow{
    font-size: .8em;
    position: relative;
    color: rgb(17, 16, 95); 
    width: 38px;
    height: 100%;
    padding: 10px;
    cursor: pointer;
  }
  .colapse-header .title{
    white-space: nowrap;
    font-size: 1em;
    width: fit-content;
  }
  .description{
    font-size: .92em;
    font-weight: 500;
    display: flex;
    align-items: center;
  }
 
  .colapse-body{
    padding: 0 20px;
    background-color: #fff8;
    border-radius: 4px;
    box-shadow: inset 0 4px 12px #00000010;
    z-index: -1;
  }

   @media only screen and (max-width:756px){
    .colapse-body{
      padding: 0;
    }
    .colapse-header .title{
      white-space: nowrap;
      font-size: .82em;
      width: fit-content;
    }
    .description{
      display: none;
    }
  }
 
  
</style>