<template>
  <aside class="menu">
    <router-link to="/" tag="span" class="btn menu-header d-flex flex-column justify-content-center align-items-end bd-red">
      <img class="logo" src="../../assets/logo.webp" alt=""> 
      <span class="text-white small text-right mr-1">Clube de Inglês</span>
    </router-link>
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

<style scoped>
  .menu{
    width: 260px; height: 100vh;
    background-color: #221E3D;
    background: -webkit-linear-gradient(to right, #18142c, #29234b);  
    background: linear-gradient(to right, #18142c, #29234b); 
    box-shadow: 0px 2px 12px #0006;
    z-index: 99;
  }
  .menu:before{
    content:"";
    position:absolute;left:0;right:0;
    width:100%; height:100%;
    background:  url("../../assets/bgdetail.webp") no-repeat right 50px;
    background-size: 500px;
    opacity: .035; z-index: -1;
  }  
  .menu:after{
    content:""; position:absolute;left:0;top:0;
    width:100%;height:100%;
    background-image: url("../../assets/menubottom.svg");
    background-repeat: no-repeat;
    background-position: center calc(100%);
    background-size: 260px;
    opacity: 1; z-index: -1;
  } 
  @media only screen and (max-height: 708px){.menu:after{background-position: center calc(100% + 20vh);}}
  @media only screen and (max-height: 586px){.menu:after{background-position: center calc(100% + 40vh);}}
  @media only screen and (max-width: 960px){ .menu{display: none;} }
 
  .menu-header{width: 100%; padding: 24px 40px 0}
  .menu-header img.logo{ width: 100%; height: auto;}
 
</style>