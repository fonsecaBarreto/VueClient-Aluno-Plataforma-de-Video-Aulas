<template>
  <div class="d-flex">
    <button @click="previous" class="mnr-button ll" v-if="previousButton">
      <font-awesome-icon icon="chevron-left"></font-awesome-icon> 
      <font-awesome-icon icon="chevron-left"></font-awesome-icon> 
        <span class="ml-2 btntextarr"> Aula anterior</span>
    </button>
   
    <button @click="next" class="mnr-button rr mr-0 ml-auto" v-if="nextButton">
      <span class="mr-2 btntextarr">
        Proxima Aula
      </span>
      <font-awesome-icon icon="chevron-right"></font-awesome-icon> 
      <font-awesome-icon icon="chevron-right"></font-awesome-icon> 
    </button>
  </div>
</template>

<script>
export default {
  props:{previous:Function, next: Function, previousButton:{type:Boolean, default:true}, nextButton:{type:Boolean, default:true}},
  methods:{
   
  }
}
</script>

<style scoped>
  .mnr-button{
    background-color: #221E3D;
    border: none;outline: none;border-radius: 5px;
    color: white;
    font-size: .9em;
    padding: 5px 24px;
  }
  .mnr-button.ll{
    border-bottom-right-radius: none;
    border-bottom-left-radius: 18px;

  }
  .mnr-button.rr{
     border-bottom-left-radius: none;
    border-bottom-right-radius: 18px;
  }
  .mnr-button:hover{
    background-color: #2c2553;
  }
  .mnr-button:active{
    color: rgb(245, 227, 227);
  }

  @media only screen and (max-width:500px){
    .btntextarr{
      display: none;
    }
  }
</style>