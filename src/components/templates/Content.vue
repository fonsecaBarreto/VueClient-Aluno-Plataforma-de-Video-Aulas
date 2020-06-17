<template>
  <div class="content">
    <div class="app-container">
     
        <app-header v-if="title!= null" class="header" :title="title"></app-header>
  
  
          <slot></slot>
  
    </div>
  </div>
</template>

<script>
import Header from "./Header"
import {mapGetters} from "vuex"
export default {
  components:{appHeader:Header},
  computed:{
    ...mapGetters(["get_module_title"]),
    title(){
      return this.$route.name || this.get_module_title;
    }
  }
}
</script>

<style>
  .content{
    width: 100%;
    height: 100%;
    padding-bottom: 250px;
  }
</style>