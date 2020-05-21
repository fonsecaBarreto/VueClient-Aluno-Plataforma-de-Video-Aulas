<template>
  <aside class="menu">
     <div class="menu-header">
        <img class="logo" src="../../assets/logoalt.png" alt="">
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
    background: rgb(25,61,137);
    background: -moz-linear-gradient(90deg, rgba(25,61,137,1) 0%, rgba(35,51,102,1) 74%, rgba(35,51,102,1) 100%);
    background: -webkit-linear-gradient(90deg, rgba(25,61,137,1) 0%, rgba(35,51,102,1) 74%, rgba(35,51,102,1) 100%);
    background: linear-gradient(90deg, rgba(25,61,137,1) 0%, rgba(35,51,102,1) 74%, rgba(35,51,102,1) 100%);
    display: flex;
    flex-direction: column;
    align-items: center;
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
  .menu-header img.logo{
  
    height: 52px;
  }
 
</style>