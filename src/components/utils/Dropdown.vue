<template>
  <div class="dropdown ">
    <div class="dropdown-button" @click="show=!show">
      <font-awesome-icon icon="chevron-down" />
    </div>
    <div class="dropdown-body" v-show="show">
    
      <slot >

      </slot>
     
    </div>
  </div>
</template>

<script>
export default {
  data(){
    return{
      show:false
    }
  }
}
</script>

<style scoped>
  .dropdown{
    z-index: 99999;
  }
 
  .dropdown-body{
    right: 0;
    top:40px;
    border-radius: 3px;
    box-shadow: 0px 12px 8px #00000019;
    position: absolute;
    width: fit-content;
    padding: 10px 16px;
    border: solid 1px #ccc;
    background-color: white;
    z-index: 9999;
    min-width: 100px;
    min-height: 48px;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    white-space: nowrap;
   
  }
  .dropdown-body *{
    padding: 4px 6px;

  }
  .dropdown-button:hover{
    background-color: rgba(0,0,0,.025);
    cursor: pointer;
  }
   
  .dropdown-button:active{
    background-color: rgba(0,0,0,.05);
    color: white;
  }
   
  .dropdown-button{ 
    margin: auto 4px;
    padding: 8px;
    border-radius: 50%;
    display: flex;
    justify-content: center;
    align-items: center;
    
  }

</style>