<template>
  <div id="app">
  <!-- 
    <vue-page-transition name="fade-in-up">
    </vue-page-transition> -->
      <router-view name="templatelayout" >
        <router-view name="content"></router-view>
      </router-view>
  </div>
</template>

<script>

import Main from "./components/templates/Main"
export default {
  name: 'App',
  components: {
   Main
  }
}
</script>

<style>
#app {
/*   font-family: "GothamMedium", Helvetica, Arial, sans-serif; */
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  display: flex;
  flex-direction: column;
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
    padding: 0 16px;
  }
}
</style>
