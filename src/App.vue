<template>
  <div id="app" class="">
  
     <router-view name="templatelayout">
         <vue-page-transition name="fade-in-up">
        <router-view name="content"></router-view>
         </vue-page-transition>
    </router-view>
   
  </div>
</template>

<script>


export default {
  name: 'App',
  components: {
   
  }
}
</script>

<style>
#app {
/*   font-family: "GothamMedium", Helvetica, Arial, sans-serif; */
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #444;
  height: 100vh;
  width: 100vw;
  overflow: hidden;
}
.app-container{
  max-width: 1224px;
  margin: auto;
  padding: 0 24px;
}
@media screen and (max-width: 960px) {
  .app-container{
    padding: 0 8px;
  }
}
</style>
