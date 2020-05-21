<template>
<div>
  <span class="module-description" >
    {{description}}
  </span>
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
      description:null
    }
  },
  methods:{
    route(path){
      console.log("routing")
      this.$router.push({path:`/modules/${this.path}/${path}`})
    }
  },
  computed:{
    
    aulas(){
      var modules = this.modules;
      return modules || [null,null,null,null,null,null,null,null,null]
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
      }
    }
  }
}
</script>

<style scoped>
  .module-description{
    color: #555;
    margin-top: 6px;
    text-align: left;
    width: 100%;
    font-size: 1em;
    text-align: left;
    width: 100%;
    line-height: 1.1em;
    white-space: normal;
    display: flex;
  }
  .conteudos-flow{
    width: 100%;
    height: 100%;
    display: grid;
    grid-template-columns: repeat(1, 1fr);
    grid-template-rows: auto;
    gap: 4px;
    padding: 32px 12px;
  }
</style>