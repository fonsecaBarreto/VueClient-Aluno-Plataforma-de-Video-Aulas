<template>
  <div id="support">
     <div class="box">
      <img class="ranking-img" src="../../../assets/ArtboardSupport.svg" alt="">
      <div class="d-flex flex-column my-4 mb-5">
        <span class="ranking-text">
          Sua opinião é extremamente importante para a evolução de nosso Clube.
          valorizamos os Alunos que desejam dar seu feedback
        
        </span>
      </div>
     
      <div class=" d-flex flex-column justify-content-start align-items-center">
    
         

          <p>
            <a href="mailto:suporte@mathewslins.com" class=" d-flex align-items-center
             contact-row ">
             <font-awesome-icon icon="envelope" class="mr-2"></font-awesome-icon>
              suporte@mathewslins.com
            </a>
          </p>

          <div class="d-flex flex-column flex-sm-row align-items-center">
            <a target="_blank"  href="https://wa.me/5522998088902" class="d-flex align-items-center contact-row"> (22) 99808-8902</a>
            <span class="mx-3">-</span> 
            <a target="_blank" href="https://wa.me/5522997836256" class="d-flex align-items-center contact-row"> (22) 99783-6256</a>
          </div>


          <div class="d-flex flex-sm-row align-items-center mt-3">
           
            <a target="_blank"  :href="instagram" class="footer-social d-flex "><font-awesome-icon :icon="{ prefix: 'fab', iconName: 'instagram' }"/> <span class="d-none d-md-flex ml-3">Instagram</span></a>
            <a target="_blank"  :href="facebook" class="footer-social d-flex"><font-awesome-icon :icon="{ prefix: 'fab', iconName: 'facebook' }"/>  <span class="d-none d-md-flex ml-3">Facebook</span></a>
            <a target="_blank"  :href="youtube" class="footer-social d-flex"><font-awesome-icon :icon="{ prefix: 'fab', iconName: 'youtube' }"/>  <span class="d-none d-md-flex ml-3">Youtube</span> </a>
       
          </div>
  
     
  
      </div>
    </div> 
  </div>
</template>

<script>
import {facebook, instagram, youtube} from "../../../global.js"
export default {
  data(){
    return{facebook,instagram,youtube}
  }
}
</script>

<style scoped>
.footer-social {
    align-items: center;

  margin: 22px 22px;
  font-size: 1.3em;
  cursor: pointer;
}
.footer-social:hover{

  color: rgb(25, 90, 187);
}
  .whatsicon{
    height:2em;
    width: 2em;
    background: url("../../../assets/whatsapp.svg");
    background-position: center;
    background-size: cover;
    fill:black
  }
.contact-row{
  font-family: 'Franklin Gothic Medium', 'Arial Narrow', Arial, sans-serif;
  font-weight: 600;
  color: #333;
  font-size: 1.2em;
}
@media only screen and (max-width: 360px){
  .contact-row{
    font-size: 1em;
  }
}
    #ranking{
    width: 100%;
    height: 100%;
  }
</style>