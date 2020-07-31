<template>
  <aside class="menu">
     <div class="menu-header">
        <img class="logo" src="../../assets/logo.webp" alt=""> 
    </div>
    <menu-contents></menu-contents>
  </aside>
</template>

<script>
import UserProfile from "../utils/UserProfile";
import {mapGetters} from 'vuex';
import MenuContents from "./MenuContents"
export default {
  components:{
    UserProfile,MenuContents
  },computed:{
    ...mapGetters(["get_user"])
  }
}
</script>

<style>
  .menu{
    width: 260px;
    height: 100vh;
    position: relative;
    background: #0575E6;  /* fallback for old browsers */
    background: -webkit-linear-gradient(to right, #021B79, #0523aa);  /* Chrome 10-25, Safari 5.1-6 */
    background: linear-gradient(to right, #021B79, #0523aa); /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */
    display: flex;
    flex-direction: column;
    align-items: center;
    box-shadow: 0px 2px 16px #0009;
    z-index: 2;
  }
  .menu:before{
    content:"";
    position:absolute;
    left:0;right:0;
    width:100%;
    height:100%;
    background-image: url("../../assets/bgdetail.webp");
    background-repeat: no-repeat;
    background-position: right 50px;
    background-size: 500px;
    opacity: .036;
    z-index: -1;
  }  
  .menu:after{
    content:"";
    position:absolute;
    left:0;top:0;
    width:100%;
    height:100%;
    background-image: url("../../assets/bottommenu.svg");
    background-repeat: no-repeat;
    background-position: center calc(100%);
    background-size: 260px;
    opacity: 1;
    z-index: -1;
  } 
  @media only screen and (max-height: 708px){.menu:after{background-position: center calc(100% + 20vh);}}
  @media only screen and (max-height: 586px){.menu:after{background-position: center calc(100% + 40vh);}}



  @media only screen and (max-width: 960px){
    .menu{display: none;}
  }
  .menu-header{
    width: 100%;
    height: 108px;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .menu-header img.logo{ height: 58px;margin-top: 16px;}
 
</style>