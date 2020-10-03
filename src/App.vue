<template>
  <div id="app">
      <router-view name="templatelayout" >
        <template v-slot:content>
          <router-view name="content"></router-view> 
        </template>

        <template v-slot:popup>
          <router-view name="popup"></router-view> 
        </template>
  
      </router-view>
  </div>
</template>

<script>
import Main from "./components/templates/Main"
export default {
  name: 'App',
  components: {Main},
  created() {
    window.addEventListener('resize', this.handleResize);
    this.handleResize();
  },
  destroyed() {window.removeEventListener('resize', this.handleResize);},
  methods: {
    handleResize() {
      this.$store.commit("set_screenWidth",window.innerWidth)
    }
  }
}
</script>

<style>
#app {
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #444;
   background-color: rgb(250, 253, 255);
}
.loading-comp{
  position: relative;
}
.loading-comp{
  position: absolute;
  top: 0;left: 0;
  width: 100%;height: 100%;
  background-color: rgb(248, 248, 248);
  background-image: url("./assets/loading-alt.svg");
  background-repeat: no-repeat;
  background-size: 84px;
  background-position: center;
  z-index: 9999;
  opacity: .7;
} 
.app-container{
  max-width: 1156px;
  margin: auto;
  padding: 0 24px;
}
@media screen and (max-width: 960px) {
  .app-container{padding: 0 12px;}
}

</style>
