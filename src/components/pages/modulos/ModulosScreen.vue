<template>
<div class="pt-4">

  <div class="conteudos-flow">
    <modulo-item v-for="(m,i) in modulos" :key="i" :data="m"></modulo-item>
  </div>
</div>
</template>

<script>
import {mapGetters} from "vuex"
import ModuloItem from "./ModuloItem"
export default {
  components:{ModuloItem},
  computed:{...mapGetters(["get_modules"]),
  modulos(){
      var modules =this.get_modules;
      return modules || []
    }
  },
  async mounted(){
     this.$root.$emit('scrollAfterEnter');
    if(this.get_modules == null){
      const err = await this.$store.dispatch("loadModules");
      if(err) console.log(err)
    }
  }
}
</script>

<style scoped>
.conteudos-flow{
  width: 100%;
  height: 100%;
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  grid-template-rows: auto;
  gap: 12px;
  padding: 12px;
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