<template>
<transition name="rollup">
  <div v-if="show" class="project-notify">
    <font-awesome-icon icon="smile-wink"> </font-awesome-icon>
    <span class="ml-2">
      Na aba  
      <router-link to="/profile">
        "Minha conta"
      </router-link> 
      você tem acesso aos seus dias restantes na plataforma esse mês. Confira já!</span>
  </div>
</transition>
</template>

<script>
export default {
  data(){
    return { 
      show:false,
      timeout: 4800
    }
  },
  mounted(){
    setTimeout(()=>{
      this.show = true
        setTimeout(() => {
          this.show = false
      }, this.timeout);
    }, 256)
  }
}
</script>

<style scoped>

  .project-notify{
    background-color: rgb(223, 223, 68,.9);
    color: #363636;
    font-weight: 600;
    padding: 3px 22px;
    font-size: 1.1em;
    box-shadow: 0px 2px 8px #0003;

  }


</style>