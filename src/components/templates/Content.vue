<template>
  <div class="content bd-green">
    <div class="app-container">
        <app-header v-if="title!= null" class="header" :title="title"></app-header>
         <span v-if="description!=null" class="module-description py-2" >
           <font-awesome-icon icon="info-circle" class="mx-2"></font-awesome-icon>
           {{description}}</span>
        <div class="inner-content bd-red">

          <slot></slot>
        </div>
    </div>
  </div>
</template>

<script>
import Header from "./Header"
import {mapGetters} from "vuex"
export default {
  components:{appHeader:Header},
  computed:{
    ...mapGetters(["get_module_title","get_module_description"]),
    title(){
      return this.$route.name || this.get_module_title;
    },
    description(){
      return this.get_module_description;
    }
  }
}
</script>

<style>
 .module-description{
    color: #555;
    text-align: left;
    width: 100%;
    font-size: 1em;
    text-align: left;
    width: 100%;
    line-height: 1.12em;
    white-space: normal;
    display: flex;
  }
  .content{
    width: 100%;
    height: 100%;
    padding-bottom: 250px;
    padding-top: 16px;
  }
  .content .inner-content{
    padding-top: 22px;
  }
   @media  only screen and (max-width:756px) {
    .content{
       padding-bottom: 160px;
      /* padding-top: 16px;  */
    }
    .content .inner-content{
      padding-top: 16px;
    }
  } 
</style>