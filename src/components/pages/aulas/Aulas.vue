<template>
<div>
  <div class="conteudos-flow">
    <aula-item v-for="(a,i) in aulas" :key="i" :data="a" @click.native="route(a.path)" ></aula-item>
  </div>
</div>
</template>

<script>
import AulaItem from "./AulaItem"
export default {
  components:{AulaItem},
  data(){
    return {
      modules:null,
      description:null,
      attachment:null,
    }
  },
  methods:{
    route(path){ this.$router.push({path:`/modules/${this.path}/${path}`})
    }
  },
  computed:{
    
    aulas(){
      var modules = this.modules;
      return modules || []
    },
    path(){return this.$route.params.module}
  },
  async mounted(){
    if(this.modules == null){
      const {data,err} = await this.$store.dispatch("loadModulesChilds",this.path);
      if(err)console.log(err)
      if(data) {
        this.$store.commit("set_module_title",data.name)
        this.modules = data.children;
        this.description = data.description
        this.$store.commit("set_module_description",this.description)
      
      }
    }
  }
}
</script>

<style scoped>
 
  .conteudos-flow{
    width: 100%;
    height: 100%;
    display: grid;
    grid-template-columns: repeat(1, 1fr);
    grid-template-rows: auto;
    gap: 4px;
    padding: 0 8px;
  }
  @media only screen and (max-width:960px){
    .conteudos-flow{
      padding: 0;
    }
  }
</style>