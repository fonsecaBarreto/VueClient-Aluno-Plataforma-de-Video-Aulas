<template>
<div >
  <div class="conteudos-flow" v-if="get_modules.length">
    <modulo-item  v-for="(m,i) in get_modules" :key="i" :data="m"></modulo-item>
  </div>
  <div class="conteudos-flow" v-else>
    <modulo-item v-for="(i) in 6" :key="i"></modulo-item>
  </div>
</div>
</template>

<script>
import {mapGetters} from "vuex"
import ModuloItem from "./ModuloItem"
export default {
  components:{ModuloItem},
  computed:{ ...mapGetters(["get_modules"]) },
  mounted(){
   this.$root.$emit('scrollAfterEnter');
    if(!this.get_modules.length){
      this.$store.dispatch("loadModules");
    } 
  }
}
</script>

<style scoped>
.conteudos-flow{
  width: 100%;
  height: 100%;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-template-rows: auto;
  gap: 16px;
 
}
@media only screen and (max-width:1224px){
  .conteudos-flow{
     grid-template-columns: repeat(3, 1fr);
  }
}
@media only screen and (max-width: 1024px){
   .conteudos-flow{
     grid-template-columns: repeat(2, 1fr);
  }
}
@media only screen and (max-width: 756px){
   .conteudos-flow{
     grid-template-columns: repeat(1, 1fr);
  }
}
</style>