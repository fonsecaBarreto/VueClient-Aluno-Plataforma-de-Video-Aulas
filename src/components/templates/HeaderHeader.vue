<template>
  <header class="header" :class="{expand}" >
    <div class="header-row ">
      <user-profile :user="get_user"></user-profile>
      <router-link to="/">
        <img  class="logo" src="../../assets/logo.webp" alt="">
      </router-link>
      <span class="toggle-button" @click="toggleMenu()">
        <font-awesome-icon icon="bars"></font-awesome-icon>
      </span>
      
    </div>
    <transition name="rollup">
      <div class="header-menu " v-if="get_menu">
        <menu-contents>
        </menu-contents>
      </div>
    </transition> 
  </header>
  
</template>

<script>

import { mapGetters } from 'vuex'
import UserProfile from "../utils/UserProfile"
import MenuContents from "./MenuContents"
export default {
  components:{UserProfile,MenuContents},
  data(){
    return{
      expand:false
    }
  },
  methods:{
    toggleMenu(){
      this.$store.dispatch("toggleMenu");
      
    }
  },
  computed:{
    ...mapGetters(["get_user","get_menu"]),
  }
}
</script>

<style scoped>
  

  header.header{
    transition: height .2s;
    position: relative;

    height: fit-content;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    z-index: 2;
  }
  .header-menu{
    width: 100%;
    min-height: 200px;

       background-color: #221E3D;
    background: -webkit-linear-gradient(to right, #18142c, #29234b);  
    background: linear-gradient(to right, #18142c, #29234b); 
    box-shadow: 0px 4px 9px #0003;
    z-index: -1;
    position: absolute;
    top: 64px;left:0;
  }
  header.header .header-row{

      background-color: #221E3D;
    background: -webkit-linear-gradient(to right, #18142c, #29234b);  
    background: linear-gradient(to right, #18142c, #29234b); 
    width: 100%;
    height: 64px;
    position: relative;
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    box-shadow: 0px 2px 5px #0004;
    padding: 0 16px;
  }
 
  @media only screen and (min-width: 960px){
    header.header{
      display: none;
    }
  }
  header.header .logo{
    height: 42px;
    margin:auto;
    position: absolute;
    top: 0;left: 0;right: 0; bottom: 0;
  
  }
  header.header .profile{
    height: 36px;
    width: 36px;
    background-color: white;
    margin:auto auto auto 0;
    border-radius: 50%;
    box-shadow: 0px 2px 3px #0003;
  }
  .toggle-button{
    height: 50px;
    width: 50px;
    display: flex;
    justify-content: center;
    align-items: center;
    color: white;
    font-size: 1.4em;
    cursor: pointer;
    border-radius: 6px;
    margin-right: 0;
    margin-left: auto;
  }
  .toggle-button:hover{
    background-color: #ffffff02;

    border: solid 1px #0002

  }
  .toggle-button:active{
    transition: all .08s;
   
    background-color: rgba(0,0,0,.2);
    box-shadow:  inset 0px 0px 8px #0002;
  }
</style>