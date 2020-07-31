<template>
  <div class="dropdown ">
    <div class="dropdown-button" @click="show=!show">
      <font-awesome-icon :icon="icon" />
    </div>
    <div class="dropdown-body " v-show="show">
    
      <slot >

      </slot>
     
    </div>
  </div>
</template>

<script>
export default {
  props:{icon:{type:String,default:"chevron-down"}},
  data(){
    return{
      show:false
    }
  }
}
</script>

<style scoped>
  .dropdown{
    z-index: 1;
  }
 
  .dropdown-body{
    right: 6px;
    top:32px;
    border-radius: 3px;
    box-shadow: 0px 2px 4px #00000020;
    position: absolute;
    width: fit-content;
    padding: 6px 12px;
    border: solid 1px #ccc;
    background-color: white;
    z-index: 2;
  
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