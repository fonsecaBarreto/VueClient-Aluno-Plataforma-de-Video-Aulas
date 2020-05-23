<template>
  <aside class="menu">
     <div class="menu-header">
        <img class="logo" src="../../assets/logo.png" alt="">
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
    position: relative;
    /* 
    background: -moz-linear-gradient(90deg, rgba(25,61,137,1) 0%, rgba(35,51,102,1) 74%, rgba(35,51,102,1) 100%);
    background: -webkit-linear-gradient(90deg, rgba(25,61,137,1) 0%, rgba(35,51,102,1) 74%, rgba(35,51,102,1) 100%);
    background: linear-gradient(90deg, rgba(25,61,137,1) 0%, rgba(35,51,102,1) 74%, rgba(35,51,102,1) 100%);
     */
   
     background-color: #222222;
     background: rgb(25,61,137);
     background-color: #720615;
     display: flex;
    flex-direction: column;
    align-items: center;
    box-shadow: 0px 2px 16px #0009;
    z-index: 2;
  }
  .menu:after{
    content:"";
    position:absolute;
    left:0;right:0;
    width:100%;
    height:100%;
      background-image: url("../../assets/bgdetail.png");
      background-repeat: no-repeat;
      background-position: top top;
      background-size: 500px;
      opacity: .045;
      z-index: -1;
  }
  @media only screen and (max-width: 960px){
    .menu{display: none;}
  }
  .menu-header{
    width: 100%;
    min-height: 100px;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .menu-header img.logo{ height: 52px;}
 
</style>