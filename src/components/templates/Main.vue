<template>
  <div id="main-template" >
    <header-header></header-header>
    <Menu></Menu>
    <Content>
      <slot></slot>
    </Content>
    
  </div>
</template>

<script>
import Menu from "./Menu"
import Content from "./Content"
import HeaderHeader from "./HeaderHeader"
export default {
  components:{Menu,Content,HeaderHeader}
}
</script>

<style>
#main-template{
  width:100vw;
  height: 100vh;
  flex:1;
  display:grid;
  grid-template-rows: auto 1fr;
  grid-template-columns: auto 1fr ;
  grid-template-areas: "menu content" "menu content";
  transition: .25s;
}
@media only screen and (max-width:960px){
  #main-template{
    grid-template-areas: "header header" "content content" 
  }
}
.content{grid-area: header;}
.content{grid-area: content;}
.menu{grid-area: menu;}
  .menu-item{
    color: white;
    font-size: 1.1em;
    padding: 6px 20px;
  }
  .menu-item span{
    margin-left: 8px;
  }
</style>