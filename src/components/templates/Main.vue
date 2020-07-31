<template>
  <div id="main-template"  class="bd-red">
    <header-header></header-header> 
    <Menu></Menu> 
    <Content>
      <slot></slot>
      <div class="loading-div" v-if="get_loading == true"></div>
    </Content> 
  </div>
</template>

<script>
import Menu from "./Menu"
import Content from "./Content"
import HeaderHeader from "./HeaderHeader"
import {mapGetters} from "vuex"
export default {
  components:{Menu,Content,HeaderHeader},
  computed:{...mapGetters(["get_loading"])}
}
</script>

<style>

  #main-template{
    background-color: #304e4e10;
    flex:1;
    display:grid;
    grid-template-rows: auto 1fr;
    grid-template-columns: auto 1fr ;
    grid-template-areas: "menu content" "menu content";
    height: 100%;width: 100%;
    min-height: 100vh;
  }
  @media only screen and (max-width:960px){
    #main-template{
      grid-template-areas: "header header" "content content" 
    }
  }
  .header{grid-area: header;}
  .content{grid-area: content;position: relative}
  .menu{grid-area: menu;position: sticky; top:0;left:0}
  .menu-item{
    color: white;
    font-size: 1.1em;
    padding: 6px 20px;
  }
  .menu-item span{margin-left: 8px;}

/*  */
 .loading-div{
    position: absolute;
    top: 0;left: 0;
    width: 100%;height: 100%;
    background-color: rgba(248, 247, 247, 1);
    background-image: url("../../assets/loading.svg");
    background-repeat: no-repeat;
    background-size: 180px;
    background-position: center 300px;
    z-index: 9999;
  }
</style>