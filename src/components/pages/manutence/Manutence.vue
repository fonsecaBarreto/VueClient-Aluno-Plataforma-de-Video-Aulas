<template>
  <div id="manutence-screen" class="d-flex flex-column justify-start align-items-center">
    <div class="app-container">
   
      <div class="manutence-box d-flex flex-column justify-start align-items-center">
      <img class="manutence-logo mb-3" src="../../../assets/logo.png" alt=""> 
      <h4  class=" mb-5 text-center">Em Manutenção!</h4>
 
     <img class="manutence-ilustration" src="../../../assets/manutence.svg" alt=""> 
      <span class="text-muted ">Seremos breve, Tente novamente em instantes!</span>
       
         </div>
      </div> 
 
  </div>
</template>

<script>
export default {

}
</script>

<style scoped>
  .manutence-ilustration{
    width:100%;
    margin: 32px 0 12px 0;
  }
  .manutence-logo{
    width: 250px;
    margin: auto;
    display: block;
  }
  @media only screen and (max-width: 480px){
    .manutence-logo{
      width: 90%;
      margin: auto;
      display: block;
    }
  }
  #manutence-screen{
    width: 100%;
    height: 100%;
    min-height: 100vh;
    background-image: url("../../../assets/bgv3.svg");
    background-position: center;
    background-size: cover; 
  }
 
  .manutence-box{
    background-color: #eee;
    margin: auto;
    height: 100%;
    width: 100%;
    max-width: 640px;
    padding: 32px;
    border-radius: 20px;
    box-shadow: 0px 6px 12px #0005;
  } 
</style>